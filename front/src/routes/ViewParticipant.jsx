import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { border } from '@cloudinary/url-gen/qualifiers/background';


const sendWinnerSMS = async (pin,phone) => {
    if (confirm("You are about to send a Winner SMS to (" + phone + ") Are you sure?") == true) {
        const response = await fetch('https://impactrm.onrender.com/api/v1/sendWinnerSMS?pin='+pin+'&phone='+phone);
    } 
};

const sendShippedSMS = async (linktracking,phone) => {
    if (confirm("You are about to send a Shipped SMS to (" + phone + ") Are you sure?") == true) {
        const response = await fetch('https://impactrm.onrender.com/api/v1/sendShippedSMS?linktracking='+linktracking+'&phone='+phone);
    } 
};

const winnerSMS = (e, pin,phone) => {
    e.preventDefault();
    sendWinnerSMS(pin,phone);
};

const shippedSMS = (e, linktracking,phone) => {
    e.preventDefault();
    if(linktracking.length>10){
        sendShippedSMS(linktracking,phone);
    }
};

const ParticipantList = () => {
    const [StudentData, setStudentData] = useState([]);
    const [FetchData, setFetchData] = useState(true);


    const columns = [
        {
            cell:(row) => <button  class="focus:outline-none text-white bg-green-500 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-small rounded-lg text-sm px-1 py-1 me-1 mb-2 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-500" onClick={(e) => winnerSMS(e, row.pin,row.Phone)}>Winner</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "5rem",
            name: "SMS"
        },
   
                {
            cell:(row) => <button  class="focus:outline-none text-white bg-green-500 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-small rounded-lg text-sm px-1 py-1 me-1 mb-2 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-500" onClick={(e) => shippedSMS(e, row.linktracking,row.Phone)}>Shipped</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "5rem",
            name: "SMS"            
        },
               

        { name: 'Date', selector: row => row.created, compact: true,width: "6rem",},
        { name: 'Id', selector: row => row.id, compact: true,width: "3rem",},
        { name: 'Name', selector: row => row.Name,wrap:true,compact: true,},
        { name: 'PIN', selector: row => row.pin,wrap:true,compact: true,width: "5rem",},
        { name: 'Address', selector: row => row.Address,wrap:true,compact: true,width: "10rem",},
        { name: 'Address2', selector: row => row.Address2,wrap:true,compact: true,},
        { name: 'State', selector: row => row.State,wrap:true,compact: true,width: "3rem",},
        { name: 'City', selector: row => row.City,wrap:true,compact: true,width: "5rem",},
        { name: 'ZIP', selector: row => row.ZIP,wrap:true,compact: true,width: "4rem",},
        { name: 'Phone', selector: row => row.Phone,wrap:true,compact: true,width: "6rem",},
        { name: 'Email', selector: row => row.Email,wrap:false,compact: true,},
        { name: 'Size', selector: row => row.size,wrap:true,compact: true,width: "5rem",},
        { name: 'Vamp', selector: row => row.Vamp,wrap:true,compact: true,width: "4rem",},
        { name: 'Tip', selector: row => row.Tip,wrap:true,compact: true,width: "4rem",},
        { name: 'Quarter', selector: row => row.Quarter,wrap:true,compact: true,width: "4rem",},
        { name: 'Foxing', selector: row => row.Foxing,wrap:true,compact: true,width: "4rem",},
        { name: 'Swoosh', selector: row => row.Swoosh,wrap:true,compact: true,width: "4rem",},
        { name: 'Collar', selector: row => row.Collar,wrap:true,compact: true,width: "4rem",},
        { name: 'Eyestay', selector: row => row.Eyestay,wrap:true,compact: true,width: "4rem",},
        { name: 'Tongue Lining', selector: row => row.TongueLining,wrap:true,compact: true,width: "4rem",},
        { name: 'Backtab', selector: row => row.Backtab,wrap:true,compact: true,width: "4rem",},
        { name: 'Backtab Logo', selector: row => row.BacktabLogo,wrap:true,compact: true,width: "4rem",},
        { name: 'Laces', selector: row => row.Laces,wrap:true,compact: true,width: "5rem",},
        { name: 'Midsole', selector: row => row.Midsole,wrap:true,compact: true,width: "5rem",},
        { name: 'Outsole', selector: row => row.Outsole,wrap:true,compact: true,width: "5rem",},
        { name: 'Shoelery', selector: row => row.Shoelery,wrap:true,compact: true,width: "5rem",},
        { name: 'TongueLabel', selector: row => row.TongueLabel,wrap:true,compact: true,width: "7rem",},
        { name: 'TongueText', selector: row => row.TongueText,wrap:true,compact: true,width: "7rem",},
        { name: 'Tracking Link', selector: row => row.linktracking,wrap:true,compact: true,width: "15rem",},        
    ];

    const tableHeaderstyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "#eee",
                border:"1"
            },
        },
    }

    const [filteredData, setFilteredData] = useState(StudentData);
    const navigate = useNavigate();
    useEffect(() => {

        const fetchData = async () => {
            try {

                // Make API request using fetch
                const response = await fetch('https://impactrm.onrender.com/api/v1/viewParticipant');
                //const response = await fetch('http://localhost:3000/api/v1/viewParticipant');

                setFetchData(false);
                // Check if the response status is ok (200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the response as JSON
                const result = await response.json();
                //console.log(result);
                setStudentData(result.data);
                //console.log("Hello=" , result.data)


                setFilteredData(result.data);
            } catch (error) {
                // Handle errors here
                setError(error.message);
            }
        };

        fetchData()
    }, []);

    const handleFilter = (event) => {
        const inputValue = event.target.value.toLowerCase();
        if (inputValue === '') {
            setFilteredData(StudentData);
        } else {
            const newData = StudentData.filter(row =>
                (row.State && row.Basti.toLowerCase().includes(inputValue))

            );
            setFilteredData(newData);
        }
    };

    return (
        <section className="mx-auto w-full max-w-8xl px-4 py-2">
            {FetchData ?

                <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                    <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-10 w-10"></div>
                </div>
                :
                <div>
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                        <div>
                            <p className="font-bold text-orange-900 tracking-tight text-1xl">Participant Data</p>
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-grey-200 md:rounded-lg">
                                    <div className="mt-1 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6 ">
                                        <div className="sm:col-span-1">

                                        </div>
                                    </div>

                                    <div style={{ width: '100%' }}>
                                        <DataTable
                                            columns={columns}
                                            data={filteredData}
                                            customStyles={tableHeaderstyle}
                                            pagination
                                            paginationPerPage={15}
                                            defaultSortFieldId={1}
                                            paginationRowsPerPageOptions={[15, 25, 50, 75, 100, 10000]}
                                            //paginationComponentOptions={paginationComponentOptions}
                                            fixedHeader
                                            responsive
                                            highlightOnHover
                                            striped
                                            className="custom-table "
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }



        </section>
    )
}

export default ParticipantList