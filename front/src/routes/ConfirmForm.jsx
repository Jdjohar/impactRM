import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";

export default function ConfirmForm() {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
        phone: "",
        email: "",
    });
    const [userId, setUserId] = useState(""); // Corrected variable name for consistency
    const [loading, setLoading] = useState(false); // State to track loading status
    const location = useLocation(); // Moved here to avoid accessing it before definition
    const navigate = useNavigate();

    // Load participant data from location.state
    useEffect(() => {
    const participantData = JSON.parse(localStorage.getItem('data'));
    const id = JSON.parse(localStorage.getItem('id'));
    console.log(participantData);
    
        if (!participantData) {
            // Redirect if no participant data is found
            navigate("/");
            return;
        }

        // Populate formData with participant data
        setFormData((prev) => ({
            ...prev,
            ...participantData, // Ensure participantData.data matches the form structure
        }));
        setUserId(id); // Set user ID
    }, [location, navigate]);

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Optional: Validate form data before submitting
        if (!formData.name || !formData.address || !formData.city || !formData.email) {
            alert("Please fill in all required fields.");
            return;
        }

        console.log(formData,"Before formData");
        

        setLoading(true); // Set loading to true before the request

        try {
            const response = await fetch("https://impactrm.onrender.com/api/v1/updateParticipantData", {
                method: "PUT", // Use PUT for updating
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: userId, // Pass the ID
                    data: formData, // Pass the updated data
                }),
            });
            console.log(formData,"After formData");
            localStorage.setItem('data', JSON.stringify(formData))
            const result = await response.json();
            console.log(result, "Result");

            setLoading(false); // Set loading to false after response is received

            if (response.ok) {
                //alert("Data updated successfully");

                navigate('/product')
                // Optionally reset form data or redirect after submission
                setFormData({
                  name: "",
                  address: "",
                  address2: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  phone: "",
                  email: "",
                });
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
            <div className="min-h-screen bg-navy-blue flex flex-col items-center justify-center p-4">
                <div className="bg-white rounded-lg p-8 w-full max-w-md">
                    <div className="text-center mb-6">
                        <h3
                            className="text-xl text-left font-bold text-navy-blue mb-2"
                            style={{ color: "#202c5e" }}
                        >
                            Please confirm or edit your contact details below to ensure we have
                            an accurate shipping address.
                        </h3>
                        <p className="text-sm text-gray-600 text-left">
                            We apologize but we are unable to deliver to PO boxes.
                            <br />
                            (hint: tap on a text box to edit)
                        </p>
                    </div>

                    {/* Show loading spinner or message if loading is true */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-1">
                                Address 2
                            </label>
                            <input
                                type="text"
                                id="address2"
                                value={formData.address2}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                State
                            </label>
                            <input
                                type="text"
                                id="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                                Zip Code
                            </label>
                            <input
                                type="text"
                                id="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            style={{ background: "#202c5e" }}
                            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                        >
                            {loading ?

                                <button
                                    type="submit"
                                    disabled
                                    style={{ background: "#202c5e" }}
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                >Wating ...
                                </button>

                                :
                                <button
                                    type="submit"
                                    style={{ background: "#202c5e" }}
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                >Walk with Confidence
                                </button>
                            }
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
