var cors = require('cors');
var express = require('express');
const fetch = require('node-fetch');
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const app = require('../app');
const db = require('../db');
const { Pool } = require('pg')
const axios = require('axios');
const { response } = require('express');
const ics = require('ics');
const { writeFileSync } = require('fs');
var nodemailer = require('nodemailer');
const ical = require('ical-generator');
const bcrypt = require('bcrypt'); //for hashing passwords
// const flash = require('express-flash');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../db/middleware/validInfo');
const authorization = require('../db/middleware/authorization');
const passport = require('passport');
const { json } = require('body-parser');
const sql = require('mssql');
var path = require('path');
const jwt = require('jsonwebtoken');
const jwrsecret = "MYNameisJashandeepSInghjoharmukts"
// import {v2 as cloudinary} from 'cloudinary'
const twilio = require("twilio");

const client = new twilio(process.env.accountSid, process.env.authToken);



// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

const config = ({
  // connectionString:process.env.DATABASE_URL,


  // server: 'nishkam84.database.windows.net',
  // database: 'Sikligar',
  // user: 'nishkam2025',
  // password: 'kQWvUC#wjjAJe3K',
  server: 'impactdb01.database.windows.net',
  database: 'Rubrik',
  user: 'impactxm',
  password: 'Y@uJk7%!MN7u3$n',
  options: {
    encrypt: true
  }
});
var router = express.Router();
router.all(cors());



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { page: 'Home', menuId: 'home' });
});

/* GET About page. */
router.get('/about', function (req, res, next) {
  // console.log("", req.query.name)
  console.log(req);
  res.render('about', { page: 'About Us', menuId: 'about', gud: req });
});

/* GET Contact page. */
router.get('/contact', function (req, res, next) {
  res.render('contact', { page: 'Contact Us', menuId: 'contact' });
});

/* GET Contact page. */
router.get('/privacy', function (req, res, next) {
  res.render('privacy', { page: 'Privacy', menuId: 'privacy' });
});

/* GET Time page. */
router.get('/next', function (req, res, next) {
  res.render('next', { page: 'Second ', menuId: 'second' });
});


/* GET Services page. */
router.get('/service', function (req, res, next) {
  res.render('service', { page: 'service ', menuId: 'second' });
});

router.get("/ics.js", (req, res) => {

  console.log("jashan");

});

router.get("/api/v1/testapi", async (req, res) => {

  const name = "Test API - Success";
  res.status(200).json({
    status: "succes",
    message: `Call From Test Api ${name}`
  })
});

router.get("/api/v1/sendWinnerSMS", async (req, res) => {
  const pin = req.query.pin;
  const phone = req.query.phone
  console.log("Sending SMS");
  const messageDetails = {
         body: "WINNER ALERT! READY TO WALK WITH CONFIDENCE?\n\nThank you for visiting Rubrik Booth #1948 at AWS re:Invent. You have been selected to receive a FREE pair of customized Nike Dunk shoes from Rubrik!\n\nPlease visit https://rubrik-omega.vercel.app/congratulation \nand enter the PIN code below to personalize your Nike Dunks and confirm your shipping details.\n\nPlease complete your order by December 12, 2024. Orders will be delivered in 2-4 weeks.\n\nYour personalized pin code is: " + pin +"\n\nYou are receiving this message because you visited Rubrik Booth #1948 at AWS re:Invent. Please do not reply to this message.",
   
         from: "+15714581785", // Your Twilio phone number
         to: "+1"+phone, // Recipient's phone number (replace with a variable if dynamic)
       };
       await client.messages.create(messageDetails);
       console.log("SMS sent successfully");
});


router.get("/api/v1/sendShippedSMS", async (req, res) => {
  const linktracking = req.query.linktracking;
  const phone = req.query.phone
  console.log("Sending SMS");
  const messageDetails = {
         body: "GET READY TO WALK WITH CONFIDENCE.\n\nYour FREE pair of customized Nike Dunks from Rubrik are on their way!\n\nPlease track your shipment here:\n\n" +  linktracking  + "\n\nThank you again for visiting Rubrik Booth#1948 at AWS re:Invent.\n\nYou are receiving this message because you visited Rubrik Booth #1948 at AWS re:Invent. Please do not reply to this message." ,

         from: "+15714581785", // Your Twilio phone number
         to: "+1"+phone, // Recipient's phone number (replace with a variable if dynamic)
       };
       await client.messages.create(messageDetails);
       console.log("SMS sent successfully");
});



