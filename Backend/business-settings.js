const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost", // XAMPP uses localhost
    user: "root",      // Default username in XAMPP is 'root'
    password: "",      // Default password is usually empty in XAMPP
    database: "service_hub_db", // Your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.log("Error connecting to the database.");
    } else {
        console.log("Connected to the database.");
    }
});

// Get business settings
router.get('/business-settings', (req, res) => {
    const query = "SELECT * FROM BusinessSettings LIMIT 1";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching business settings:", err);
            return res.status(500).send("Could not fetch business settings.");
        }
        res.json(results[0]);
    });
});

// Update business settings
router.post('/business-settings', (req, res) => {
    const { company_name, address, email, phone } = req.body;

    if (!company_name && !address && !email && !phone) {
        return res.status(400).send("At least one field (company_name, address, email, phone) is required.");
    }

    const fieldsToUpdate = [];
    const values = [];

    if (company_name) {
        fieldsToUpdate.push("company_name = ?");
        values.push(company_name);
    }
    if (address) {
        fieldsToUpdate.push("address = ?");
        values.push(address);
    }
    if (email) {
        fieldsToUpdate.push("email = ?");
        values.push(email);
    }
    if (phone) {
        fieldsToUpdate.push("phone = ?");
        values.push(phone);
    }

    const query = `UPDATE BusinessSettings SET ${fieldsToUpdate.join(", ")} WHERE id = 1`;

    console.log("Executing query:", query, "with values:", values);

    db.query(query, values, (err) => {
        if (err) {
            console.error("Database update error:", err);
            return res.status(500).send("Error updating business settings.");
        }
        res.status(200).send("Business settings updated successfully!");
    });
});

module.exports = router;
