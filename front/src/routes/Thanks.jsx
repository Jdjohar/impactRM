import React from 'react';
import Header from '../components/Header';
import logo from "../../public/Rubrik.png"
import thanksimage from "../../public/GradientThanks.png"
import clouds from "../../public/Clouds.png"; // Import the clouds image

const Thanks = () => {
  return (
    <>
    
   
    <div className="bg-[#202c5e] text-white min-h-screen flex flex-col cloud justify-center items-center">
      <div className="max-w-lg text-center space-y-4">
        {/* Logo */}
        <div className="mb-6 px-8">
          <img src={logo} alt="Rubrik Logo" className="mx-auto pb-20" />
        </div>
        
        {/* Main Message */}
        <h1 className="text-3xl font-bold px-8">
          Thank you for completing your order.
        </h1>
        <p className="mt-2 text-lg px-8">
          Please allow 2 – 4 weeks for order completion. We will send you shipping details once your order is on the way.
        </p>

        {/* Thanks Again Message */}
        <img src={thanksimage} className='w-full py-10 px-8' />

        {/* Contact Information */}
        <div className="mt-6 space-y-2 px-8">
          <p className="text-md">
            If you have any questions, please email 
            <span className="font-bold text-blue-300"> RubrikNikeGiveaway@impact-xm.com </span>
             and we'll be sure to get back to you.
          </p>
        </div>

        {/* Optional Clouds and Footer */}
    
      </div>
    </div>
    </>
  );
};

export default Thanks;
