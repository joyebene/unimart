"use client"
import React from 'react'
import Sidebar from '@/components/shared/Sidebar';
import Navbar from '@/components/Dashboard/Navbar';
import { useState } from 'react';

const DashboardLayout = ({children}: {children:React.ReactNode}) => {

    const [openSideBar, setOpenSidebar] = useState(false)

  return (
    <div>
        <Navbar setOpenNav={setOpenSidebar} />
        <div className='flex lg:pt-20'>
           <Sidebar setOpen={setOpenSidebar} openSideBar={openSideBar} />
        <div className='pt-18 lg:pt-0 lg:pl-10 xl:pl-20 w-full'>
            {children}
        </div> 
        </div>
        
    </div>
  )
}

export default DashboardLayout;