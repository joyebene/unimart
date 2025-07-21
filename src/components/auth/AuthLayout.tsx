import React from 'react';
import Image from 'next/image';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-screen mt-10 sm:mt-0 md:h-fit bg-white text-[#333333]' >
            <div className='flex flex-col md:flex-row items-center justify-between h-full'>
                <div className='h-full w-1/2 relative rounded-br-3xl rounded-tr-3xl hidden md:block'>
                    <Image src="/auth/auth-img.jpg" width={500} height={500} alt='auth-img' className='h-screen w-full rounded-b-none rounded-br-full rounded-tr-3xl' />
                    <div className='bg-green-400/50 h-full inset-0 absolute rounded-b-none rounded-br-full rounded-tr-3xl'></div>
                </div>
                <div className='w-full md:w-1/2'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout;