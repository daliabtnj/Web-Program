// to manage client info in the client side for BACKEND purposes
// url : http://localhost:3000

const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const router = express.Router();

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
        console.log("Error connecting to the database:", err.message);
    } else {
        console.log("Connected to the database.");
    }
});

/*----------------------------------------------------------------------------------------------------------------------*/

// Get client settings
router.get("/client-settings/:id", (req, res) => {
    const query = "SELECT * FROM Clients WHERE id = ?";
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).send(err.message);
        if (!results.length) return res.status(404).send("Client not found.");
        res.json(results[0]);
    });
});


/*----------------------------------------------------------------------------------------------------------------------*/

// Update client settings
router.put("/client-settings/:id", (req, res) => {
    const { name, email, phone, password } = req.body;
    const fields = [];
    const values = [];

    if (name) { fields.push("name = ?"); values.push(name); }
    if (email) { fields.push("email = ?"); values.push(email); }
    if (phone) { fields.push("phone = ?"); values.push(phone); }
    if (password) { fields.push("password = ?"); values.push(password); }

    if (!fields.length) return res.status(400).send("No fields to update.");

    values.push(req.params.id);
    const query = `UPDATE Clients SET ${fields.join(", ")} WHERE id = ?`;

    db.query(query, values, (err, result) => {
        if (err) return res.status(500).send(err.message);
        if (!result.affectedRows) return res.status(404).send("Client not found.");

        // Fetch updated client data and display
        const selectQuery = "SELECT * FROM Clients WHERE id = ?";
        db.query(selectQuery, [req.params.id], (err, results) => {
            if (err) return res.status(500).send(err.message);
            res.json(results[0]);
        });
    });
});



/*----------------------------------------------------------------------------------------------------------------------*/

module.exports = router;
