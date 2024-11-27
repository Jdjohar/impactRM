import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import cong from "../../public/GradientsCongrats.png";
import clouds from "../../public/Clouds.png"; // Import the clouds image


export default function PromotionalCard() {
  const [otp, setOtp] = useState(Array(6).fill("")); // Initialize state for 6 OTP inputs
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(""); // State for error handling
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus on the next input box
      if (value !== "" && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    const pin = otp.join("");

    if (pin.length !== 6) {
      setError("Please enter a 6-digit PIN.");
      return;
    }

    setLoading(true); // Set loading state
    setError(""); // Reset error message
    setSuccessMessage(""); // Reset success message

    try {
      const response = await fetch("https://impactrm.onrender.com/api/v1/getParticipantDataByPin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pin }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Participant data retrieved successfully!");
        console.log("Participant Data:", data);
        localStorage.setItem('data',JSON.stringify(data.data))
        localStorage.setItem('id',JSON.stringify(data.id))

        navigate("/confirmdetails");

        // You can now use the data (e.g., navigate to another page, display the data, etc.)
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to retrieve participant data.");
      }
    } catch (err) {
      console.error("Error fetching participant data:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center bg-[#202c5e] relative">
        <div className="max-w-md rounded-lg text-center text-white">
          <h2
            style={{ fontSize: "30px" }}
            className="mb-2 p-4 pb-5 font-semibold"
          >
            Thank you for visiting Rubrik Booth #1948 at AWS re:Invent.
          </h2>
          <img
            src={cong}
            className="py-5 m-auto d-block"
            alt="Congratulations"
          />
          <p className="mb-4 p-4 pt-5 text-white">
            You have been selected to receive a{" "}
            <span className="font-bold">FREE</span> pair of customized Nike Dunk
            shoes from Rubrik.
          </p>
          <p className="mb-6 p-4">
            Please enter the PIN code from your text message to confirm your
            shipping details and select your customization options.
          </p>

          {/* OTP Input Fields */}
          <div className="mb-6 p-4 flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="flex h-12 w-12 items-center justify-center rounded-md bg-teal-200 text-center text-2xl font-bold text-[#1a2a5e] focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            ))}
          </div>

          {/* Display Loading, Error, or Success Messages */}
          {loading && (
            <p className="text-yellow-400 mb-4">Validating your PIN...</p>
          )}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}

          <button
            onClick={handleSubmit}
            style={{ marginBottom: "150px" }}
            className="rounded-md mb-5 p-4 bg-white px-4 py-2 font-medium text-[#1a2a5e] shadow hover:bg-gray-100"
          >
            Walk with Confidence
          </button>

          <img src={clouds} style={{ width: "100%" }} alt="Clouds" />
        </div>
      </div>
    </>
  );
}
