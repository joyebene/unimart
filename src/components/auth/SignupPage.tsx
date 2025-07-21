"use client";
import React from 'react'
import AuthLayout from './AuthLayout';
import Link from 'next/link';
import { useState } from 'react';
import InputField from '../shared/InputField';
import { AlertCircle, Lock, Mail, User } from 'lucide-react';
import Button from '../shared/Button';
import { authAPI } from '@/utils/api';
import { useRouter } from 'next/navigation';

const SignupPage = () => {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    })
    const [success, setSuccess] = useState("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    setTimeout(() => {
        if (error) {
            setError("")
        } else {
            setSuccess("")
        }

    }, 5000)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await authAPI.register(formData)
            console.log(res);

            if (res.status === 201) {
                setLoading(false)
                setSuccess("Account created successfully!! verify your email")
                localStorage.setItem("otpEmail", formData.email);
                localStorage.setItem("otpPurpose", "register");
                router.push("/verify-otp")
            }

        } catch (err:any) {
            setLoading(false);
            console.error(err);

            const message =
                err?.response?.data?.message ||
                err?.message ||
                "An unexpected error occurred";

            setError(message); // ✅ always a string
        }

    }

    return (
        <AuthLayout>
            <div className='bg-white text-[#333333] px-4 md:px-10 xl:px-20 flex items-center justify-center'>
                <div className='flex flex-col justify-center shadow-sm p-4 md:p-6 xl:py-8 gap-2 rounded-xl mt-10 md:mt-0 border border-gray-200'>
                    <h1 className='font-semibold text-xl md:text-2xl xl:text-3xl text-center md:text-start'><span className='text-[#34C759]'>Create</span> Your Account</h1>
                    <p className='text-[12px] md:text-sm xl:text-base text-center md:text-start'>Sign up now and start shopping smarter, not harder</p>

                    {/* If error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 sm:p-6 rounded-lg my-4 flex items-start">
                            <div className="bg-red-100 p-1.5 sm:p-2 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                                <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                            </div>
                            <div>
                                <p className="font-medium text-sm sm:text-base mb-1 sm:mb-2">Registeration Error</p>
                                <p className="text-red-700 text-[12px] sm:text-sm lg:text-base">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* If success */}
                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-700 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6 flex items-start">
                            <div className="bg-green-100 p-1.5 sm:p-2 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                                <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="font-medium text-sm sm:text-base mb-1 sm:mb-2">Registration Successful!</p>
                                <p className="text-green-700 text-[12px] sm:text-sm lg:text-base">{success}</p>
                            </div>
                        </div>
                    )}
                    <form className='mt-2' onSubmit={handleSubmit}>
                        <InputField title='Full Name' name='fullName' icon={<User color='#8BC34A' />} value={formData.fullName} type='text' placeholder='Enter Your First Name' handleChange={handleChange} />
                        <InputField title='Email' name='email' icon={<Mail color='#8BC34A' />} value={formData.email} type='email' placeholder='Enter Your Email' handleChange={handleChange} />

                        <InputField title='Password' name='password' type='password' icon={<Lock color='#8BC34A' />} value={formData.password} placeholder='Enter Your Password' handleChange={handleChange} />
                        <Button text={loading ? "Signing Up..." : "Sign Up"} className={`w-full mt-6 md:mt-8 ${loading && "bg-[#f8e79b]"}`} />
                    </form>
                    <div className='text-[11px] md:text-sm text-gray-400 mt-3 md:mt-4 text-center'>
                        Already have an account? <span className='text-[#34C759] font-semibold hover:underline'><Link href="/login">Log In</Link></span>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default SignupPage