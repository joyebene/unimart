"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BookOpen, GraduationCap, MapPin, Phone, Mail, MessageCircle, Send, X } from 'lucide-react';
import DashboardLayout from '@/components/Dashboard/DasboardLayout';
import { userAPI } from '@/utils/api';
import toast from 'react-hot-toast';

const SingleUserPage = () => {
  const params = useParams();
  const id = params.id as string;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userAPI.getById(id);
        setUser(res.data);
        console.log(res.data);
        
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to fetch user.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  const handleSendMessage = async () => {
    if (!messageText.trim()) {
      toast.error('Message cannot be empty');
      return;
    }
    setSending(true);
    try {
      await userAPI.sendMessage({ toUserId: user.id, content: messageText });
      toast.success('Message sent successfully');
      setMessageText('');
      setShowModal(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;
  if (!user) return <p className="text-center mt-10 text-red-500">User not found.</p>;

  const details = [
    { label: 'Department', icon: <BookOpen className="text-green-600" size={20} />, value: user.department || 'Not provided' },
    { label: 'Level', icon: <GraduationCap className="text-green-600" size={20} />, value: user.level || 'Not provided' },
    { label: 'Address', icon: <MapPin className="text-green-600" size={20} />, value: user.privacy?.showAddress ? user.address : 'Not provided' },
    { label: 'WhatsApp Number', icon: <Phone className="text-green-600" size={20} />, value: user.privacy?.showWhatsapp ? user.whatsappNum : 'Not provided' },
    { label: 'Email', icon: <Mail className="text-green-600" size={20} />, value: user.privacy?.showEmail ? user.email : 'Not provided' },
  ];

    const formatPhoneNumber = (num: string) => {
    if (!num) return '';
    return num.startsWith('0') ? `234${num.slice(1)}` : num;
  };


  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md md:mt-6 text-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold capitalize">
            {user.fullName} <span className="text-green-600">Profile</span>
          </h1>
          <p className="text-gray-500 text-sm">Joined on {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 border-b border-gray-500 shadow-sm p-4 pb-4">
          <Image src={user.profileUrl || '/dashboard/default-avatar.png'} alt={user.fullName} width={100} height={100} className="rounded-full border object-cover w-24 h-24" />
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold capitalize">{user.fullName}</h2>
            <p className="text-sm text-gray-500">Student at BASUG</p>
          </div>
        </div>

        {user.bio && (
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-1 text-gray-700">Bio:</h3>
            <p className="text-gray-600 text-sm">{user.bio}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {details.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
              {item.icon}
              <p><span className="font-medium text-gray-700">{item.label}:</span> {item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          {user.privacy?.showWhatsapp && user.whatsappNum && (
            <Link
              href={`https://wa.me/${formatPhoneNumber(user.whatsappNum)}?text=${encodeURIComponent('Hello! I got your contact from Unimart.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#34C759] hover:bg-green-500 text-white px-6 py-2 rounded-full transition"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </Link>
          )}

          <button type='button'
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-[#f7DC67] hover:bg-yellow-400 text-white px-6 py-2 rounded-full transition"
          >
            <MessageCircle size={18} />
            Send Message
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[400px] relative">
            <button type='button'
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setShowModal(false)}
            >
              {<X size={20} />}
            </button>

            <h2 className="text-lg font-semibold mb-4">Send Message to {user.fullName}</h2>
            <textarea
              className="w-full border border-gray-300 rounded p-2 h-32 resize-none"
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            ></textarea>

            <button type='button'
              onClick={handleSendMessage}
              disabled={sending}
              className="bg-[#34C759] text-white w-full py-2 rounded mt-3 hover:bg-green-700 transition"
            >
              {sending ? 'Sending...' : (
                <span className="flex items-center justify-center gap-2">
                  <Send size={16} /> Send
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default SingleUserPage;
