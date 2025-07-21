"use client";
import React, { useState } from 'react';
import AuthLayout from './AuthLayout';
import Link from 'next/link';
import Image from 'next/image';
import InputField from '../shared/InputField';
import { Lock } from 'lucide-react';
import { authAPI } from '@/utils/api';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [openNav, setOpenNav] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = localStorage.getItem("otpEmail");
    const otp = localStorage.getItem("verifiedOtp");

    if (!email || !otp) {
      alert("Missing OTP or email. Please retry the process.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true); // Start loading

    try {
      await authAPI.resetPassword({
        email,
        otp,
        newPassword: formData.newPassword
      });

      setOpenNav(true);
      localStorage.removeItem("otpEmail");
      localStorage.removeItem("verifiedOtp");
    } catch (error: any) {
      console.error("Password reset failed:", error?.response?.data || error.message);
      alert("Password reset failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <AuthLayout>
      <div className='bg-white text-[#333333] px-4 md:px-10 xl:px-20 flex items-center justify-center'>
        <div className='flex flex-col justify-center shadow-sm p-4 md:p-6 xl:py-8 gap-2 rounded-xl mt-10 md:mt-0 border border-gray-200'>
          <h1 className='font-semibold text-xl md:text-2xl xl:text-3xl text-center md:text-start'>
            <span className='text-[#34C759]'>Reset</span> Password
          </h1>
          <p className='text-[12px] md:text-sm xl:text-base text-center md:text-start'>
            Enter your new password and also confirm the password
          </p>
          <Image src="/auth/img03.png" width={150} height={150} alt='img' className='mx-auto mt-2' />
          <form className='mt-2' onSubmit={handleSubmit}>
            <InputField
              title='New Password'
              name='newPassword'
              type='password'
              icon={<Lock color='#8BC34A' />}
              value={formData.newPassword}
              placeholder='Enter Your Password'
              handleChange={handleChange}
         
            />

            <InputField
              title='Confirm Password'
              name='confirmPassword'
              type='password'
              icon={<Lock color='#8BC34A' />}
              value={formData.confirmPassword}
              placeholder='Confirm Your Password'
              handleChange={handleChange}
           
            />

            <div>
              <button
                type='submit'
                disabled={loading}
                className='bg-[#f7DC67] shadow-md text-white px-3 py-2 sm:px-4 md:py-3 rounded-full hover:bg-white hover:text-[#f7DC67] hover:border hover:border-[#f7DC67] transition-all duration-300 mt-4 md:mt-6 xl:mt-8 text-sm md:text-base font-semibold w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? (
                  <span className="flex justify-center items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Resetting...
                  </span>
                ) : (
                  "Reset"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {openNav && (
        <div className='w-full h-full bg-black/30 fixed inset-0 flex items-center justify-center'>
          <div className='flex flex-col items-center justify-center bg-white text-[#333333] p-4 md:p-6 rounded-xl w-[80%] md:w-fit'>
            <h1 className='font-semibold text-xl md:text-2xl xl:text-3xl text-center'>
              Password Reset <span className='text-[#34C759]'>Successfully</span>
            </h1>
            <Image src="/auth/icons_approval.png" width={60} height={60} alt='approval-img' className='my-4 md:my-8' />
            <Link href="/login" className='flex items-center justify-end w-full' onClick={() => setOpenNav(false)}>
              <button
                type='button'
                className='bg-[#f7DC67] shadow-md text-white px-3 py-2 sm:px-4 md:py-3 rounded-full hover:bg-white hover:text-[#f7DC67] hover:border hover:border-[#f7DC67] transition-all duration-300 mt-4 md:mt-6 xl:mt-8 text-sm md:text-base font-semibold w-[40%] cursor-pointer'
              >
                OK
              </button>
            </Link>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
