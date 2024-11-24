// Javascript file managing the backend (server + database)
<<<<<<< HEAD

// Import necessary dependencies
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');

// Import the modify-services router
// const modifyServicesRoutes = require('./Backend/modify-services');
=======
// use http://localhost:3000/index.html 

// Main Backend File: server.js



// Import necessary dependencies
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");

>>>>>>> 05332eba9344d9bce9f3b588d5589273094dd087

dotenv.config();

const app = express();
<<<<<<< HEAD

app.use(cors());

const PORT = 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Creating connection to database using database credentials from .env
=======
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Database connection (optional: used for other routes in server.js)
>>>>>>> 05332eba9344d9bce9f3b588d5589273094dd087
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
<<<<<<< HEAD
    database: process.env.DB_NAME
});

// Connecting to database
=======
    database: process.env.DB_NAME,
});

>>>>>>> 05332eba9344d9bce9f3b588d5589273094dd087
db.connect((err) => {
    if (err) throw err;
    console.log("Database service_hub_db connected");
});

<<<<<<< HEAD


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/signup-client', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup-client.html'));
})

app.post('/signup-client', async (req, res) => {
    console.log('Request body:', req.body);

    if (!req.body) {
        return res.status(400).json({ error: 'No data received' });
    }

    res.sendStatus(200);

    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ error: 'A field is missing' });
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO Clients (name, email, phone, password) VALUES (?, ?, ?, ?)';
        db.query(query, [name, email, phone, passwordHash], (err, result) => {
            if (err) {
                if (err.code == 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'Account under this email already exists' });
                }
                return res.status(500).json({ error: 'Database error' });
            }

            res.status(201).json({ message: 'Registered successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// app.use("/api", modifyServicesRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

=======
// Serve the frontend (public directory)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
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
>>>>>>> 05332eba9344d9bce9f3b588d5589273094dd087
