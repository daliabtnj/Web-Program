// Javascript file managing the backend (server + database)
// use http://localhost:3000/index.html 

// Main Backend File: server.js


// Load environment variables
require('dotenv').config();
// Load environment variables
require('dotenv').config();

// Import necessary dependencies
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");


dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Database connection (direct credentials for XAMPP)
// Database connection (direct credentials for XAMPP)
const db = mysql.createConnection({
    host: "localhost",    // XAMPP uses 'localhost'
    user: "root",         // Default username in XAMPP
    password: "",         // Default password is empty for XAMPP
    database: "service_hub_db" // Your database name
    host: "localhost",    // XAMPP uses 'localhost'
    user: "root",         // Default username in XAMPP
    password: "",         // Default password is empty for XAMPP
    database: "service_hub_db" // Your database name
});

// Connect to the database
// Connect to the database
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


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// file upload
const fs = require('fs');
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));




/*----------------------------------------------------------------------------------------------------------------------*/
// what we need to import for backend


// Import the modify-services router
const modifyServicesRoutes = require('./Backend/modify-services');
// Use the modify-services routes with a prefix (/api)
app.use("/api", modifyServicesRoutes);

// Import the business settings router
const businessSettingsRoutes = require('./Backend/business-settings');
// Use the business settings routes
app.use("/api", businessSettingsRoutes);

// Import the customer account router
const clientSettingsRoutes = require('./Backend/edit-customer-account');
// Use the customer account routes
app.use("/api", clientSettingsRoutes);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Import the manage-requests router
const manageRequestsRoutes = require('./Backend/manage-requests');

// Use the manage-requests routes with a prefix (e.g., /api)
app.use("/api", manageRequestsRoutes);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
