const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectSpotify = require('./config/spotify')

// Loading config file
dotenv.config({ path: "./config/config.env" });

// Initializing application
const app = express();

const PORT = process.env.PORT || 5000;


// Connecting spotify application
connectSpotify()


// Starting Server
app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
    )
);
