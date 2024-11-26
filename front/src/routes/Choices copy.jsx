import React, { useState,useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Select from 'react-select';
import Header from '../components/Header';


const midSoleOptions = [
  { value: 'Black', label: 'Black' },
  { value: 'White', label: 'White' }
];

const outSoleOptions = [
  { value: 'Black', label: 'Black' },
  { value: 'White', label: 'White' },
  { value: 'Sail', label: 'Sail' },
  { value: 'Racer Blue', label: 'Racer Blue' },
  { value: 'University Red', label: 'University Red' },
  { value: 'Gum Light Brown', label: 'Gum Light Brown' },
  { value: 'Fuschia Dream', label: 'Fuschia Dream' },
  { value: 'Med Soft Pink', label: 'Med Soft Pink' }
];

const shoeleryOptions = [
  { value: 'Metallic Gold', label: 'Metallic Gold' },
  { value: 'Metallic Silver', label: 'Metallic Silver' },
  { value: 'Gun Metal', label: 'Gun Metal' }
];

const tonguePrintOptions = [
  { value: 'Cool Grey', label: 'Cool Grey' },
  { value: 'Med Soft Pink', label: 'Med Soft Pink' },
  { value: 'Sesame', label: 'Sesame' },
];


const DropdownIndicator = () => (
  <div
    style={{
      color: 'white',
      backgroundColor: '#1a2a5e',
      borderRadius: '0 4px 4px 0',
      padding: '8px',
      display: 'flex',
      alignItems: 'center'
    }}
  >
    <ChevronDown size={20} />
  </div>
);

const Choice = () => {
  const [selections, setSelections] = useState({
    midsole: 'black',
    outsole: null,
    shoelery: null,
    tonguelabel: null,
    tongueText: ''
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleChange = (value, componentName) => {
    setSelections((prev) => ({
      ...prev,
      [componentName]: value
    }));
  };

  const handleTextChange = (event) => {
    setSelections({
      ...selections,
      tongueText: event.target.value
    });
  };

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
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-[#1a2a5e] text-center mb-8">
          Please make the following choices that will apply to your shoes:
        </h1>

        {/* Display Error Message */}
        {errorMessage && (
          <div className="text-center text-red-600 font-medium mb-4">
            {errorMessage}
          </div>
        )}

        <div className="space-y-4">
          {/* Midsole - Using Buttons instead of Select */}
          <div className="flex items-center gap-4">
            <label className="w-28 text-[#1a2a5e] font-medium text-left">Midsole</label>
            <div className="flex gap-4">
              {midSoleOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleChange(option.value, 'midsole')}
                  className={`px-4 py-2 rounded-full ${
                    selections.midsole === option.value
                      ? 'bg-[#1a2a5e] text-white'
                      : 'bg-white text-[#1a2a5e] border border-[#1a2a5e]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Outsole - Using Select */}
          <div className="flex items-center gap-4">
            <label className="w-28 text-[#1a2a5e] font-medium text-left">Outsole</label>
            <Select
              options={outSoleOptions}
              value={selections.outsole}
              onChange={(selectedOption) => handleChange(selectedOption.value, 'outsole')}
              className="flex-1 max-w-[200px]"
              classNamePrefix="react-select"
              placeholder="Select Outsoles"
              components={{
                DropdownIndicator
              }}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: 'white',
                  borderColor: state.isFocused ? '#1a2a5e' : '#e5e7eb',
                  boxShadow: state.isFocused ? '0 0 0 1px #1a2a5e' : 'none',
                  '&:hover': { borderColor: '#1a2a5e' }
                }),
              }}
            />
          </div>

          {/* Shoelery - Using Select */}
          <div className="flex items-center gap-4">
            <label className="w-28 text-[#1a2a5e] font-medium text-left">Shoelery</label>
            <Select
              options={shoeleryOptions}
              value={selections.shoelery}
              onChange={(selectedOption) => handleChange(selectedOption.value, 'shoelery')}
              className="flex-1 max-w-[200px]"
              classNamePrefix="react-select"
              placeholder="Select Shoelery"
              components={{
                DropdownIndicator
              }}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: 'white',
                  borderColor: state.isFocused ? '#1a2a5e' : '#e5e7eb',
                  boxShadow: state.isFocused ? '0 0 0 1px #1a2a5e' : 'none',
                  '&:hover': { borderColor: '#1a2a5e' }
                }),
              }}
            />
          </div>

                   {/* Tongue Print Label */}
          <div className="flex items-center gap-4">
            <label className="w-28 text-[#1a2a5e] font-medium text-left">Tongue Label</label>
            <Select
              options={tonguePrintOptions}
              value={selections.shoelery}
              onChange={(selectedOption) => handleChange(selectedOption.value, 'tonguelabel')}
              className="flex-1 max-w-[200px]"
              classNamePrefix="react-select"
              placeholder="Tongue Label"
              components={{
                DropdownIndicator
              }}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: 'white',
                  borderColor: state.isFocused ? '#1a2a5e' : '#e5e7eb',
                  boxShadow: state.isFocused ? '0 0 0 1px #1a2a5e' : 'none',
                  '&:hover': { borderColor: '#1a2a5e' }
                }),
              }}
            />
          </div>


          {/* Tongue Text */}
          <div className="flex items-center gap-4">
            <label className="w-28 text-[#1a2a5e] font-medium text-left">Tongue Text</label>
            <textarea
              value={selections.tongueText}
              onChange={handleTextChange}
              maxLength={7}
              className="flex-1 border border-gray-300 p-2"
              placeholder="Please leave blank if you don't want text"
            />
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            className="bg-[#1a2a5e] text-white px-6 py-2 rounded-lg"
            onClick={handleSubmit}  // Submit logic now checks for empty fields
          >
            Walk with Confidence
          </button>
        </div>
      </div>
    </>
  );
};

export default Choice;
