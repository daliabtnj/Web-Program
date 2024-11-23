// to manage client info in the client side for BACKEND purposes
// url : http://localhost:3000


const express = require("express"); // to deal with http methods
const mysql = require("mysql");
const path = require("path");

// Create an Express Router instance
const router = express.Router();

// Middleware for parsing URL-encoded and JSON data
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// MySQL configuration
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "service_hub_db", // Updated to the correct database
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.log("Error connecting to the database.");
    } else {
        console.log("Connected to the database.");
    }
});



/*----------------------------------------------------------------------------------------------------------------------*/

// Get client settings
router.get('/client-settings/:id', (req, res) => {
    const clientId = req.params.id; // Get client ID from request parameters
    const query = "SELECT * FROM Clients WHERE id = ?";

    db.query(query, [clientId], (err, results) => {
        if (err) {
            console.error("Error fetching client settings:", err);
            return res.status(500).send("Could not fetch client settings.");
        }

        if (results.length === 0) {
            return res.status(404).send("Client not found.");
        }

        res.json(results[0]); // Send client data
    });
});

/*----------------------------------------------------------------------------------------------------------------------*/

// Update client settings
router.post('/client-settings/:id', (req, res) => {
    const clientId = req.params.id; // Get client ID from request parameters
    const { name, email, phone, password } = req.body;

    if (!name && !email && !phone && !password) {
        return res.status(400).send("At least one field (name, email, phone, password) is required.");
    }

    const fieldsToUpdate = [];
    const values = [];

    if (name) {
        fieldsToUpdate.push("name = ?");
        values.push(name);
    }
    if (email) {
        fieldsToUpdate.push("email = ?");
        values.push(email);
    }
    if (phone) {
        fieldsToUpdate.push("phone = ?");
        values.push(phone);
    }
    if (password) {
        fieldsToUpdate.push("password = ?");
        values.push(password);
    }

    values.push(clientId); // Add client ID to the values array for the WHERE clause

    const query = `UPDATE Clients SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;

    console.log("Executing query:", query, "with values:", values);

    db.query(query, values, (err) => {
        if (err) {
            console.error("Database update error:", err);
            return res.status(500).send("Error updating client settings.");
        }
        res.status(200).send("Client settings updated successfully!");
    });
});


/*----------------------------------------------------------------------------------------------------------------------*/

// Export the Router
module.exports = router;