router.post("/api/v1/addParticipantData", async (req, res) => {
  try {
    await sql.connect(config);

    const request = new sql.Request();
    const { data } = req.body;

    // SQL Query to insert data into the Participant_OUSHCP table
    const query =
      "INSERT INTO Participant (json) VALUES (@data)";

    // Add input parameter for the JSON data
    request.input("data", sql.NVarChar, JSON.stringify(data));

    // Execute the query
    await request.query(query);

    console.log("Participant data inserted successfully");

     // Send an SMS using Twilio
 //    const messageDetails = {
//      body: `New participant data added: ${JSON.stringify(data)}`,
     // body: `WINNER ALERT! READY TO WALK WITH CONFIDENCE\n\nThank you for visiting\n\nPIN: ${(data.name)}`,
      
//      body: `WINNER ALERT! READY TO WALK WITH CONFIDENCE?\n\nThank you for visiting Rubrik Booth #1948 at AWS re:Invent. You have been selected to receive a FREE pair of customized Nike Dunk shoes from Rubrik!\n\nPlease visit https://www.rubriknikegiveaway.com \nand enter the PIN code below to personalize your Nike Dunks and confirm your shipping details.\n\nPlease complete your order by December 12, 2024. Orders will be delivered in 2-4 weeks.\n\nYour personalized pin code is XXXXXX\n\nYou are receiving this message because you visited Rubrik Booth #1948 at AWS re:Invent. Please do not reply to this message.`,

//      from: "+15714581785", // Your Twilio phone number
//      to: "+14168803321", // Recipient's phone number (replace with a variable if dynamic)
//      to: "+1"+data.phone, // Recipient's phone number (replace with a variable if dynamic)

 //   };
  //  await client.messages.create(messageDetails);
    //console.log("SMS sent successfully");
    
    res.status(200).json({
      data: data,
      status: "success",
      message: "Data inserted successfully",
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(400).json({
      status: "failed",
      message: "Error inserting data",
      error: error.message,
    });
  } finally {
    sql.close();
  }
});




router.get('/api/v1/winnerSMS', async (req, res) => {
     // Send an SMS using Twilio
     const messageDetails = {
      //      body: `New participant data added: ${JSON.stringify(data)}`,
           // body: `WINNER ALERT! READY TO WALK WITH CONFIDENCE\n\nThank you for visiting\n\nPIN: ${(data.name)}`,
            
            body: `WINNER ALERT! READY TO WALK WITH CONFIDENCE?\n\nThank you for visiting Rubrik Booth #1948 at AWS re:Invent. You have been selected to receive a FREE pair of customized Nike Dunk shoes from Rubrik!\n\nPlease visit https://www.rubriknikegiveaway.com \nand enter the PIN code below to personalize your Nike Dunks and confirm your shipping details.\n\nPlease complete your order by December 12, 2024. Orders will be delivered in 2-4 weeks.\n\nYour personalized pin code is XXXXXX\n\nYou are receiving this message because you visited Rubrik Booth #1948 at AWS re:Invent. Please do not reply to this message.`,
      
            from: "+15714581785", // Your Twilio phone number
      //      to: "+14168803321", // Recipient's phone number (replace with a variable if dynamic)
            to: "+1"+data.phone, // Recipient's phone number (replace with a variable if dynamic)
      
          };
          await client.messages.create(messageDetails);
          console.log("SMS sent successfully");

});







router.get('/api/v1/viewParticipant', async (req, res) => {
  try {
    // Connect to the SQL Server database
    const pool = await sql.connect(config);
    const query = 'SELECT * FROM v_Participant order by id desc';
    const result = await pool.request().query(query);

    res.status(200).json({
      status: 'success',
      data: result.recordset,
    });

  console.log(result);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    });
  } finally {
    // Close the SQL connection pool
    // await sql.close();
  }
});

router.post("/api/v1/getParticipantDataByPin", async (req, res) => {
  try {
    await sql.connect(config);

    const request = new sql.Request();
    const { pin } = req.body; // Extract the PIN from the request body

    // SQL Query to retrieve the id and json fields from the Participant table where the PIN matches
    const query = "SELECT id, json FROM Participant WHERE pin = @pin";

    // Add input parameter for the PIN
    request.input("pin", sql.NVarChar, pin);

    // Execute the query
    const result = await request.query(query);

    // Check if a record was found
    if (result.recordset.length > 0) {
      const participantRecord = result.recordset[0]; // Get the first record
      const participantId = participantRecord.id; // Extract id
      const participantData = participantRecord.json; // Extract json field

      console.log(participantRecord, "Participant data retrieved successfully");

      res.status(200).json({
        status: "success",
        id: participantId, // Include id in the response
        data: JSON.parse(participantData), // Parse and include JSON data
        message: "Data retrieved successfully",
      });
    } else {
      console.error("No participant found with the given PIN");

      res.status(404).json({
        status: "failed",
        message: "No participant found with the given PIN",
      });
    }
  } catch (error) {
    console.error("Error retrieving data:", error);

    res.status(400).json({
      status: "failed",
      message: "Error retrieving data",
      error: error.message,
    });
  } finally {
    sql.close();
  }
});

