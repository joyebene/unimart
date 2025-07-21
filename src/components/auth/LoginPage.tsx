"use client";
import React from 'react'
import AuthLayout from './AuthLayout';
import Link from 'next/link';
import { useState } from 'react';
import InputField from '../shared/InputField';
import { AlertCircle, Lock, Mail } from 'lucide-react';
import { authAPI } from '@/utils/api';
import Button from '../shared/Button';
import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

const LoginPage = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [success, setSuccess] = useState("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await authAPI.login(formData)
            console.log(res);

            if (res.status === 200) {
                setLoading(false)
                setSuccess("Login successful")
                console.log(res);
                console.log(loading);


                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                router.push("/dashboard");

            }

        } catch (err: any) {
            setLoading(false);
            console.error(err);

            const message =
                err?.response?.data?.message ||
                err?.message ||
                "An unexpected error occurred";

            setError(message); // ✅ always a string

            // if (err?.response?.status === 403) {
            //     toast.error(message);

            //     // Save email for OTP Verification
            //     localStorage.setItem("otpEmail", formData.email);
            //     localStorage.setItem("otpPurpose", "register");

            //     router.push("/verify-otp"); // Navigate user to verify OTP
            // } else {
            //     toast.error(message);
            // }
        }

    }


    return (
        <AuthLayout>
            <div className='bg-white text-[#333333] px-4 md:px-10 xl:px-20 flex items-center justify-center'>
                <div className='flex flex-col justify-center shadow-sm p-4 md:p-6 xl:py-8 gap-2 rounded-xl mt-10 md:mt-0 border border-gray-200'>
                    <h1 className='font-semibold text-xl md:text-2xl xl:text-3xl text-center md:text-start'><span className='text-[#34C759]'>Welcome</span> Back!</h1>
                    <p className='text-[12px] md:text-sm xl:text-base text-center md:text-start'>Access your orders, favorites, and exclusive deals</p>

                    {/* If error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-2 sm:p-4 rounded-lg my-4 flex items-start">
                            <div className="bg-red-100 p-1.5 sm:p-2 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                                <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                            </div>
                            <div>
                                <p className="font-medium text-sm sm:text-base mb-1 sm:mb-2">Login Error</p>
                                <p className="text-red-700 text-[12px] sm:text-sm lg:text-base">{error}</p>
                            </div>

                            {/* ✅ If unverified error show this link */}
                            {error.toLowerCase().includes("verify your email") && (
                                <button
                                    type='button'
                                    onClick={async () => {
                                        try {
                                            await authAPI.resendOTP(formData.email);
                                            localStorage.setItem("otpEmail", formData.email);
                                            localStorage.setItem("otpPurpose", "register");
                                            router.push("/verify-otp");
                                        } catch (err: any) {
                                            console.error("Failed to resend OTP", err);
                                            // Optionally show toast or error
                                        }
                                    }}
                                    className="text-[#34C759] font-medium underline mt-4 text-left ml-5 sm:ml-10 text-[10px] sm:text-sm"
                                >
                                    Click here to verify your email
                                </button>

                            )}
                        </div>
                    )}

                    {/* If success */}
                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-700 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 flex items-start">
                            <div className="bg-green-100 p-1.5 sm:p-2 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                                <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="font-medium  text-sm sm:text-base mb-1 sm:mb-2">Login Successful!</p>
                                <p className="text-green-700 text-[12px] sm:text-sm lg:text-base">{success}</p>
                            </div>
                        </div>
                    )}
                    <form className='mt-2' onSubmit={handleSubmit}>
                        <InputField title='Email' name='email' icon={<Mail color='#8BC34A' />} value={formData.email} type='email' placeholder='Enter Your Email' handleChange={handleChange} />

                        <InputField title='Password' name='password' type='password' icon={<Lock color='#8BC34A' />} value={formData.password} placeholder='Enter Your Password' handleChange={handleChange} />
                        <div className='flex gap-1 md:gap-2 mt-2 md:mt-4 item-center pt-2'>
                            <input type='checkbox' placeholder='Remember me' className='w-4 h-4 md:w-5 md:h-5 accent-[#f7DC67]' />
                            <p className='text-[12px] md:text-sm'>Remember Me</p>
                        </div>
                        <div>
                            <Button text={loading ? "Logging In..." : "Log In"} className={`w-full ${loading && "bg-[#f8e79b]"}`} />
                        </div>

                    </form>
                    <div>
                        <Link href="/forgot-password" className='text-[12px] md:text-sm text-[#8BC34A] font-semibold hover:text-[#34C759]'>Forgotten Password?</Link>
                    </div>
                    <div className='text-[11px] md:text-sm text-gray-400 mt-3 md:mt-4 text-center'>
                        Don&apos;t have an account? <span className='text-[#f7DC67] font-semibold hover:underline'><Link href="/signup">Sign Up</Link></span>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default LoginPage;