import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const Steps = () => {

    const steps = [
        { id: "1", title: "Create Account", text: "Just create your account" },
        { id: "2", title: "Set Up Shop/Browse", text: "Set up your shop or browse available products" },
        { id: "3", title: "List or Order items", text: "List or order the items you need" },
        { id: "4", title: "Pay or Deliver Locally", text: "Complete your transaction with secure payment or local delivery" },
    ]

    return (
        <div className='bg-[#8BC34A] min-h-screen xl:h-[calc(100vh-5rem)] pt-2 sm:pt-20 md:pt-10 xl:pt-8 leading-tight tracking-tight px-4 sm:px-10 xl:px-20 text-gray-50'>
            <div className='text-center mb-7'>
                <p className='text-[12px] md:text-sm xl:text-lg text-white italic mt-6 sm:mt-2 md:mt-4'>How to get Started</p>
                <h1 className='font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl my-1'>Easy <span className='text-[#f7dc67]'>Steps</span> to Get Started</h1>
            </div>
            <div className='flex flex-col md:flex-row items-center justify-center md:justify-start md:items-start gap-10 md:gap-0'>
                <div className='w-full md:w-1/2 h-72 md:h-96 xl:h-[calc(100vh-15rem)] relative flex items-center justify-center'>
                    <Image src="/landing/img4.webp" width={500} height={500} alt="hero-img" className='absolute bg-center' />
                </div>
                <div className='lg:mt-10 xl:mt-12 text-center md:text-start'>
                    <p className='text-sm md:text-lg text-center md:text-start mt-6 md:mt-0 mb-2'>Getting started on BASUG MarketPlace is simple and fast. Start now on <span className='text-[#f7dc67]'>Uni<span className='text-white'>mart</span></span> in 4 easy steps.</p>
                    <div className='mt-8 lg:mt-10 text-end md:text-start'>
                        {steps.map((step, index) => (
                            <div key={index} className='relative mb-8 pl-3 md:pl-4'>
                                <div className='text-white bg-[#f7dc67] rounded-full absolute left-0 -top-1 md:top-0 w-12 h-12 p-2 flex items-center justify-center'>{step.id}</div>
                                <div className='flex flex-col justify-center items-start ml-12 mt-3'>
                                    <h3 className='md:text-lg font-semibold text-start'>{step.title}</h3>
                                    <p className='text-[12px] md:text-sm text-start'>{step.text}</p>
                                </div>

                                {index < steps.length - 1 && (
                                    <div className='absolute bg-[#f7dc67] top-10 w-px h-full left-6'></div>
                                )}
                            </div>
                        ))}

                        <div className='h-20 pt-3 xl:pt-5'>
                            <Link href="/signup" className='text-white rounded-full bg-[#f7dc67] px-8 py-3 md:px-12 lg:py-4 hover:bg-white hover:text-[#f7DC67] hover:border hover:border-[#f7DC67] transition-all duration-300 shadow-md'>Get Started</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Steps;