// Update ParticipantData
router.put("/api/v1/updateParticipantData", async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    const request = new sql.Request();
    const { data, id } = req.body; // ID and data from the request body

    if (!id) {
      return res.status(400).json({
        status: "failed",
        message: "ID is required to update the participant data",
      });
    }

    // SQL Query to update data in the Participant table based on ID
    const query =
      "UPDATE Participant SET json = @data WHERE id = @id";

    // Add input parameters for the JSON data and ID
    request.input("data", sql.NVarChar, JSON.stringify(data));
    request.input("id", sql.Int, id);

    // Execute the query
    await request.query(query);

    console.log(`Participant data with ID ${id} updated successfully`);

    res.status(200).json({
      data: data,
      status: "success",
      message: `Data for participant with ID ${id} updated successfully`,
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(400).json({
      status: "failed",
      message: "Error updating data",
      error: error.message,
    });
  } finally {
    sql.close();
  }
});

// Update ParticipantData
router.put("/api/v1/size", async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    const { data, id } = req.body; // ID and data from the request body

    // Validation: Check if both id and data are provided
    if (!id || !data) {
      return res.status(400).json({
        status: "failed",
        message: "Both 'id' and 'data' are required to update the participant size.",
      });
    }

    // SQL Query to update the 'size' field in the Participant table based on ID
    const query = "UPDATE Participant SET size = @data WHERE id = @id";

    // Create a new request object
    const request = new sql.Request();
    request.input("data", sql.NVarChar, data);
    request.input("id", sql.Int, id);

    // Execute the query
    const result = await request.query(query);

    // Check if any rows were affected (i.e., if the ID exists in the table)
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        status: "failed",
        message: `No participant found with ID ${id}`,
      });
    }

    console.log(`Size data for participant ID ${id} updated successfully`);

    // Send a successful response
    res.status(200).json({
      status: "success",
      message: `Size for participant with ID ${id} updated successfully`,
      data: data, // Include the updated data in the response
    });
  } catch (error) {
    console.error("Error updating data:", error);

    // Send an error response
    res.status(500).json({
      status: "failed",
      message: "Error updating participant data",
      error: error.message,
    });
  } finally {
    sql.close(); // Ensure the SQL connection is always closed
  }
});

//add choices
router.put("/api/v1/colors", async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    const { data, id } = req.body; // ID and data from the request body

    // Validation: Check if both id and data are provided
    if (!id || !data) {
      return res.status(400).json({
        status: "failed",
        message: "Both 'id' and 'data' are required to update the participant size.",
      });
    }

    // SQL Query to update the 'size' field in the Participant table based on ID
    const query = "UPDATE Participant SET colors = @data WHERE id = @id";

    // Create a new request object
    const request = new sql.Request();
    request.input("data", sql.NVarChar, JSON.stringify(data));
    request.input("id", sql.Int, id);

    // Execute the query
    const result = await request.query(query);

    // Check if any rows were affected (i.e., if the ID exists in the table)
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        status: "failed",
        message: `No participant found with ID ${id}`,
      });
    }

    console.log(`Size data for participant ID ${id} updated successfully`);

    // Send a successful response
    res.status(200).json({
      status: "success",
      message: `Size for participant with ID ${id} updated successfully`,
      data: data, // Include the updated data in the response
    });
  } catch (error) {
    console.error("Error updating data:", error);

    // Send an error response
    res.status(500).json({
      status: "failed",
      message: "Error updating participant data",
      error: error.message,
    });
  } finally {
    sql.close(); // Ensure the SQL connection is always closed
  }
});
router.put("/api/v1/choices", async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    const { data, id } = req.body; // ID and data from the request body

    // Validation: Check if both id and data are provided
    if (!id || !data) {
      return res.status(400).json({
        status: "failed",
        message: "Both 'id' and 'data' are required to update the participant size.",
      });
    }

    // SQL Query to update the 'size' field in the Participant table based on ID
    const query = "UPDATE Participant SET choices = @data WHERE id = @id";

    // Create a new request object
    const request = new sql.Request();
    request.input("data", sql.NVarChar, JSON.stringify(data));
    request.input("id", sql.Int, id);

    // Execute the query
    const result = await request.query(query);

    // Check if any rows were affected (i.e., if the ID exists in the table)
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        status: "failed",
        message: `No participant found with ID ${id}`,
      });
    }

    console.log(`Size data for participant ID ${id} updated successfully`);

    // Send a successful response
    res.status(200).json({
      status: "success",
      message: `Size for participant with ID ${id} updated successfully`,
      data: data, // Include the updated data in the response
    });
  } catch (error) {
    console.error("Error updating data:", error);

    // Send an error response
    res.status(500).json({
      status: "failed",
      message: "Error updating participant data",
      error: error.message,
    });
  } finally {
    sql.close(); // Ensure the SQL connection is always closed
  }
});



module.exports = router;
