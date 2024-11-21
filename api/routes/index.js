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
  database: 'GSK',
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

//add ParticipantData
router.post("/api/v1/addParticipantData", async (req, res) => {
  try {
    await sql.connect(config);

    const request = new sql.Request();
    const { data } = req.body;

    // SQL Query to insert data into the Participant_OUSHCP table
    const query =
      "INSERT INTO Participant_OUSHCP (json) VALUES (@data)";

    // Add input parameter for the JSON data
    request.input("data", sql.NVarChar, JSON.stringify(data));

    // Execute the query
    await request.query(query);

    console.log("Participant data inserted successfully");

    res.status(200).json({
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

module.exports = router;
