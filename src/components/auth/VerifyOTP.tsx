"use client";
import React, { useState, useEffect } from 'react';
import AuthLayout from './AuthLayout';
import Button from '../shared/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/utils/api';
import toast from 'react-hot-toast';

const VerifyOTP = () => {
    const [otp, setOtp] = useState<string>("");
    const [timer, setTimer] = useState(60);
    const [resendEnabled, setResendEnabled] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);

    const router = useRouter();

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ""); // Only numbers
        if (value.length <= 6) setOtp(value); // Max 6 digits
    };

    const handleResendOtp = async () => {
        const email = localStorage.getItem("otpEmail");
        setIsResending(true);

        if (!email) {
            toast.error("Something went wrong. Please try again.");
            return;
        }

        try {
            const response = await authAPI.resendOTP(email);

            if (response.status === 200) {
                toast.success("OTP resent successfully!");
                setTimer(60);
                setResendEnabled(false);
                setIsResending(false);
            }
        } catch (error) {
            const err = error as { response?: { data?: { message?: string } } };
            toast.error(err?.response?.data?.message || 'Failed to resend OTP. Please try again.');
        } finally {
            setIsResending(false);
        }
    };


    useEffect(() => {
        if (!resendEnabled && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else if (timer === 0) {
            setResendEnabled(true);
        }
    }, [timer, resendEnabled]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);

        const email = localStorage.getItem("otpEmail");
        const purpose = localStorage.getItem("otpPurpose");

        if (!email || !purpose) {
            toast.error("Something went wrong. Please try again.");
            setIsVerifying(false);
            return;
        }

        try {
            const response = await authAPI.verifyOTP({ otp, email, purpose });

            if (response.status === 200) {
                // Navigate based on purpose
                if (purpose === "forgot-password") {
                    localStorage.setItem("verifiedOtp", otp);
                    router.push("/reset-password");
                } else {
                    localStorage.removeItem("otpEmail");
                    localStorage.removeItem("otpPurpose");
                    router.push("/login");
                }
            }

        } catch (error) {
            const err = error as { response?: { data?: { message?: string } } };
            toast.error(err?.response?.data?.message || 'Invalid OTP. Please try again.');
   
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <AuthLayout>
            <div className='bg-white text-[#333333] px-4 md:px-10 xl:px-20 flex items-center justify-center'>
                <div className='flex flex-col justify-center shadow-sm pb-7 p-4 md:p-6 xl:py-8 gap-2 rounded-xl mt-20 md:mt-0 border border-gray-200'>
                    <h1 className='font-semibold text-xl md:text-2xl xl:text-3xl text-center md:text-start'>
                        <span className='text-[#34C759]'>Verify</span> OTP
                    </h1>
                    <p className='text-[12px] md:text-sm xl:text-base text-center md:text-start'>Enter the code sent to your email</p>
                    <p className='text-[12px] md:text-sm xl:text-base text-center md:text-start'>OTP expires in 5 minutes</p>
                    <Image src="/auth/mail.jpg" width={80} height={80} alt='img' className='mx-auto mt-2' />

                    <form className='mt-2' onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-1">OTP Code</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={handleOtpChange}
                                maxLength={6}
                                placeholder="Enter 6-digit OTP"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#34C759]"
                            />
                        </div>
                        <div>
                            <Button text={isVerifying ? 'Verifying...' : 'Verify'} className='w-full mt-4' />
                        </div>
                    </form>

                    <div className='text-sm text-center mt-3'>
                        {resendEnabled ? (
                            <button
                                type='button'
                                onClick={handleResendOtp}
                                disabled={isResending}
                                className={`text-[#34C759] font-medium hover:underline ${isResending && 'opacity-50 cursor-not-allowed'}`}
                            >
                                {isResending ? 'Resending...' : 'Resend OTP'}
                            </button>

                        ) : (
                            <p className='text-gray-500'>Resend OTP in {timer}s</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default VerifyOTP;
