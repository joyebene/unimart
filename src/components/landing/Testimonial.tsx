"use client";

import { User } from 'lucide-react';
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    testimony: "I love your site",
    department: "Maths",
    stars: 4,
  },
  {
    id: 2,
    name: "Hassam Adamu",
    testimony: "Best platform for students.",
    department: "Public Health",
    stars: 5,
  },
  {
    id: 3,
    name: "Jessie Billah",
    testimony: "Easy to use and navigate!",
    department: "MCB",
    stars: 5,
  },
  {
    id: 4,
    name: "Prince Heady",
    testimony: "Helped me a lot with resources.",
    department: "Biology Science",
    stars: 3,
  },
  {
    id: 5,
    name: "Mahmud Olatunji",
    testimony: "Clean interface and fast support.",
    department: "English",
    stars: 4,
  }
];

const renderStars = (count: number) => {
  return "★".repeat(count) + "☆".repeat(5 - count);
};

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ],
    customPaging: () => (
            <div className="custom-dot"></div>
        ),
        dotsClass: "slick-dots custom-dots",
  };

  return (
    <div id='testimonials' className="bg-white h-fit mb-20 lg:mb-24 pt-2 sm:pt-20 md:pt-10 xl:pt-8 leading-tight tracking-tight px-4 sm:px-10 xl:px-20">
      <div className="text-center mb-10">
        <p className='text-[12px] md:text-sm xl:text-lg text-[#8BC34A] italic'>What Our Users Says!</p>
        <h2 className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl text-center my-1">
         Testimonials
        </h2>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          See how our digital platform helps <span className='text-[#f7dc67] font-semibold'>BASUG</span> students and users achieve their goals.
        </p>
      </div>

      <Slider {...settings}>
        {testimonials.map((t) => (
          <div key={t.id} className="px-3">
            <div className="bg-white shadow-md rounded-lg p-6 h-full flex flex-col justify-between mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gray-100 p-2 rounded-full">
                  <User size={30} className="text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-base text-gray-800">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.department}</p>
                </div>
              </div>
              <p className="text-gray-700  text-sm mb-4">{t.testimony}</p>
              <p className="text-[#f7dc67] text-lg lg:text-xl">{renderStars(t.stars)}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;
