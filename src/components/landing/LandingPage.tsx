import React from 'react'
import Hero from './Hero';
import Offer from './Offer';
import Steps from './Steps';
import About from './About';
import Testimonial from './Testimonial';
import CTA from './CTA';

const LandingPage = () => {
  return (
    <div className=' pt-16 lg:pt-24 bg-white text-[#333333]'>
      <Hero />
      <Offer />
      <Steps />
      <About />
      <Testimonial />
      <CTA />
    </div>
  )
}

export default LandingPage;