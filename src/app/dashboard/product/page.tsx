"use client";

import DashboardLayout from '@/components/Dashboard/DasboardLayout';
import ProductList from '@/components/Dashboard/ProductList';
import React from 'react';

const ProductPage = () => {
  return (
    <DashboardLayout>
      <div className="w-full bg-white text-[#333333] p-4 text-[13px] sm:text-sm md:text-base">
        <section className="flex flex-col items-center justify-center my-4 gap-2 text-center">
          <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl text-[#333333]">
            Available <span className="text-[#34C759]">Items</span> for Sale
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-xl">
            Browse items posted by fellow students. Want to sell something? Post your item and reach the community.
          </p>
        </section>

        {/* Product List */}
        <section className="mt-6">
          <ProductList />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default ProductPage;
