const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const multer = require('multer'); // For handling file uploads
const path = require('path');

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

router.get('/business-settings', (req, res) => {
    const query = "SELECT * FROM BusinessSettings LIMIT 1";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching business settings:", err);
            return res.status(500).send("Could not fetch business settings.");
        }
        console.log("Fetched business settings:", results[0]); // Debugging log
        res.json(results[0]);
    });
});


// Update business settings
router.post('/business-settings', (req, res) => {
    const { company_name, address, email, phone, right_logo } = req.body;

    if (!company_name && !address && !email && !phone && !right_logo) {
        return res.status(400).send("At least one field (company_name, address, email, phone, logo) is required.");
    }

    const fieldsToUpdate = [];
    const values = [];

    if (company_name) {
        fieldsToUpdate.push("company_name = ?");
        values.push(company_name);
    }
    if (address) {
        it
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
    if (right_logo) {
        fieldsToUpdate.push("right_logo = ?");
        values.push(right_logo);
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

///////////////
// LOGO 
//////////////

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage });

// Handle logo upload
router.post('/upload-logo', upload.single('logo'), (req, res) => {
    const logoPath = `/uploads/${req.file.filename}`; // Path to the uploaded file

    // Update the database with the new logo URL
    const query = "UPDATE BusinessSettings SET logo = ? WHERE id = 1";
    db.query(query, [logoPath], (err) => {
        if (err) {
            console.error("Error updating logo in database:", err);
            return res.status(500).send("Failed to update logo.");
        }
        res.status(200).json({ logo_url: logoPath }); // Respond with the new logo URL
    });
});


// Function to trigger the file input for logo upload
function triggerLogoUpload() {
    const fileInput = document.getElementById('logo-upload');
    fileInput.click(); // Open the file picker
}

// Function to save the uploaded logo
function saveLogo() {
    const fileInput = document.getElementById('logo-upload');
    const file = fileInput.files[0]; // Get the selected file

    if (!file) {
        alert("Please select a file to upload.");
        return;
    }

    // Use FormData to send the file
    const formData = new FormData();
    formData.append('logo', file);

    // Send the file to the backend
    fetch('/api/upload-logo', {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to upload logo.");
            }
            return response.json();
        })
        .then(data => {
            alert("Logo uploaded successfully!");
            // Update the displayed logo URL
            const logoField = document.querySelector('[data-field="logo"]');
            logoField.textContent = data.logo_url; // Assume the backend returns the new logo URL
            fileInput.value = ""; // Clear the file input
        })
        .catch(error => {
            console.error("Error uploading logo:", error);
            alert("Error uploading logo.");
        });
}


router.post('/remove-logo', (req, res) => {
    const query = "UPDATE BusinessSettings SET logo = NULL WHERE id = 1";

    db.query(query, (err) => {
        if (err) {
            console.error("Error removing logo from database:", err);
            return res.status(500).send("Failed to remove logo.");
        }
        res.status(200).json({ message: "Logo removed successfully!" });
    });
});



module.exports = router;
