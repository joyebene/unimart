import Image from 'next/image';
import React from 'react'
import Link from 'next/link';

const About = () => {
    return (
        <div className='bg-white h-[100vh] lg:h-[90vh] pt-2 sm:pt-20 md:pt-10 xl:pt-8 leading-tight tracking-tight px-4 sm:px-10 xl:px-20'>
            <div className='text-center'>
                <p className='text-[12px] md:text-sm xl:text-lg text-[#8BC34A] italic mt-6 sm:mt-2 md:mt-4 text-start'>About Our Market Place</p>
                <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-start'>About <span className='text-[#f7dc67]'>Uni<span className='text-[#34C759]'>mart</span></span></h1>
            </div>
            <div className='flex flex-col md:flex-row items-center justify-center lg:items-start sm:gap-10 md:gap-0'>
                <div className='order-2 md:order-1 flex flex-col items-start justify-center md:items-start gap-3 sm:gap-4 lg:mt-20 xl:mt-24 md:w-2/3'>
                    <p className='text-sm md:text-lg md:text-start'>At <span className='text-[#f7dc67]'>Uni<span className='text-[#34C759]'>mart</span></span>, we&apos;re passionate about connecting buyers with their favorite products and helping businesses grow. Join our community today and discover a world of convenience and value! Our mission is to make online shopping easy, convenient, and accessible to everyone. With a focus on customer satisfaction, we strive to deliver exceptional service, fast shipping, and secure transactions.</p>
                    <Link href="/signup" className='mt-1'>
                        <button type='button' className='w-full text-sm md:text-base font-semibold text-white bg-[#f7DC67] px-4 py-2 lg:px-6 lg:py-3 rounded-full hover:bg-white hover:text-[#f7DC67] hover:border hover:border-[#f7DC67] transition-all duration-300 shadow-md'>Learn More</button>
                    </Link>
                </div>
                <div className='w-full h-64 md:h-80 xl:h-[calc(100vh-15rem)] relative md:order-2 flex items-center justify-center'>
                    <Image src="/landing/about-img (1).png" width={600} height={600} alt="hero-img" className='absolute bg-center mx-auto w-[100%] sm:w-2/3 md:w-full' />
                </div>
            </div>
        </div>
    )
}

export default About;