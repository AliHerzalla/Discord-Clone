require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const connectDB = require('./config/database');
const app = express();

const PORT = 3000 || process.env.PORT;




connectDB();
// server connection
app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});