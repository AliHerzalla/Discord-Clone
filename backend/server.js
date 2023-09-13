require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const PORT = 3000 || process.env.PORT;

// DB connection
mongoose.connect(process.env.DB_CONNECTION_STRING_URL).then((result) => {
    console.log("DB connected successfully");
}).catch((error) => {
    console.log(error);
});

// server connection
app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});