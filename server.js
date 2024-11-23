// Javascript file managing the backend (server + database)
// use http://localhost:3000/index.html 

// Main Backend File: server.js


// Load environment variables
require('dotenv').config();

// Import necessary dependencies
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");

// Import the modify-services router
const modifyServicesRoutes = require('./Backend/modify-services');


dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Database connection (optional: used for other routes in server.js)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to the database.");

    // Explicitly select the database
    db.query("USE service_hub_db", (err) => {
        if (err) {
            console.error("Error selecting database:", err);
        } else {
            console.log("Database selected successfully.");
        }
    });
});

// Serve the frontend (public directory)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Use the modify-services routes with a prefix (/api)
app.use("/api", modifyServicesRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// d - buisness settings
// Import the business settings router
const businessSettingsRoutes = require('./Backend/business-settings');

// Use the business settings routes
app.use('/api', businessSettingsRoutes);
