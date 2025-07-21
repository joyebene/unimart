"use client";
import DashboardLayout from '@/components/Dashboard/DasboardLayout';
import ProductList from '@/components/Dashboard/ProductList';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { BarChart2, Briefcase, CreativeCommons, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';


const Category = ({ name, icon }: { name: string, icon: React.ReactNode }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/browse-products?category=${encodeURIComponent(name)}`);
  };
  return (
    <div className='bg-white text-[#333333] border border-gray-200 shadow-md flex flex-col items-center justify-center w-[25%] p-2 rounded-lg' onClick={handleClick}>
      <div className='flex items-center justify-center rounded-full p-2 h-10 w-10 bg-[#34C759]'>
        {icon}
      </div>
      <p className='text-[12px] sm:text-sm lg:text-base mt-1'>{name}</p>
    </div>
  );
};

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ fullName: string; email: string } | null>(null);
  console.log(user);


  useEffect(() => {
    const token = localStorage.getItem("token");
    const res = localStorage.getItem("user");

    if (!token || !res) {
      router.push("/login");
    } else {
      try {
        const parsedUser = JSON.parse(res);  // parse first
        setUser(parsedUser);  // set the parsed user object
        console.log('Parsed User:', parsedUser);
      } catch (err) {
        console.error("Failed to parse user data", err);
        router.push("/login");
      }
    }
  }, [router]);


  const getFirstName = (name?: string) => {
    if (!name) return 'Guest';
    const first = name.split(' ')[0];
    return first.charAt(0).toUpperCase() + first.slice(1);
  };


  return (
    <DashboardLayout>
      <div className='w-full bg-white text-[#333333] p-4 px-4'>
        {/* Welcome Section */}
        <div className="bg-green-700 px-4 sm:px-8 py-6 mx-auto rounded-lg shadow-sm shadow-green-500">
          <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl py-1 text-white">
            Welcome {user ? getFirstName(user.fullName) : "User"}
          </h1>
          <p className="text-[12px] sm:text-sm text-gray-100">
            You looking for something to buy or you want to sell?{" "}
            <span className="text-yellow-300 font-semibold">
              Uni<span className="text-green-400">mart</span>
            </span>{" "}
            got you covered
          </p>
          <Link href="/dashboard/browse-products">
            <Button text="Search Products" className="text-[12px] md:text-sm lg:text-base" />
          </Link>
        </div>


        {/* Recently Added Products */}
        <div>
          <div className='flex items-end justify-between mt-4 mb-6'>
            <p className='text-[14px] sm:text-sm md:text-base lg:text-lg font-semibold mb-1'>
              Recently Added Products
            </p>
            <Link href="/dashboard/product">
              <Button text="View All >" className='text-[12px] md:text-sm lg:text-base' />
            </Link>
          </div>

          <div>
            <ProductList limit={4} />
          </div>
        </div>

        {/* Top Categories */}
        <div>
          <div className='mt-6'>
            <p className='text-[14px] sm:text-sm md:text-base lg:text-lg font-semibold mb-1'>Top Categories</p>
          </div>
          <div className='flex gap-2 md:gap-4 mt-3 md:mt-2'>
            <Category name="Art" icon={<CreativeCommons color='white' size={90} />} />
            <Category name="Engineering" icon={<Settings color='white' size={100} />} />
            <Category name="Food" icon={<BarChart2 color="white" />} />
            <Category name="Business" icon={<Briefcase color='white' size={100} />} />
          </div>
        </div>

        {/* Subscription Plans */}
        <div className='mt-8'>
          <h2 className='text-[14px] sm:text-sm md:text-base lg:text-lg font-semibold mb-3'>Subscription Plans</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>

            {/* Free Plan */}
            <div className='bg-white border border-gray-200 rounded-lg shadow-md p-5 flex flex-col gap-2'>
              <h3 className='text-lg font-semibold text-[#34C759]'>Free</h3>
              <p className='text-sm text-gray-600'>Start selling with no cost. Limited to 5 products.</p>
              <p className='font-bold text-xl mt-2'>₦0</p>
              <ul className='text-sm text-gray-500 list-disc pl-5 mt-2'>
                <li>Up to 5 listings</li>
                <li>Basic support</li>
                <li>Community access</li>
              </ul>
              <Button text="Current Plan" className='mt-4 bg-gray-300 text-[#333] cursor-not-allowed' disabled />
            </div>

            {/* Pro Plan */}
            <div className='bg-white border border-gray-200 rounded-lg shadow-md p-5 flex flex-col gap-2'>
              <h3 className='text-lg font-semibold text-[#34C759]'>Pro</h3>
              <p className='text-sm text-gray-600'>Ideal for growing sellers. List up to 50 products.</p>
              <p className='font-bold text-xl mt-2'>₦500<span className='text-sm font-normal'> / month</span></p>
              <ul className='text-sm text-gray-500 list-disc pl-5 mt-2'>
                <li>Up to 50 listings</li>
                <li>Priority support</li>
                <li>Product promotion</li>
              </ul>
              <Button text="Upgrade to Pro" className='mt-4' />
            </div>

            {/* Premium Plan */}
            <div className='bg-white border border-gray-200 rounded-lg shadow-md p-5 flex flex-col gap-2'>
              <h3 className='text-lg font-semibold text-[#34C759]'>Premium</h3>
              <p className='text-sm text-gray-600'>Unlimited selling power and premium features.</p>
              <p className='font-bold text-xl mt-2'>₦1,500<span className='text-sm font-normal'> / month</span></p>
              <ul className='text-sm text-gray-500 list-disc pl-5 mt-2'>
                <li>Unlimited listings</li>
                <li>Featured products</li>
                <li>24/7 support</li>
              </ul>
              <Button text="Go Premium" className='mt-4' />
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
