const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Get business settings
    router.get('/business-settings', (req, res) => {
        const query = "SELECT * FROM BusinessSettings LIMIT 1";
        db.query(query, (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(200).json(results[0]); // Send the first (and only) record
        });
    });

    // Update business settings
    router.post('/business-settings', (req, res) => {
        const { company_name, logo, address, email, phone } = req.body;
        const query = `
            UPDATE BusinessSettings 
            SET company_name = ?, logo = ?, address = ?, email = ?, phone = ? 
            WHERE id = 1
        `;
        db.query(query, [company_name, logo, address, email, phone], (err) => {
            if (err) return res.status(500).send(err);
            res.status(200).send("Business settings updated successfully!");
        });
    });

    return router;
};

