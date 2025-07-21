"use client";

import DashboardLayout from "@/components/Dashboard/DasboardLayout";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { userAPI } from "@/utils/api";
import toast from "react-hot-toast";
import { Send, X } from "lucide-react";
import Link from "next/link";

interface MessagePreview {
  id: string;
  fromUser: {
    id: string,
    fullName: string,
    profileUrl: string
  },
  content: string;
  timestamp: string;
  read: boolean;
}

const MessagesPage = () => {
  const [messages, setMessages] = useState<MessagePreview[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState<MessagePreview | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);


  const fetchMessages = async () => {
    try {
      const res = await userAPI.getMyMessages();
      setMessages(res.data);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || "Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSendReply = async () => {
    if (!replyText.trim() || !selectedUser) {
      toast.error("Message cannot be empty");
      return;
    }

    setSending(true);
    try {
      await userAPI.sendMessage({
        toUserId: selectedUser.fromUser.id,
        content: replyText,
      });

      toast.success("Reply sent successfully");
      fetchMessages();
      setReplyText("");
      setSelectedUser(null);

      if (!selectedUser.read) {
        await userAPI.markMessageAsRead(selectedUser.id);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === selectedUser.id ? { ...m, read: true } : m
          )
        );
      }
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || "Failed to send reply");
    } finally {
      setSending(false);
    }
  };


  return (
    <DashboardLayout>
      <div className="w-full bg-white text-[#333333] p-4 text-[13px] sm:text-sm md:text-base min-h-screen">
        <div className="flex flex-col items-center justify-center md:mt-6 mb-6 gap-2">
          <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl text-center">
            My <span className="text-[#34C759]">Messages</span>
          </h1>
          <p className="text-sm md:text-base text-center text-gray-600">
            Chat with buyers and sellers directly.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="text-center text-gray-500">No messages yet.</p>
          ) : (
            <ul className="divide-y">
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 transition"
                >
                  <Link href={`/dashboard/user/${msg.fromUser.id}`} className="flex-shrink-0">
                    <Image
                      src={msg.fromUser.profileUrl || "/dashboard/default-avatar.png"}
                      alt={msg.fromUser.fullName}
                      width={50}
                      height={50}
                      className="h-10 w-10 rounded-full object-cover hover:ring-2 hover:ring-[#34C759]"
                    />
                  </Link>

                  <div
                    className="flex-1 ml-3 flex items-center justify-between cursor-pointer"
                    onClick={() => setSelectedUser(msg)}>
                    <div>
                      <p className="font-semibold">{msg.fromUser.fullName}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{msg.content}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{msg.timestamp}</p>
                    {!msg.read && (
                      <span className="inline-block bg-[#34C759] h-2 w-2 rounded-full mt-1"></span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[400px] relative">
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setSelectedUser(null)}
            >
              {<X size={20} />}
            </button>

            <h2 className="text-lg font-semibold mb-4 text-black">
              Reply to {selectedUser.fromUser.fullName}
            </h2>

            <textarea
              className="w-full border border-gray-300 text-black rounded p-2 h-32 resize-none"
              placeholder="Type your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            ></textarea>

            <button type="button"
              onClick={handleSendReply}
              disabled={sending}
              className="bg-[#34C759] text-white w-full py-2 rounded mt-3 hover:bg-green-700 transition"
            >
              {sending ? (
                "Sending..."
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Send size={16} /> Send Reply
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default MessagesPage;
