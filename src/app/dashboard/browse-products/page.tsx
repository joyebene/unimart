'use client';

import DashboardLayout from '@/components/Dashboard/DasboardLayout';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { productAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import ProductList from '@/components/Dashboard/ProductList';
import { useSearchParams } from 'next/navigation';

const BrowseProductsPage = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  
  const [query, setQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productAPI.getAll();
        setAllProducts(res.data);

        if (categoryParam) {
          const filtered = res.data.filter((product: any) =>
            product.category.toLowerCase() === categoryParam.toLowerCase()
          );
          setFilteredProducts(filtered);
          setSearched(true);
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryParam]);

  const handleSearch = () => {
    if (!query.trim()) {
      toast.error('Please enter a search term');
      return;
    }
    const filtered = allProducts.filter((product: any) =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description?.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.location?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    setSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <DashboardLayout>
      <div className='bg-[url("/dashboard/img3.jpg")] min-h-screen bg-center bg-cover text-sm text-[#333333]'>
        <div className='min-h-screen w-full bg-green-700/45 p-4'>
          {/* Search Box */}
          <div className='flex items-center bg-white w-full md:w-2/3 rounded-lg mx-auto border border-gray-200 shadow-sm'>
            <input
              type="text"
              placeholder='Search a product'
              className='outline-none p-3 rounded-l-lg w-full'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              onClick={handleSearch}
              className='h-12 bg-[#f7dc67] flex items-center justify-center px-4 rounded-r-lg hover:bg-[#eacb4f] transition'
            >
              <Search size={24} color='white' />
            </button>
          </div>

          {/* Search or Category Filter Results */}
          <div className='mt-8 p-4 bg-white rounded-lg shadow-md'>
            {loading ? (
              <p className='text-center text-gray-500'>Loading products...</p>
            ) : searched ? (
              filteredProducts.length > 0 ? (
                <ProductList products={filteredProducts} />
              ) : (
                <p className='text-center text-gray-600'>
                  {categoryParam
                    ? `No products found in '${categoryParam}' category.`
                    : `No products found for '${query}'.`}
                </p>
              )
            ) : (
              <p className='text-center text-gray-500'>
                {categoryParam
                  ? `Showing products in '${categoryParam}' category.`
                  : 'Enter a search term to find products.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BrowseProductsPage;
