// to manage services in the admin side for BACKEND purposes

// Import required modules
const express = require("express");
const mysql = require("mysql");

// Initialize the Express application
const app = express();

// Middleware for parsing URL-encoded and JSON data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// MySQL configuration
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "admin-manage-services", // Updated to the correct database
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
// Add a hardcoded service
app.get("/addhardcodedservice", (req, res) => {
    const service = {
        service_name: "First Service - Tutoringe",
        description: "Our first service is tailored for kids from 6 to 18 years old. It supports students who need extra help with their studies. We offer private tutoring services. Prices vary by age:.",
        default_price: 100,
    };

    const sql = "INSERT INTO services SET ?";
    db.query(sql, service, (err, result) => {
        if (err) {
            console.error("Error adding service:", err);
            res.send("Error adding service.");
        } else {
            res.send("Hardcoded service added successfully.");
        }
    });
});

/*----------------------------------------------------------------------------------------------------------------------*/
// Add a new service (POST)
app.post("/add-service", (req, res) => {
    const { service_name, description, default_price } = req.body;

    const sql = "INSERT INTO services (service_name, description, default_price) VALUES (?, ?, ?)";
    db.query(sql, [service_name, description, default_price], (err, result) => {
        if (err) {
            console.error("Error adding service:", err);
            res.send("Error adding service.");
        } else {
            res.send("Service added successfully.");
        }
    });
});

/*----------------------------------------------------------------------------------------------------------------------*/
// Get all services (JSON)
app.get("/services", (req, res) => {
    const sql = "SELECT * FROM services";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching services:", err); // Log error details
            res.send("Could not fetch services.");
        } else {
            res.json(result); // Return data as JSON
        }
    });
});


/*----------------------------------------------------------------------------------------------------------------------*/
// Update a service by ID
app.get("/update-service/:id", (req, res) => {
    const newDescription = "Updated service description";
    const sql = `UPDATE services SET description = '${newDescription}' WHERE id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Could not update the service:", err);
            res.send(`Could not update the service with ID = ${req.params.id}`);
        } else {
            res.send("Service updated successfully.");
        }
    });
});

/*----------------------------------------------------------------------------------------------------------------------*/
// Delete a service by ID
app.get("/delete-service/:id", (req, res) => {
    const sql = `DELETE FROM services WHERE id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error(`Could not delete the service with ID = ${req.params.id}`, err);
            res.send(`Could not delete the service with ID = ${req.params.id}`);
        } else {
            res.send("Service deleted successfully.");
        }
    });
});

/*----------------------------------------------------------------------------------------------------------------------*/
// Get all services (formatted HTML)
app.get("/getservicesformatted", (req, res) => {
    const sql = "SELECT * FROM services";

    db.query(sql, (err, result) => {
        if (err) {
            res.send("Could not fetch services.");
        } else {
            let content = `
            <html>
            <head>
                <title>List of Services</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    h1 { color: #333; }
                    .service { margin-bottom: 20px; }
                </style>
            </head>
            <body>
                <h1>Available Services</h1>
            `;

            result.forEach((service) => {
                content += `
                <div class="service">
                    <h2>${service.service_name}</h2>
                    <p>${service.description}</p>
                    <p>Price: $${service.default_price}</p>
                </div>
                <hr>
                `;
            });

            content += "</body></html>";
            res.send(content);
        }
    });
});

/*----------------------------------------------------------------------------------------------------------------------*/
// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


