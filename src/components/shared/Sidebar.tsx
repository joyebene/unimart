"use client"
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import {  LayoutDashboard,
  ShoppingCart,
  PlusCircle,
  MessageCircle,
  Heart,
  UserCog, X, 
  Menu,
  CreditCard} from 'lucide-react';


interface ListNavProps {
    name: string;
    url: string;
    icon?: React.ReactNode;
};

interface menuProps{
  setOpen?: (open: boolean) => void;
  openSideBar?: boolean;
}


const Sidebar = ({setOpen, openSideBar}: menuProps) => {

    const ListNav = ({ name, url, icon }: ListNavProps) => {
        return (
            <li className='mt-3 md:mt-4'><Link href={url} onClick={() => { setOpen?.(false) }} className={`${name === 'Sign Up' && "bg-[#f7DC67] shadow-md text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-white hover:text-[#f7DC67] hover:border hover:border-[#f7DC67] transition-all duration-300"}  ${name === 'Sign In' && "bg-white text-[#f7DC67] border border-[#f7DC67] shadow-md hover:bg-[#f7DC67] hover:text-white hover:border-none transition-all duration-300 px-3 py-1 sm:px-4 sm:py-2 rounded-full"} flex items-center gap-1 sm:gap-2 md:gap-3 lg:hover:text-[#8BC34A] transition-all duration-300 text-[12px] sm:text-sm md:text-base`}> {icon} {name}</Link></li>
        )
    }

    const DesktopListNav = ({name, url, icon}: ListNavProps) => {
        return (
            <li>
             <Link href={url} onClick={() => setOpen?.(!openSideBar)} className={`flex items-center gap-3 py-2 w-full hover:bg-gray-200 px-4 rounded-lg transition-all duration-300 ${!openSideBar && "shadow-sm border border-gray-200"}`}>
            {icon}
            {openSideBar && (
                <p className='text-base'>{name}</p>  
            )}
            </Link>
            </li>
          
        )
    }


    return (
        <div className='lg:w-fit'>
            {/* Mobile Sidebar */}
            {openSideBar && (
                <div className='bg-black/40 fixed h-screen w-screen z-30 lg:hidden' onClick={() => setOpen?.(false)}>
                </div>
            )}
            {openSideBar && (
                <div className='lg:hidden p-4 fixed z-50 bg-white text-[#333333] shadow-md h-screen w-[60%]'>
                    <div className='flex items-center justify-between border-b border-gray-300 pb-4'>
                        <div className='flex items-center gap-1'>
                            <Image src="/logo.png" width={20} height={20} alt='logo-img' className='sm:w-12 sm:h-12' />
                            <div>
                                <p className='text-sm text-[#f7DC67] font-bold'>UNI<span className='text-[#34C759]'>MART</span></p>
                                <p className='text-[5px] sm:text-[11px]'>Where Campus Meets Commerce</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <X size={25} className='text-[#333333]' onClick={() => setOpen?.(false)} />
                        </div>
                    </div>
                    <div className='mt-6'>
                        <h2 className='text-sm font-semibold'>Menu</h2>
                        <ul className='mt-1 flex flex-col justify-between gap-3 pl-1'>
                            <ListNav url='/dashboard' name='Dashboard' icon= {<LayoutDashboard size={20} fill='gold' className='text-[#34C759]' />} />
                            <ListNav url='/dashboard/browse-products' name='Browse Products' icon= {<ShoppingCart size={20} fill='gold' className='text-[#34C759]' />} />
                            <ListNav url='/dashboard/post-an-item' name='post An Item' icon= {<PlusCircle size={20} fill='gold' className='text-[#34C759]' />} />
                            <ListNav url='/dashboard/subscriptions' name='Subscriptions' icon= {<CreditCard size={20} fill='gold' className='text-[#34C759]' />} />
                            <ListNav url='/dashboard/messages' name='Messages' icon= {<MessageCircle size={20} fill='gold' className='text-[#34C759]' />} />
                            <ListNav url='/dashboard/favorites' name='Favorites' icon= {<Heart size={20} fill='gold' className='text-[#34C759]' />} />
                            <ListNav url='/dashboard/profile-settings' name='Profile Settings' icon={<UserCog size={20} fill='gold' className='text-[#34C759]' />} />
                        </ul>
                    </div>
                </div>
            )}


            {/* Desktop Sidebar */}
            <div className='hidden lg:block fixed bg-white text-[#333333] shadow-md h-screen z-50'>
                <div className='p-2'>
                    <div className='w-full pt-4 flex items-center justify-center'>
                    {openSideBar? <X size={35} fill='gold' className='text-[#34C759] float-end' onClick={() => setOpen?.(false)} /> : <Menu size={35} className='text-gray-600'  onClick={() => setOpen?.(true)} />}
                    </div>
                    <ul className='flex flex-col justify-between gap-2 mt-5 w-full'>
                        <DesktopListNav url='/dashboard' name='Dashboard' icon= {<LayoutDashboard size={30} fill='gold' className='text-[#34C759]' />}  />
                        <DesktopListNav url='/dashboard/browse-products' name='Browse Products' icon= {<ShoppingCart size={30} fill='gold' className='text-[#34C759]' />} />
                        <DesktopListNav url='/dashboard/post-an-item' name='Post An Item' icon= {<PlusCircle size={30} fill='gold' className='text-[#34C759]' />} />
                        <DesktopListNav url='/dashboard/subscriptions' name='Subscriptions' icon= {<CreditCard size={30} fill='gold' className='text-[#34C759]' />} />
                        <DesktopListNav url='/dashboard/messages' name='Messages' icon= {<MessageCircle size={30} fill='gold' className='text-[#34C759]' />} />
                        <DesktopListNav url='/dashboard/favorites' name='Favorites' icon= {<Heart size={30} fill='gold' className='text-[#34C759]' />} />
                        <DesktopListNav url='/dashboard/profile-settings' name='Profile Settings' icon={<UserCog size={30} fill='gold' className='text-[#34C759]' />} />
                    </ul>  
                </div>
            </div>
        </div>
    )
}

export default Sidebar