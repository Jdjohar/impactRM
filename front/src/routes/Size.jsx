'use client'

import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import icon from "../../public/ScrollIcon.png"


export default function Size() {

  
  const [selectedSize, setSelectedSize] = useState([])
  const [userId, setUserId] = useState(""); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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

  useEffect(()=>{
    const participantData = JSON.parse(localStorage.getItem('data'));
    const id = JSON.parse(localStorage.getItem('id'));

    setUserId(id)
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log("selectedSize=" + selectedSize.length);

    // Optional: Validate form data before submitting
    if (selectedSize.length===0) {
        alert("Please fill in all required fields.");
        return;
    }

    //console.log(selectedSize,"Before formData");
    

    setLoading(true); // Set loading to true before the request

    try {
        const response = await fetch("https://impactrm.onrender.com/api/v1/size", {
            method: "PUT", // Use PUT for updating
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: userId, // Pass the ID
                data: selectedSize, // Pass the updated data
            }),
        });
        console.log(selectedSize,"After formData");
        const result = await response.json();
        console.log(result, "Result");

        setLoading(false); // Set loading to false after response is received

        if (response.ok) {
          //alert("Data updated successfully-Size");
            navigate('/colors');
            // Optionally reset form data or redirect after submission
            
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        setLoading(false); // Set loading to false on error
        console.error("Error updating form:", error);
        alert("Failed to update form. Please try again later.");
    }
};



  return (
    <>
      <Header />

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
          <img
            src={icon}
            className="w-100"
            onClick={(e) => {
              e.preventDefault(); 
              handleSubmit(e); 
            }}
            style={{ cursor: 'pointer' }}
          />
          
        </div>

      </div>
    </>
  )
}

