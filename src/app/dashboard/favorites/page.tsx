'use client';

import DashboardLayout from '@/components/Dashboard/DasboardLayout';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { userAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import ProductList from '@/components/Dashboard/ProductList';


interface WishlistItem {
  id: string;
  product: {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    category: string;
    seller: {
      connect: { id: string };
      fullName: string;
    };
  };
}

const MyFavoritePage = () => {
  const [favorites, setFavorites] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const res = await userAPI.getWishlist();
      setFavorites(res.data);
    } catch (error) {
      console.error('Failed to fetch wishlist', error);
      toast.error('Error fetching favorites');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full bg-white text-[#333333] p-4">
        <div className="flex flex-col items-center justify-center md:mt-6 mb-6 gap-2">
          <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl text-center">
            My <span className="text-[#34C759]">Favorites</span>
          </h1>
          <p className="text-sm md:text-base text-center text-gray-600">
            All products you&apos;ve liked will appear here for easy access.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading...</p>
        ) : favorites.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p>You haven&apos;t added any favorites yet.</p>
            <Link href="/dashboard/browse-products">
              <Button text="Browse Products" className="mt-4" />
            </Link>
          </div>
        ) : (
          <ProductList
            products={favorites.map((fav) => ({
              id: fav.product.id,
              title: fav.product.title,
              price: fav.product.price,
              imageUrl: fav.product.imageUrl,
              category: fav.product.category,
              seller: {
                connect: { id: fav.product.seller?.connect?.id || 'unknown' },
                fullName: fav.product.seller?.fullName || 'N/A',
              },
            }))}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyFavoritePage;
