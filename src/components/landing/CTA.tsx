import React from 'react'
import Link from 'next/link';

const CTA = () => {
  return (
    <div className='w-full mb-6'>
        <div className='flex items-center mx-auto justify-between w-[90%] p-2 md:p-4 lg:py-8 rounded-md text-[#f7dc67] bg-[#8BC34A] h-12'>
          <h3 className='font-semibold text-[12px] sm:text-sm md:text-base lg:text-lg my-1'>Ready to get started?</h3>
          <Link href="/signup" className='text-white rounded-full bg-[#f7dc67] px-4 py-1 sm:py-2 md:px-12 hover:bg-white hover:text-[#f7DC67] hover:border hover:border-[#f7DC67] transition-all duration-300 shadow-md text-[12px] sm:text-sm md:text-base'>Sign Up</Link>
        </div>
    </div>
  )
}

export default CTA;