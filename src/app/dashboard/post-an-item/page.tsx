"use client";
import DashboardLayout from '@/components/Dashboard/DasboardLayout';
import Button from '@/components/shared/Button';
import InputField from '@/components/shared/InputField';
import { convertFileToBase64, uploadBase64File } from '@/utils';
import { productAPI } from '@/utils/api';
import { Images } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';

const PostItempage = () => {

  const [formData, setFormData] = useState({
    imageUrl: "",
    productName: "",
    price: "",
    category: "",
    description: "",
    location: "",
    availability: ""
  })

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.productName || !formData.price || !formData.category || !formData.description) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const data = {
      title: formData.productName,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      imageUrl: formData.imageUrl, // Assuming single image for now
      location: formData.location,
      availability: Number(formData.availability) || 0,
      seller: {
        connect: { id: user?._id },  // Prisma relation connect
      },
    };

    try {
      await productAPI.create(data);
      toast.success('Product Posted Successfully!');
      // Reset Form or Redirect
      setFormData({
        imageUrl: "",
        productName: "",
        price: "",
        category: "",
        description: "",
        location: "",
        availability: ""
      });

    } catch (error) {
  const err = error as { response?: { data?: { message?: string } } };
  console.error(err);
  toast.error(err?.response?.data?.message || 'Failed to post product');

} finally {
      setLoading(false)
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, imageUrl: previewUrl }));

      const base64 = await convertFileToBase64(file);
      const uploadedUrl = await uploadBase64File(base64);

      if (uploadedUrl) {
        setFormData((prev) => ({ ...prev, imageUrl: uploadedUrl }));
        toast.success('Image uploaded successfully!');
      } else {
        toast.error('Failed to upload image.');
      }
    } catch (error) {
      console.error('Upload Error:', error);
      toast.error('An error occurred while uploading the image.');
    }
  };


  return (
    <DashboardLayout>
      <div className='w-full bg-white text-[#333333] p-4 px-4 text-[13px] sm:text-sm md:text-base'>
        <div className='flex flex-col items-center justify-center my-2 md:my-4 gap-1 md:gap-2'>
          <h1 className='font-bold text-2xl md:text-3xl xl:text-4xl py-1 text-[#333333] text-center'>Post an <span className='text-[#34C759]'>Item</span> for Sale</h1>
          <p className='text-[12px] sm:text-sm md:text-base text-center'>Got something to sell? Share it with our school community! Post your item for sale and connect with potential buyers.</p>
        </div>

        {/* Create Product */}
        <div className='mt-8 lg:mt-10 lg:px-10 xl:px-20  lg:w-2/3 mx-auto'>
          <form onSubmit={handleSubmit}>
            <label htmlFor="productImageUpload" className='hidden'>file</label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="productImageUpload"
              onChange={handleImageUpload}
            />

            <div
              onClick={() => document.getElementById('productImageUpload')?.click()}
              className="relative w-full aspect-[4/3] rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 transition overflow-hidden"
            >
              {formData.imageUrl ? (
                <Image
                  src={formData.imageUrl}
                  alt="product-image"
                  fill
                  className="object-cover rounded-lg"
                />
              ) : (
                <div className="absolute w-full h-full flex flex-col items-center justify-center gap-4">
                  <Images color="gray" className="w-8 h-8 lg:w-12 lg:h-12" />
                  <p className="text-gray-600 text-xs text-center">Click to upload image</p>
                </div>
              )}
            </div>


            <div>
              <InputField type='text' name='productName' title='Product Name' placeholder='Enter Product Name' value={formData.productName} handleChange={handleChange} />
            </div>
            <div className='flex items-center justify-between w-full gap-4'>
              <div className='w-1/2'>
                <InputField type='text' name='price' title='Price' placeholder='Enter Price in ₦' value={formData.price} handleChange={handleChange} />
              </div>
              <div className='w-1/2'>
                <div className='mt-6 xl:mt-8 flex flex-col gap-2'>
                  <label htmlFor="category" className='text-sm font-medium text-gray-700'>Category <span className='text-red-600'>*</span></label>
                  <select name="category" id="category" value={formData.category} onChange={handleChange} className="border border-gray-400 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" >
                    <option value="">Select Category</option>
                    <option value="Art">Art</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Food">Food</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

              </div>

            </div>
            <div className='mt-6 xl:mt-8 flex flex-col gap-2'>
              <label htmlFor="description" className='font-semibold text-sm md:text-base'>Description</label>
              <textarea id="description"
                placeholder='Enter Description' name='description' rows={6} value={formData.description}
                onChange={handleChange} className='bg-gray-100 py-1 md:py-2 px-4 rounded-xl outline-none' />
            </div>
            <div className='flex items-center justify-between w-full gap-4'>
              <div className='w-1/2'>
                <InputField type='text' name='location' title='Location' placeholder='Enter Location' value={formData.location} handleChange={handleChange} />
              </div>

              <div className='w-1/2'>
                <InputField type='text' name='availability' title='Availability' placeholder='Enter Number of Available Items' value={formData.availability} handleChange={handleChange} />
              </div>

            </div>
            <div className='w-full flex items-center justify-end lg:justify-center mt-6'>
              <Button text={loading ? 'Posting...' : 'Post'} className='w-[40%] lg:w-2/3' />
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default PostItempage;