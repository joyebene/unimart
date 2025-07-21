"use client"
import React, { useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Menu, Search, Bell, User } from 'lucide-react';
import { userAPI } from '@/utils/api';
import toast from 'react-hot-toast';

interface menuProps {
  setOpenNav?: (open: boolean) => void;
}

const Navbar = ({ setOpenNav }: menuProps) => {
  const [unreadCount, setUnreadCount] = React.useState<number>(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await userAPI.getUnreadCount();  // You should have this in your api.ts
        setUnreadCount(res.data?.count || 0);
      } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
        toast.error(err?.response?.data?.message || "Failed to fetch unread messages");
      }
    };

    fetchUnreadCount();
  }, []);


  return (
    <div className='bg-white text-[#333333] tracking-tight leading-tight border-b border-gray-300 shadow-md fixed w-full z-20'>
      <div className='p-4 px-4 sm:px-8 md:px-10 xl:px-20 w-full'>
        <div className='flex items-center  justify-between'>
          <div>
            <div className='lg:hidden'>
              <Menu size={38} className='text-[#333333]' onClick={() => setOpenNav?.(true)} />
            </div>
            <div className='hidden lg:block'>
              <div className='flex items-center gap-2'>
                <Image src="/logo.png" width={40} height={40} alt='logo-img' />
                <div>
                  <p className='text-2xl text-[#f7DC67] font-bold'>UNI<span className='text-[#34C759]'>MART</span></p>
                  <p className='text-[8px] ml-1'>Where Campus Meets Commerce</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex itemx-center justify-between w-[40%] sm:w-[30%] md:w-[20%]'>
            <Link href="/dashboard/browse-products" className='bg-black rounded-full flex items-center justify-center p-2'>
              <Search color='white' fill='black' className='w-5 h-5 md:w-7 md:h-7' />
            </Link>
            <Link href="/dashboard/messages" className="relative">
              <div className="bg-black rounded-full flex items-center justify-center p-2">
                <Bell color="white" fill="black" className="w-5 h-5 md:w-7 md:h-7" />
              </div>
              {/* Badge */}
              {
                unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )
              }

            </Link>

            <Link href="/dashboard/profile-settings" className='bg-black rounded-full flex items-center justify-center p-2'>
              <User color='white' fill='black' className='w-5 h-5 md:w-7 md:h-7' />
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;