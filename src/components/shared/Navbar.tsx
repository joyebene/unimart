"use client";
import React from 'react'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, Info, LogIn, Menu, Phone, ShoppingBag, Store, UserPlus, X } from 'lucide-react';

interface ListNavProps {
    name: string;
    url: string;
    icon?: React.ReactNode;
};


const Navbar = () => {
    const [openNav, setOpenNav] = useState(false);

    const ListNav = ({ name, url, icon }: ListNavProps) => {
        return (
            <li className='mt-3 md:mt-4'><Link href={url} onClick={() => { setOpenNav(false) }} className={`${name === 'Sign Up' && "bg-[#f7DC67] shadow-md text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-white hover:text-[#f7DC67] hover:border hover:border-[#f7DC67] transition-all duration-300"}  ${name === 'Sign In' && "bg-white text-[#f7DC67] border border-[#f7DC67] shadow-md hover:bg-[#f7DC67] hover:text-white hover:border-none transition-all duration-300 px-3 py-1 sm:px-4 sm:py-2 rounded-full"} flex items-center gap-1 sm:gap-2 md:gap-3 lg:hover:text-[#8BC34A] transition-all duration-300 text-[8px] sm:text-base`}> {icon} {name}</Link></li>
        )
    }



    return (
        <div className='bg-white text-[#333333] tracking-tight leading-tight border-b border-gray-300 shadow-md fixed w-full z-20'>
              <div className='p-4 md:px-10 xl:px-20'>
                {/* Mobile Navbar */}
                <div className=' lg:hidden'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <Image src="/logo.png" width={30} height={30} alt='logo-img' className='sm:w-12 sm:h-12' />
                            <div>
                                <p className='text-xl sm:text-3xl text-[#f7DC67] font-bold'>UNI<span className='text-[#34C759]'>MART</span></p>
                                <p className='text-[7px] sm:text-[11px]'>Where Campus Meets Commerce</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-center'>
                            {openNav ? (<X size={38} className='text-[#333333]' onClick={() => setOpenNav(false)} />) : (<Menu size={38} className='text-[#333333]' onClick={() => setOpenNav(true)} />)}
                        </div>
                    </div>
                    {openNav && (
                        <div className='mt-6 md:mt-8'>
                            <ul>
                                <ListNav name='Home' url='/#home' icon={<Home size={13} fill='gold' className='text-[#34C759]' />} />
                                <ListNav name='Categories' url='/#categories' icon={<ShoppingBag size={13}fill='gold' className='text-[#34C759]' />} />
                                <ListNav name='Vendors' url='/#vendors' icon={<Store size={13} fill='gold' className='text-[#34C759]' />} />
                                <ListNav name='About' url='/#about' icon={<Info size={13} fill='gold' className='text-[#34C759]' />} />
                                <ListNav name='Contact' url='/#contact' icon={<Phone size={13} fill='gold' className='text-[#34C759]' />} />
                                <li className='mt-1 sm:mt-3 md:mt-4'>
                                    <div className='flex items-center gap-4 md:gap-5'>
                                        <ListNav name='Sign Up' url='/signup' icon={<UserPlus size={13} fill='gold' className='text-[#34C759]' />} />
                                        <ListNav name='Sign In' url='/login' icon={<LogIn size={13} fill='gold' className='text-[#34C759]' />} />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>



                {/* Desktop Navbar */}
                <div className='hidden lg:block'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <Image src="/logo.png" width={40} height={40} alt='logo-img' />
                            <div>
                                <p className='text-2xl text-[#f7DC67] font-bold'>UNI<span className='text-[#34C759]'>MART</span></p>
                                <p className='text-[8px] ml-1'>Where Campus Meets Commerce</p>
                            </div>
                        </div>
                        <div className='w-[67%] lg:w-[75%] xl:w-1/2'>
                            <ul className='flex items-center w-full justify-between'>
                                <ListNav name='Home' url='/#home' />
                                <ListNav name='Categories' url='/#categories' />
                                <ListNav name='Vendors' url='/#vendors' />
                                <ListNav name='About' url='/#about' />
                                <ListNav name='Contact' url='/#contact' />
                                <li>
                                    <div className='flex items-center gap-3 xl:gap-4'>
                                        <ListNav name='Sign Up' url='/signup' icon={<UserPlus fill='gold' className='text-[#34C759]' />} />
                                        <ListNav name='Sign In' url='/login' icon={<LogIn fill='gold' className='text-[#34C759]' />} />
                                    </div>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>      
        </div>
    )
}

export default Navbar;