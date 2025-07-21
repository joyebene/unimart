"use client";
import React from 'react';
import Image from 'next/image';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#333333] text-gray-300">
      <div className="mx-auto pt-2 sm:pt-20 md:pt-10 xl:pt-8 leading-tight tracking-tight px-4 sm:px-10 xl:px-20">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Unimart Logo + Social */}
          <div className="flex flex-col items-start">
            <div className='flex items-center gap-2'>
              <Image src="/logo.png" width={30} height={30} alt='logo-img' className='sm:w-12 sm:h-12' />
              <div>
                <p className='text-xl sm:text-3xl text-[#f7DC67] font-bold'>UNI<span className='text-[#34C759]'>MART</span></p>
                <p className='text-[7px] sm:text-[11px] text-white'>Where Campus Meets Commerce</p>
              </div>
            </div>
            <div className="flex gap-4 mt-3 xl:mt-4">
              <Facebook fill='#8BC34A' color='white' className=" cursor-pointer hover:scale-110 transition" />
              <Twitter fill='#8BC34A' color='white'  className="text-[#8BC34A] cursor-pointer hover:scale-110 transition" />
              <Instagram fill='#8BC34A' color='white'  className="text-[#8BC34A] cursor-pointer hover:scale-110 transition" />
            </div>
          </div>

          {/* Useful Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-[11px] md:text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-[#34C759]">Company</h4>
              <ul className="space-y-1">
                <li className='hover:text-[#8BC34A] transition-all duration-300'>About Us</li>
                <li className='hover:text-[#8BC34A] transition-all duration-300'>Contact</li>
                <li className='hover:text-[#8BC34A] transition-all duration-300'>Careers</li>
                <li className='hover:text-[#8BC34A] transition-all duration-300'>Partnerships</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-[#34C759]">Marketplace</h4>
              <ul className="space-y-1">
                <li className='hover:text-[#8BC34A] transition-all duration-300'>Browse Products</li>
                <li className='hover:text-[#8BC34A] transition-all duration-300'>Become a Vendor</li>
                <li className='hover:text-[#8BC34A] transition-all duration-300'>Vendor Dashboard</li>
                <li className='hover:text-[#8BC34A] transition-all duration-300'>Pricing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-[#34C759]">Support</h4>
              <ul className="space-y-1">
                <li className='hover:text-[#8BC34A] transition-all duration-300'>FAQs</li>
                <li className='hover:text-[#8BC34A] transition-all duration-300'>Help Center</li>
                <li className='hover:text-[#8BC34A] transition-all duration-300'>Community</li>
                <li className='hover:text-[#8BC34A] transition-all duration-300'>Affiliates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="bg-[#333333] text-gray-400 text-center text-[12px] md:text-sm py-3 mt-10">
        &copy; {new Date().getFullYear()} Unimart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
