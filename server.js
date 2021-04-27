const express=require("express");
const bodyparser=require("body-parser");
const cors=require("cors");
const dotenv=require("dotenv");

// Loading config file
dotenv.config({ path: "./config/config.env" });

// Initializing application
const app=express();

const PORT=process.env.PORT||5000;

// Starting Server
app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
    )
);
