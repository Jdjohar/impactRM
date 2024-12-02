import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
import shoe from "../../public/LabeledShoe.png";

// Dropdown color options
const colorOptions = [
  { value: 'Black', label: 'Black', image: a41 },
  { value: 'White', label: 'White', image: a42 },
  { value: 'Wolf Grey', label: 'Wolf Grey', image: a40 },
  { value: 'Moss', label: 'Moss', image: a39 },
  { value: 'Sesame', label: 'Sesame', image: a38 },
  { value: 'Sundail', label: 'Sundail', image: a37 },
  { value: 'Baltic Blue', label: 'Baltic Blue', image: a36 },
  { value: 'Racer Blue', label: 'Racer Blue', image: a35 },
  { value: 'Oxygen Purple', label: 'Oxygen Purple', image: a34 },
  { value: 'Fuchsia Fream', label: 'Fuchsia Fream', image: a33 },
  { value: 'Med Soft Pink', label: 'Med Soft Pink', image: a32 },
  { value: 'Pink Spell', label: 'Pink Spell', image: a31 },
  { value: 'University Red', label: 'University Red', image: a30 },
  { value: 'Diffused Taupe', label: 'Diffused Taupe', image: a30 }
];


  // Filter colorOptions dynamically based on the component
  const getFilteredOptions = (component) => {
    if (component === 'BacktabLogo' || component === 'Laces') {
      return colorOptions; // Include all colors for BacktabLogo and Laces
    }
    // Exclude "Diffused Taupe" for other components
    return colorOptions.filter((option) => option.value !== 'Diffused Taupe');
  };

function ShoeColorSelector() {
  const [selections, setSelections] = useState({});
  const [userid, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('');

  // Shoe components to be customized
  const shoeComponents = [
    'Vamp',
    'Tip',
    'Quarter',
    'Foxing',
    'Swoosh',
    'Collar',
    'Eyestay',
    'TongueLining',
    'Backtab',
    'BacktabLogo',
    'Laces'
  ];

  // Handle dropdown selection change
  const handleChange = (selectedOption, componentName) => {
    setSelections((prev) => ({
      ...prev,
      [componentName]: selectedOption
    }));
  };

  useEffect(() => {
    const participantData = JSON.parse(localStorage.getItem('data'));
    const id = JSON.parse(localStorage.getItem('id'));
    console.log(participantData);

    if (!participantData) {
      // Redirect if no participant data is found
      navigate("/");
      return;
    }
    setUserId(id); // Set user ID
  }, []);

  // Generate JSON for selected options
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const jsonResult = Object.fromEntries(
      Object.entries(selections).map(([key, value]) => [key, value?.value])
    );

    console.log("jsonResult=", jsonResult); // Logs the JSON to the console

    if (Object.keys(jsonResult).length == 99) {
      alert("Please fill in all required fields.");
      return;
    }

    if (Object.keys(jsonResult).length < 11) {
      setErrorMessage('Unfortunately, we\'re missing some elements of your order.');
      return
    } else {
      setErrorMessage('');
      //alert('Walk with Confidence!');
    }

    try {
      const response = await fetch("https://impactrm.onrender.com/api/v1/colors", {
        method: "PUT", // Use PUT for updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userid, // Pass the ID
          data: jsonResult, // Pass the updated data
        }),
      });

      const result = await response.json();
      console.log(result, "Result");

      setLoading(false); // Set loading to false after response is received

      if (response.ok) {
        //alert("Data updated successfully  - Colors");
        navigate('/choices'); // Redirect after successful update
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      setLoading(false); // Set loading to false on error
      console.error("Error updating form:", error);
      alert("Failed to update form. Please try again later.");
    }
  };

  // Custom dropdown indicator (Chevron)
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

  // Custom dropdown options
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

      <div className="relative w-full  max-w-md mx-auto">
          <img src={shoe}  className="w-full"/>
        </div>

        <h1 className="text-xl font-bold text-[#1a2a5e] text-center mb-8">
          For each of the options below, please select the color choices for your shoes.
        </h1>
        {/* Display Error Message */}
        {errorMessage && (
          <div className="text-center text-red-600 font-medium mb-4">
            {errorMessage}
          </div>
        )}



        <div className="space-y-4">
          {shoeComponents.map((component) => (
            <div key={component} className="flex items-center gap-4">
              <label htmlFor={component} className="w-28 text-[#1a2a5e] font-medium text-left">
                {component}
              </label>
              <Select
                id={`select-${component}`}
                options={getFilteredOptions(component)} // Use filtered options
        
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
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: 'white',
                    borderColor: state.isFocused ? '#1a2a5e' : '#e5e7eb',
                    boxShadow: state.isFocused ? '0 0 0 1px #1a2a5e' : 'none',
                    '&:hover': { borderColor: '#1a2a5e' },
                    minHeight: '40px', // Ensure the control has a consistent height
                    height: '40px', // Set a fixed height
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    height: '40px', // Match the height of the control
                    padding: '0 8px', // Adjust padding to center the content
                    display: 'flex',
                    alignItems: 'center', // Center align the content vertically
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    margin: 0, // Remove any margin that might cause misalignment
                  }),
                  input: (provided) => ({
                    ...provided,
                    margin: 0, // Remove input margin to prevent misalignment
                    padding: 0, // Remove input padding
                  }),
                  indicatorsContainer: (provided) => ({
                    ...provided,
                    height: '40px', // Match the height of the control
                  }),
                  indicatorSeparator: () => ({ display: 'none' }), // Hide the separator
                  dropdownIndicator: (provided) => ({
                    ...provided,
                    padding: '0', // Adjust padding for proper alignment
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? '#1a2a5e' : 'white',
                    color: state.isSelected ? 'white' : '#1a2a5e',
                    '&:hover': { backgroundColor: state.isSelected ? '#1a2a5e' : '#f9fafb' },
                  }),
                }}
              />

            </div>
          ))}
        </div>

        <div className="flex justify-center pt-4">

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
  );
}

export default ShoeColorSelector;
