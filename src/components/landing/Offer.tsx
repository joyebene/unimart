import { Bike, MessageCircle, Shield, Store } from 'lucide-react';
import React from 'react'

interface GridBoxProps {
    icon: React.ReactNode;
    title: string;
    text: string;
}

const GridBox = ({icon, title, text}: GridBoxProps)=> {
    return(
        <div className="h-36 shadow-lg rounded-xl bg-white">
            <div className="bg-[#f7dc67] p-4 rounded-br-full w-[30%] h-12 flex items-center justify-start">{icon}</div>
            <div className='px-4 py-3'>
            <h2 className='text-sm md:text-base xl:text-lg font-semibold text-[#333333]'>{title}</h2>
            <p className='text-[12px] md:text-sm text-[#333333]'>{text}</p> 
            </div>
           
        </div>
    )
}

const Offer = () => {
  return (
    <div className='bg-white h-[calc(100vh-5rem)] lg:h-[70vh] pt-2 sm:pt-20 md:pt-10 xl:pt-8 leading-tight tracking-tight px-4 sm:px-10 xl:px-20'>
        <div className='w-full'>
            <div className='flex flex-col items-center justify-center mb-6 md:mb-10 xl:mb-12'>
                <p className='text-[12px] md:text-sm xl:text-lg text-[#8BC34A] italic'>What We Offer</p>
                <h1 className='font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl text-center my-1'>We Provide The Best <span className='text-[#f7dc67]'>Services</span></h1>
                <p className='text-sm md:text-lg text-center my-2'>At <span className='text-[#f7dc67]'>Uni<span className='text-[#34C759]'>mart</span></span>, we offer a wide range of products and services designed to make your shopping experience seamless and enjoyable.</p>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
                <GridBox icon={<Store color='white' fill='#34C759' />} title='Student Shops' text='Personal storefronts for every student seller' />

                <GridBox icon={<Shield color='white' fill='#34C759'  />} title='Secure Orders' text='Verified transactions within campus'/>

                <GridBox icon={<Bike color='white' fill='#34C759' />} title='Local Delivery' text='
                Connect with campus delivery agents'/>

                <GridBox icon={<MessageCircle color='white' fill='#34C759'  />} title='Real-time Chat' text='Talk to buyers/sellers Instently' />
            </div>
        </div>
    </div>
  )
}

export default Offer;