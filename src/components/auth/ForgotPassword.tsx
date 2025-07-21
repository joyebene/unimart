"use client";
import React, { useState } from 'react';
import AuthLayout from './AuthLayout';
import InputField from '../shared/InputField';
import Button from '../shared/Button';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/utils/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    localStorage.setItem("otpEmail", email);
    localStorage.setItem("otpPurpose", "forgot-password");

    try {
      const response = await authAPI.forgotPassword(email);

      if (response.status === 200) {
        router.push("/verify-otp");
      }
    } catch (error: any) {
      console.error("There was an error:", error?.response?.data || error.message);
      alert("Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className='bg-white text-[#333333] px-4 md:px-10 xl:px-20 flex items-center justify-center'>
        <div className='flex flex-col justify-center shadow-sm pb-7 p-4 md:p-6 xl:py-8 gap-2 rounded-xl mt-20 md:mt-0 border border-gray-200'>
          <h1 className='font-semibold text-xl md:text-2xl xl:text-3xl text-center md:text-start'>
            <span className='text-[#34C759]'>Forgotten</span> Password?
          </h1>
          <p className='text-[12px] md:text-sm xl:text-base text-center md:text-start'>
            Enter your email to receive OTP for verification
          </p>
          <Image src="/auth/pfg.jpg" width={80} height={80} alt='img' className='mx-auto mt-4' />
          <form className='mt-2' onSubmit={handleSubmit}>
            <InputField
              title='Email'
              name='email'
              icon={<Mail color='#8BC34A' />}
              value={email}
              type='email'
              placeholder='Enter Your Email'
              handleChange={handleChange}
            />

            <div>
              <Button
                text={loading ? 'Loading...' : 'Next'}
                className='w-full mt-4'
                disabled={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
