import React, { useState } from 'react';
import Select from 'react-select';
// import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import icon from "../../public/ScrollIcon.png";

import a30 from "../../public/colors/Asset 30.png";
import a31 from "../../public/colors/Asset 31.png";
import a32 from "../../public/colors/Asset 32.png";
import a33 from "../../public/colors/Asset 33.png";
import a34 from "../../public/colors/Asset 34.png";
import a35 from "../../public/colors/Asset 35.png";
import a36 from "../../public/colors/Asset 36.png";
import a37 from "../../public/colors/Asset 37.png";
import a38 from "../../public/colors/Asset 38.png";
import a39 from "../../public/colors/Asset 39.png";
import a40 from "../../public/colors/Asset 40.png";
import a41 from "../../public/colors/Asset 41.png";
import a42 from "../../public/colors/Asset 42.png";
import Header from '../components/Header';

const colorOptions = [
  { value: 'Black', label: 'Black', image: a41 },
  { value: 'White', label: 'White', image: a42 },
  { value: 'Wolf Gray', label: 'Wolf Gray', image: a42 },
  { value: 'Moss', label: 'Moss', image: a39 },
  { value: 'Sesame', label: 'Sesame', image: a38 },
  { value: 'Sundail', label: 'Sundail', image: a37 },
  { value: 'Baltic Blue', label: 'Baltic Blue', image: a36 },
  { value: 'Racer Blue', label: 'Orange', image: a35 },
  { value: 'Oxygen Purple', label: 'Oxygen Purple', image: a34 },
  { value: 'Fuchsia Fream', label: 'Fuchsia Fream', image: a33 },
  { value: 'Med Soft Pink', label: 'Med Soft Pink', image: a32 },
  { value: 'Pink Spell', label: 'Pink Spell', image: a31 },
  { value: 'University Red', label: 'University Red', image: a30 }
];

function ShoeColorSelector() {
  const [selections, setSelections] = useState({});

  const shoeComponents = [
    'Vamp',
    'Tip',
    'Quarter',
    'Foxing',
    'Swoosh',
    'Collar',
    'Eyestay',
    'Tongue/Lining',
    'Backtab',
    'Backab logo',
    'Laces'
  ];

  const handleChange = (selectedOption, componentName) => {
    setSelections((prev) => ({
      ...prev,
      [componentName]: selectedOption
    }));
  };

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

//   const CustomOption = ({ innerRef, innerProps, label, data }) => (
    
//     <div
//       ref={innerRef}
//       {...innerProps}
//       style={{ display: 'flex', alignItems: 'center', padding: '8px', cursor: 'pointer' }}
//     >
//       {/* <Image
//         src={data.image}
//         alt={label}
//         width={20}
//         height={20}
//         style={{ marginRight: '8px', borderRadius: '50%' }}
//       /> */}
//       <span>{label}</span>
//     </div>
//   );
// Custom option renderer
const customOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div ref={innerRef} {...innerProps} style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <img
          src={data.image}
          alt={data.label}
          style={{ width: "30px", height: "30px", marginRight: "10px", borderRadius: "50%" }}
        />
        {data.label}
      </div>
    );
  };

  // Custom single value renderer
const customSingleValue = (props) => {
    const { data } = props;
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={data.image}
          alt={data.label}
          style={{ width: "20px", height: "20px", marginRight: "10px", borderRadius: "50%" }}
        />
        {data.label}
      </div>
    );
  };
  return (

    <>
    <Header />
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-[#1a2a5e] text-center mb-8">
        For each of the options below, please select the color choices for your shoes.
      </h1>

      <div className="space-y-4">
        {shoeComponents.map((component) => (
          <div key={component} className="flex items-center gap-4">
            <label htmlFor={component} className="w-28 text-[#1a2a5e] font-medium text-left">
              {component}
            </label>
            <Select
              id={`select-${component}`}
              options={colorOptions}
              value={selections[component]}
              onChange={(selectedOption) => handleChange(selectedOption, component)}
              className="flex-1 w-full"
              classNamePrefix="react-select"
              placeholder="Select color"
              components={{
                DropdownIndicator,
                Option: customOption,
                SingleValue: customSingleValue,
              }}
            //   components={{ DropdownIndicator, Option: CustomOption }}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: 'white',
                  borderColor: state.isFocused ? '#1a2a5e' : '#e5e7eb',
                  boxShadow: state.isFocused ? '0 0 0 1px #1a2a5e' : 'none',
                  '&:hover': { borderColor: '#1a2a5e' }
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? '#1a2a5e' : 'white',
                  color: state.isSelected ? 'white' : '#1a2a5e',
                  '&:hover': { backgroundColor: state.isSelected ? '#1a2a5e' : '#f9fafb' }
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: '#1a2a5e'
                }),
                indicatorSeparator: () => ({ display: 'none' }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  padding: 0
                })
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-4">
           <a href="http://localhost:5173/choices"> <img src={icon} className="w-100"/></a>
          {/* <ChevronDown className="w-8 h-8 text-[#1a2a5e] animate-bounce" /> */}
        </div>
    </div>
    </>
  );
}

export default ShoeColorSelector;
