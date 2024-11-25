// manage-bills.js

const express = require('express');
const cors = require('cors');
const router = express.Router();
const mysql = require('mysql2');

router.use(cors());

// Database connection setup
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "service_hub_db",
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.log("Error connecting to the database.");
    } else {
        console.log("Connected to the database.");
    }
});

// Fetch all bills
router.get('/service-bills', (req, res) => {
    const query = "SELECT * FROM Bills";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching bills:", err);
            return res.status(500).send("Could not fetch bills.");
        }
        res.json(results);
    });
});

// Update request status
router.put('/service-bills/:id/STATUS', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Log the status to see what is being received
    console.log('Received STATUS:', status); 

    // Validate the status input 
    const validStatuses = ["unpaid", "paid"];
    if (!validStatuses.includes(status)) {
        console.log('Invalid status:', status); 
        return res.status(400).send("Invalid status.");
    }

    const query = `UPDATE Bills SET STATUS = ? WHERE id = ?`;

    try {
        await db.promise().query(query, [status, id]);
        res.status(200).send("Status updated successfully!");
    } catch (err) {
        console.error("Error updating status:", err); 
        res.status(500).send("Failed to update status.");
    }
});



// Export the router
module.exports = router;
