'use client';

import DashboardLayout from '@/components/Dashboard/DasboardLayout';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { productAPI } from '@/utils/api';
import Button from '@/components/shared/Button';

type Product = {
  id: string;
  title: string;
  description: string;
  availability: number;
  location: string;
  price: number;
  imageUrl: string;
  category: string;
  seller: {
    id: string;
    fullName: string;
    profileUrl?: string;
    address?: string;
    department?: string;
    whatsappNum?: string;
  };

};

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;
    const fetchProduct = async () => {
      try {
        const res = await productAPI.getById(params.id);
        console.log(res.data)
        setProduct(res.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params?.id]);

  const formatPhoneNumber = (num: string) => {
    if (!num) return '';
    return num.startsWith('0') ? `234${num.slice(1)}` : num;
  };


  if (loading) return <DashboardLayout><p className="p-4">Loading...</p></DashboardLayout>;
  if (!product) return notFound();

  return (
    <DashboardLayout>
      <div className="w-full min-h-screen bg-white text-[#333333] p-4 md:p-6">
        <div className="mb-4">
          <Link href="/dashboard/product">
            <button type="button" className="flex items-center text-[#34C759] hover:underline text-sm">
              <ArrowLeft className="mr-1" size={16} />
              Back to Products
            </button>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2 h-64 lg:h-96 relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.imageUrl || '/default.png'}
              alt={product.title}
              fill
              className="object-contain p-4"
            />
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-1/2 md:mt-3">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-[#34C759] font-bold text-lg">₦{product.price}</p>
            <div className='flex items-center justify-between w-full sm:w-2/3'>
              <p className="text-gray-500 text-sm">Category: {product.category}</p>
              <p className="text-gray-500 text-sm">Location: {product.location}</p>
            </div>

            <p className="text-gray-500 text-sm">Availability: {product.availability}</p>

            <div>
              <h3 className="font-semibold mb-1">Description</h3>
              <p className="text-gray-700 text-sm">{product.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Seller Details</h3>

              <div className="flex items-center gap-3">
                <Link href={`/dashboard/user/${product.seller.id}`} className="flex items-center gap-2">
                  <Image
                    src={product.seller.profileUrl || "/dashboard/default-avatar.png"}
                    alt={product.seller.fullName}
                    width={50}
                    height={50}
                    className="rounded-full border object-cover w-20 h-20"
                  />
                  <span className="text-sm md:text-base font-medium">{product.seller.fullName}</span>
                </Link>
              </div>
              <div className='flex items-center justify-between w-full sm:w-[20%] mt-4'>
                {product.seller.address && <p className="text-sm"><span className="font-medium ">Address:</span> {product.seller.address}</p>}
                {product.seller.department && <p className="text-sm"><span className="font-medium">Department:</span> {product.seller.department}</p>}
              </div>

            </div>

            {product.seller.whatsappNum ? (
              <Link
                href={`https://wa.me/${formatPhoneNumber(product.seller.whatsappNum)}?text=Hi%20${encodeURIComponent(
                  product.seller.fullName
                )},%20I'm%20interested%20in%20your%20product:%20${encodeURIComponent(
                  product.title
                )}.%20I%20got%20your%20number%20from%20Unimart.`}
                target="_blank"
              >
                <Button text="Chat on WhatsApp" />
              </Link>

            ) : (
              <div>
                <p className='text-gray-500 text-sm'>No WhatsApp Number</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
