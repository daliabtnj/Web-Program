// Javascript file managing the backend (server + database)

// Import necessary dependencies
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

// Creating connection to database using database credentials from .env
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Connecting to database
db.connect((err) => {
    if (err) throw err;
    console.log("Database service_hub_db connected");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});