//import dotenv from 'dotenv';
const dotenv = require("dotenv");
dotenv.config();


  module.exports = {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://salman:eDC6I6yHY6YUEehu@alphadnd.itop5.mongodb.net/<dbname>?retryWrites=true&w=majority'  //mongodb://localhost/amazona
  
  }
  