// manage-request.js 
// Manage clien requests
// url : http://localhost:3000

const express = require('express');
const cors = require('cors');
const router = express.Router();
const mysql = require('mysql2');

// Setup CORS
router.use(cors());

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

router.get('/service-requests', (req, res) => {
    const query = "SELECT * FROM ServiceRequests";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching service requests:", err);
            return res.status(500).send("Could not fetch service requests.");
        }
        res.json(results);
    });
});


// Delete request due to cancelation (By client and admins)
router.get("/delete-request/:id", (req, res) => {
    const { id } = req.params; // Extract service request ID from URL

    // Fetch service request details
    const fetchRequestSql = "SELECT * FROM ServiceRequests WHERE id = ?";
    db.query(fetchRequestSql, [id], (err, requestResult) => {
        if (err) {
            console.error(`Error fetching the service request with ID = ${id}`, err);
            return res.status(500).send(`Error fetching the service request with ID = ${id}`);
        }

        if (requestResult.length === 0) {
            return res.status(404).send(`No service request found with ID = ${id}`);
        }

        const request = requestResult[0]; // Extract service request details

        // Delete the service request
        const deleteRequestSql = "DELETE FROM ServiceRequests WHERE id = ?";
        db.query(deleteRequestSql, [id], (deleteErr, deleteResult) => {
            if (deleteErr) {
                console.error(`Error deleting the service request with ID = ${id}`, deleteErr);
                return res.status(500).send(`Could not delete the service request with ID = ${id}`);
            }

            // Confirmation message
            res.send(`
                <html>
                    <body>
                        <h1>Service Request Deleted Successfully!</h1>
                    </body>
                </html>
            `);
        });
    });
});



// Change request status (only for admin)
router.put('/api/service-requests/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["booked", "pending", "completed", "cancelled"].includes(status)) {
        return res.status(400).send("Invalid status value.");
    }

    const query = "UPDATE ServiceRequests SET status = ? WHERE id = ?";
    db.query(query, [status, id], (err, result) => {
        if (err) {
            console.error(`Error updating status for request ${id}:`, err);
            return res.status(500).send("Could not update status.");
        }

        if (result.affectedRows === 0) {
            console.warn(`Service request ${id} not found.`);
            return res.status(404).send("Service request not found.");
        }

        console.log(`Status of request ${id} updated to ${status}`);
        res.send("Status updated successfully.");
    });
});


module.exports = router;
