// Javascript file managing the backend (server + database)
// use http://localhost:3000/index.html 

// Main Backend File: server.js



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

// Database connection (optional: used for other routes in server.js)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// db.connect((err) => {
//     if (err) throw err;
//     console.log("Database service_hub_db connected");
// });

// Serve the frontend (public directory)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/signup-client", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signup-client.html"));
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



/*----------------------------------------------------------------------------------------------------------------------*/
// what we need to import for backend


// Import the modify-services router
const modifyServicesRoutes = require('./Backend/modify-services');
// Use the modify-services routes with a prefix (/api)
app.use("/api", modifyServicesRoutes);

// Import the business settings router
const businessSettingsRoutes = require('./Backend/business-settings');
// Use the business settings routes
app.use('/api', businessSettingsRoutes);


// Import the customer account router
const clientSettingsRoutes = require('./Backend/edit-customer-account');
// Use the customer account routes
app.use('/api', clientSettingsRoutes);
