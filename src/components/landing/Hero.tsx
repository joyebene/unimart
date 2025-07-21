import Image from 'next/image';
import React from 'react'
import Link from 'next/link';

const Hero = () => {
  return (
    <div className='bg-white h-[calc(100vh-5rem)] lg:h-[80vh] pt-2 sm:pt-20 md:pt-10 xl:pt-8 leading-tight tracking-tight px-4 sm:px-10 xl:px-20'>
        <div className='flex flex-col md:flex-row items-center justify-center lg:items-start sm:gap-10 md:gap-0'>
            <div className='order-2 md:order-1 flex flex-col items-center justify-center md:items-start gap-3 sm:gap-4 lg:mt-20 xl:mt-24'>
                <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold w-[80%] text-center md:text-start'>Buy, Sell, and <span className='text-[#f7DC67]'>Connect</span> - All Within <span className='text-[#34C759]'>BASUG!</span></h1>
                <p className='text-sm md:text-lg text-center md:text-start'>Discover a vibrant marketplace built exclusively for the students and staff of Bauchi State University, Gadau.</p>
                <Link href="/signup">
                  <button type='button' className='w-full text-sm md:text-base font-semibold text-white bg-[#f7DC67] px-4 py-2 lg:px-6 lg:py-3 rounded-full hover:bg-white hover:text-[#f7DC67] hover:border hover:border-[#f7DC67] transition-all duration-300 shadow-md'>Get Started</button>
                </Link>
                
            </div>
            <div className='w-full lg:w-1/2 h-72 md:h-80 xl:h-[calc(100vh-15rem)] relative md:order-2 flex items-center justify-center'>
             <Image src="/landing/OIP.jpg" width={500} height={500}  alt="hero-img" className='absolute bg-center mx-auto w-[90%] sm:w-2/3 md:w-full' />
            </div>
        </div>
    </div>
  )
}

export default Hero;