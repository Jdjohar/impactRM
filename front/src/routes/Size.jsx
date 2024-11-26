'use client'

import { useState } from 'react'
import Header from '../components/Header'
import icon from "../../public/ScrollIcon.png";
export default function Size() {
  const [selectedSize, setSelectedSize] = useState([])

  const sizes = [
    'M 3.5 / W 5',
    'M 4 / W 5.5',
    'M 4.5 / W 6',
    'M 5 / W 6.5',
    'M 5.5 / W 7',
    'M 6 / W 7.5',
    'M 6.5 / W 8',
    'M 7 / W 8.5',
    'M 7.5 / W 9',
    'M 8 / W 9.5',
    'M 8.5 / W 10',
    'M 9 / W 10.5',
    'M 9.5 / W 11',
    'M 10 / W 11.5',
    'M 10.5 / W 12',
    'M 11 / W 12.5',
    'M 11.5 / W 13',
    'M 12 / W 13.5',
    'M 12.5 / W 14',
    'M 13 / W 14.5',
    'M 14 / W 15.5',
    'M 15 / W 16.5'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if all required fields are filled
    const { midsole, outsole, shoelery,tonguelabel } = selections;

    if (!midsole || !outsole || !shoelery || !tonguelabel) {
      setErrorMessage('Unfortunately, we\'re missing some elements of your order.');
    } else {
      setErrorMessage('');
      alert('Walk with Confidence!');
    }

    console.log(selections);
    const response = await fetch("http://localhost:3000/api/v1/updateParticipantData", {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ data: selections }),
    });


  };



  return (
    <>
    <Header/>
    
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-[#1a2a5e] mb-6">
        Please select your shoe size:
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`
              py-2 px-4 border-2 rounded
              ${selectedSize === size 
                ? 'border-[#1a2a5e] bg-[#1a2a5e] text-white' 
                : 'border-[#1a2a5e] text-[#1a2a5e] hover:bg-gray-50'
              }
              transition-colors duration-200
            `}
          >
            {size}
          </button>
        ))}
      </div>

      <div className="flex justify-center mt-8">
      <a href="http://localhost:5173/colors"> <img src={icon} className="w-100"/>

      </a>
        {/* <ChevronDown className="w-8 h-8 text-[#1a2a5e] animate-bounce" /> */}
      </div>

    </div>
    </>
  )
}

