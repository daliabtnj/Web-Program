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


dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Database connection (direct credentials for XAMPP)
const db = mysql.createConnection({
    host: "localhost",    // XAMPP uses 'localhost'
    user: "root",         // Default username in XAMPP
    password: "",         // Default password is empty for XAMPP
    database: "service_hub_db" // Your database name
});

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
app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signup.html"));
});

app.get("/signup-client", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signup-client.html"));
});

app.get("/signin-client", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signin-client.html"));
});


db.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database");
});

// POST route for customer signup
app.post('/signup-client', (req, res) => {
    const { name, email, phone, password } = req.body;

    // Input validation
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Check if email already exists
    const checkQuery = "SELECT * FROM Clients WHERE email = ?";
    db.query(checkQuery, [email], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error." });

        if (results.length > 0) {
            return res.status(409).json({ error: "Email already in use." });
        }

        // Insert the new client into the database
        const insertQuery = "INSERT INTO Clients (name, email, phone, password) VALUES (?, ?, ?, ?)";
        db.query(insertQuery, [name, email, phone, password], (err) => {
            if (err) return res.status(500).json({ error: "Failed to create user." });

            return res.status(201).json({ message: "Customer account created successfully." });
        });
    });
});

// POST route for client sign-in
app.post('/signin-client', (req, res) => {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Query to find the user by email
    const query = "SELECT * FROM Clients WHERE email = ?";
    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error." });

        // Check if a user with given email exists
        if (results.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        const user = results[0];

        // Validate password
        if (user.password !== password) {
            return res.status(401).json({ error: "Incorrect password." });
        }

        // Successful login
        return res.status(200).json({ message: "Sign-in successful.", user: { id: user.id, name: user.name, email: user.email } });
    });
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
