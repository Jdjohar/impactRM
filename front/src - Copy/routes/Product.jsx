import React, { useState } from "react";
import Header from "../components/Header";
import shoe from "../../public/LabeledShoe.png";
import icon from "../../public/ScrollIcon.png";
import { Link } from "react-router-dom";

export default function Product() {
  return (

    <>
    
      <Header />
    <div className="max-w-2xl mx-auto px-4 py-8">
      
      <main className="space-y-8">
        <h1 className="text-2xl font-bold text-[#1a2a5e] text-center">
          Now for the fun part!
        </h1>
        
        <p className="text-gray-700 text-center">
          There are a variety of customization options available for your shoes.
        </p>

        <div className="relative w-full aspect-square max-w-md mx-auto">
         
          
         <img src={shoe}  className="w-full"/>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700">
            If you want to preview color and location choices, you can visit Nike's Unlocked by You customization page by clicking{" "}
            <a href="#" className="text-[#1a2a5e] font-bold hover:underline">
              HERE
            </a>{" "}
            to simulate your choices.
          </p>

          <div className="">
       
            <p className="font-bold text-[#1a2a5e]">
            Note: Remember to use the LEATHER shoe option to see the available choices. Please don't use Croc Suede.
            </p>
          </div>

          <p className="text-gray-700">
            Once you decide what you want, come back to this form, enter your choices below and press SUBMIT. You can return to this form until all your choices are complete. Please complete your order no later than{" "}
            <span className="font-bold text-[#1a2a5e]">December 12, 2024</span>.
          </p>
        </div>

        <div className="flex justify-center pt-4">
           <Link to={'/size'}> <img src={icon} className="w-100"/></Link>
          {/* <ChevronDown className="w-8 h-8 text-[#1a2a5e] animate-bounce" /> */}
        </div>
      </main>
    </div>
    </>
  )
}

