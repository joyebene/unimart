'use client';
import DashboardLayout from '@/components/Dashboard/DasboardLayout';
import React, { JSX, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  MapPin,
  BookOpen,
  GraduationCap,
  Phone,
  PencilLine,
  Save,
  Lock,
  Mail,
} from 'lucide-react';
import { userAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import { convertFileToBase64, uploadBase64File } from '@/utils';

// Define the InfoField type for strict typing
type InfoField = {
  field: keyof UserProfile;
  label: string;
  icon: JSX.Element;
  privacyKey?: keyof UserProfile['privacy'];
};

const infoFields: InfoField[] = [
  { field: 'department', label: 'Department', icon: <BookOpen className="text-green-600" size={20} /> },
  { field: 'level', label: 'Level', icon: <GraduationCap className="text-green-600" size={20} /> },
  { field: 'address', label: 'Address', icon: <MapPin className="text-green-600" size={20} />, privacyKey: 'showAddress' },
  { field: 'whatsappNumber', label: 'WhatsApp Number', icon: <Phone className="text-green-600" size={20} />, privacyKey: 'showWhatsapp' },
  { field: 'email', label: 'Email', icon: <Mail className="text-green-600" size={20} />, privacyKey: 'showEmail' },
];


interface UserProfile {
  fullName: string;
  department: string;
  level: string;
  address: string;
  whatsappNumber: string;
  email: string;
  profileUrl: string;
  bio: string;
  privacy: {
    showAddress: boolean;
    showWhatsapp: boolean;
    showEmail: boolean;
    showDepartment?: boolean;
    showLevel?: boolean;
  };
}

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [uploading, setUploading] = useState(false);


  const isOwner = true; // hardcoded for now — will help later when rendering public profiles

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userAPI.getMe();
        console.log(res);

        setUser({
          fullName: res.data.fullName ?? '',
          department: res.data.department ?? '',
          level: res.data.level ?? '',
          address: res.data.address ?? '',
          whatsappNumber: res.data.whatsappNum ?? '',
          email: res.data.email ?? '',
          profileUrl: res.data.profileUrl ?? '',
          bio: res.data.bio ?? '',
          privacy: {
            showAddress: res.data.privacy?.showAddress ?? true,
            showWhatsapp: res.data.privacy?.showWhatsapp ?? true,
            showEmail: res.data.privacy?.showEmail ?? true,
            showDepartment: res.data.privacy?.showDepartment ?? false,
            showLevel: res.data.privacy?.showLevel ?? false,
          },
        } as UserProfile);
        ;
      } catch (error) {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(err?.response?.data?.message || "Failed to load profile");
      }

    };

    fetchProfile();
  }, []);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!user) return;

    setUser((prev) => ({
      ...(prev as UserProfile),
      [name]: value,
    }));
  };

  const handlePrivacyToggle = (field: keyof UserProfile['privacy']) => {
    if (!user) return;

    setUser((prev) => ({
      ...(prev as UserProfile),
      privacy: {
        ...((prev as UserProfile).privacy),
        [field]: !(prev as UserProfile).privacy[field],
      },
    }));
  };


  const handleSave = async () => {
    if (!user) return;
    setIsEditing(false);

    try {
      const { showAddress, showWhatsapp, showEmail, showDepartment, showLevel } = user.privacy;
      if (!user.email || !user.email.includes('@')) {
        return toast.error('Please enter a valid email address.');
      }

      const updatedUser = {
        fullName: user.fullName,
        department: user.department,
        level: user.level,
        address: user.address,
        email: user.email,
        whatsappNum: user.whatsappNumber,
        bio: user.bio,
        privacy: { showAddress, showWhatsapp, showEmail, showDepartment, showLevel },
      };

      const res = await userAPI.updateMe(updatedUser);
      localStorage.setItem('user', JSON.stringify(res.data));
      toast.success('Profile updated successfully!');
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to update profile");
    }
  };

  const handlePasswordChange = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required.");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match.");
    }

    try {
      setLoadingPassword(true);
      await userAPI.changePassword({ currentPassword, newPassword });
      toast.success("Password changed successfully!");
      setShowPasswordModal(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to load profile");
    }
    finally {
      setLoadingPassword(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setUploading(true);
      const previewUrl = URL.createObjectURL(file);
      setUser((prev) => ({
        ...(prev as UserProfile),
        profileUrl: previewUrl,
      }));

      const base64 = await convertFileToBase64(file);
      const uploadedUrl = await uploadBase64File(base64);

      if (uploadedUrl) {
        setUser((prev) => ({
          ...(prev as UserProfile),
          profileUrl: uploadedUrl,
        }));

        await userAPI.updateProfilePic(uploadedUrl);
        toast.success('Profile photo uploaded & saved!');
      } else {
        toast.error('Cloudinary upload failed.');
      }
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to upload photo");
    } finally {
      setUploading(false);
    }
  };


  if (!user) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-lg sm:mt-10 mb-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-800">
            My <span className="text-green-600">Profile</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Keep your profile accurate and up to date.</p>
        </div>

        {/* Top Profile */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 border-b border-gray-500 shadow-sm p-4 pb-4">
          <div className="relative flex sm:flex-col items-end sm:items-center md:w-[40%]">
            <Image
              src={user.profileUrl || '/dashboard/default-avatar.png'}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full border shadow-md object-cover w-24 h-24"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <input
              id="profileUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              aria-label="Upload Profile Photo"
            />
            <button type='button'
              onClick={() => document.getElementById('profileUpload')?.click()}
              className="mt-2 text-[12px] sm:text-sm text-white bg-[#34C759] hover:bg-green-700 px-3 py-1 rounded"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Update Photo'}
            </button>
          </div>

          <div className='w-full'>
            <div className="flex-1 sm:text-left w-full">
              {isEditing ? (
                <input
                  name="fullName"
                  value={user.fullName}
                  onChange={handleChange}
                  className="text-xl font-semibold w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Full Name"
                />
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-gray-800">{user.fullName.charAt(0).toUpperCase() + user.fullName.slice(1) || 'Add Name'}</h2>
                  <p className="text-sm text-gray-500">Student at BASUG</p>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-2 items-center w-full">
            <button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg text-white transition bg-[#f7DC67] hover:bg-yellow-400"
            >
              {isEditing ? <Save size={18} /> : <PencilLine size={18} />}
              {isEditing ? 'Save' : 'Edit'}
            </button>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="mt-0 sm:ml-3 px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-700 mb-2">Bio</h3>
          {isEditing ? (
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
              placeholder="Write a short bio..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          ) : (
            <p className="text-gray-600 text-sm md:text-base">
              {user.bio || <span className="italic text-gray-400">Add a short bio</span>}
            </p>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {infoFields.map(({ field, label, icon, privacyKey }) => (
            <div key={field} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="pt-1">{icon}</div>
              <div className="flex-1">
                <p className="text-gray-700 font-medium flex justify-between items-center">
                  {label}
                  {isEditing && privacyKey && (
                    <label htmlFor={`privacy-${field}`} className="inline-flex items-center cursor-pointer ml-2">
                      <input
                        type="checkbox"
                        id={`privacy-${field}`}
                        checked={user.privacy[privacyKey as keyof typeof user.privacy]}
                        onChange={() => handlePrivacyToggle(privacyKey as keyof typeof user.privacy)}
                        className="sr-only peer"
                        title={`Toggle privacy for ${label}`}
                        aria-label={`Toggle privacy for ${label}`}
                      />
                      <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-green-600 relative transition">
                        <div className="absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform peer-checked:translate-x-4" />
                      </div>
                    </label>

                  )}
                </p>
                {isEditing ? (
                  <input
                    name={field}
                    value={typeof user[field] === 'string' ? user[field] : ''}
                    onChange={handleChange}
                    className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder={`Add ${label}`}
                  />
                ) : (
                  <p className="text-gray-600 text-sm mt-1">
                    {isOwner || !privacyKey || user.privacy[privacyKey] ? (
                      typeof user[field] === 'string' && user[field] ? (
                        user[field]
                      ) : (
                        <span className="italic text-gray-400">Add {label}</span>
                      )
                    ) : (
                      <span className="italic text-gray-400 flex items-center gap-1">
                        <Lock size={14} /> Hidden from public
                      </span>
                    )}
                  </p>

                )}
              </div>
            </div>
          ))}
        </div>


        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md">
              <h2 className="text-lg font-semibold mb-4">Change Password</h2>
              {(['currentPassword', 'newPassword', 'confirmPassword'] as const).map((key) => (
                <input
                  key={key}
                  type="password"
                  placeholder={
                    key === 'currentPassword' ? 'Current Password' :
                      key === 'newPassword' ? 'New Password' : 'Confirm New Password'
                  }
                  value={passwordForm[key]}
                  onChange={(e) => setPasswordForm({ ...passwordForm, [key]: e.target.value })}
                />
              ))
              }
              <div className="flex justify-end gap-3">
                <button type='button' onClick={() => setShowPasswordModal(false)} className="text-gray-600 hover:text-black">Cancel</button>
                <button type='button' onClick={handlePasswordChange} disabled={loadingPassword} className="bg-[#34C759] text-white px-4 py-2 rounded hover:bg-[#34C759]">
                  {loadingPassword ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
