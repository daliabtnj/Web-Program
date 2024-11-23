// to manage services in the admin side for BACKEND purposes
// url : http://localhost:3000
// post: for creating, updating, or sending data to the server
// get: for retrieving information without affecting server data

//GET /api/services: Fetch all services
//POST /api/addservice: Add a new service
//PUT /api/update-service/:id: Update a service
//DELETE /api/delete-service/:id: Delete a service


const express = require("express"); // to deal with http methods
const mysql = require("mysql2");
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

// Add multiple hardcoded services
//http://localhost:3000/api/addhardcodedservices

router.get("/addhardcodedservices", (req, res) => {
    const services = [
        {
            service_name: "First Service - Tutoring",
            description: "Our first service is tailored for kids from 6 to 18 years old. It supports students who need extra help with their studies. We offer private tutoring services with flexible pricing based on age.",
            default_price: 40,
        },
        {
            service_name: "Second Service - Cleaning",
            description: "Our cleaning service is ideal for clients seeking professional, thorough, and reliable cleaning solutions. This premium service ensures a spotless environment.",
            default_price: 200,
        },
        {
            service_name: "Third Service - Pet Grooming",
            description: "Our pet grooming service ensures your furry friends look and feel their best. We offer comprehensive grooming services including bathing, haircuts, and nail trimming.",
            default_price: 50,
        },
        {
            service_name: "Other Service - Private Trainer",
            description: "Our private training service offers personalized fitness coaching tailored to your individual goals. Whether you’re looking to improve your strength, endurance, or overall health, our trainers are here to guide you.",
            default_price: 35,
        },
        {
            service_name: "Last Service - Stylist",
            description: "Our stylist service offers expert advice and assistance in makeup, hair, and clothing selection for special events. Whether you’re preparing for a wedding, party, or business event, our professional stylists will help you look your best.",
            default_price: 175,
        },
    ];

    let addedServices = [];

    const sqlCheck = "SELECT * FROM Services WHERE service_name = ?";
    const sqlInsert = "INSERT INTO Services SET ?";

    services.forEach((service, index) => {
        db.query(sqlCheck, [service.service_name], (err, result) => {
            if (err) {
                console.error("Error checking service:", err);
                return;
            }

            if (result.length === 0) {
                // If service does not exist, insert it
                db.query(sqlInsert, service, (err, insertResult) => {
                    if (err) {
                        console.error("Error adding service:", err);
                        return;
                    }
                    addedServices.push(service);

                    // Display confirmation after all services are processed
                    if (addedServices.length === services.length || index === services.length - 1) {
                        res.send(`
                            <html>
                                <body>
                                    <h1>Hardcoded Services Added Successfully!</h1>
                                    <ul>
                                        ${addedServices
                                            .map(
                                                (s) => `
                                                <li>
                                                    <strong>${s.service_name}</strong>: ${s.description} (Price: $${s.default_price})
                                                </li>`
                                            )
                                            .join("")}
                                    </ul>
                                </body>
                            </html>
                        `);
                    }
                });
            }
        });
    });
});

/*----------------------------------------------------------------------------------------------------------------------*/
// Define a route for adding a new service (GET)
// http://localhost:3000/api/addservice?service_name=New%20Service&description=Private+lessons+for+kids&default_price=120

router.post("/addservice", (req, res) => {
    const service = {
        service_name: req.body.service_name,
        description: req.body.description,
        default_price: parseFloat(req.body.default_price),
    };

    if (!service.service_name || !service.description || isNaN(service.default_price)) {
        return res.status(400).send("Missing or invalid parameters!");
    }

    const sql = "INSERT INTO Services SET ?";
    db.query(sql, service, (err, result) => {
        if (err) {
            console.error("Error adding service:", err);
            return res.status(500).send("Could not insert new service!");
        }

        // Respond with the inserted service details
        const newServiceId = result.insertId;
        res.json({
            id: newServiceId,
            service_name: service.service_name,
            description: service.description,
            default_price: service.default_price,
        });
    });
});



/*----------------------------------------------------------------------------------------------------------------------*/
// Get all services (JSON)
// http://localhost:3000/api/services

router.get("/services", (req, res) => {
    const sql = "SELECT * FROM Services";
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

// Update a service by ID using parameters
// HTTP Method: PUT
// URL: http://localhost:3000/api/update-service/1

router.put("/update-service/:id", (req, res) => {
    const { service_name, description, default_price } = req.body; // Extract data from request body
    const { id } = req.params; // Extract the service ID from the URL

    // Validate required parameters
    if (!service_name || !description || !default_price) {
        return res.status(400).send("All fields (service_name, description, and default_price) are required.");
    }

    const sql = "UPDATE Services SET service_name = ?, description = ?, default_price = ? WHERE id = ?";

    // Execute the SQL query
    db.query(sql, [service_name, description, parseFloat(default_price), id], (err, result) => {
        if (err) {
            console.error("Could not update the service:", err);
            return res.status(500).send(`Could not update the service with ID = ${id}`);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send(`No service found with ID = ${id}`);
        }
        res.status(200).json({
            message: "Service updated successfully",
            service: {
                id,
                service_name,
                description,
                default_price,
            },
        });
    });
});




/*----------------------------------------------------------------------------------------------------------------------*/
// Delete a service by ID
// http://localhost:3000/api/delete-service/1

router.get("/delete-service/:id", (req, res) => {
    const { id } = req.params; // Extract service ID from URL

    // First, fetch the service details
    const fetchServiceSql = "SELECT * FROM services WHERE id = ?";
    db.query(fetchServiceSql, [id], (err, serviceResult) => {
        if (err) {
            console.error(`Error fetching the service with ID = ${id}`, err);
            return res.status(500).send(`Error fetching the service with ID = ${id}`);
        }

        if (serviceResult.length === 0) {
            return res.status(404).send(`No service found with ID = ${id}`);
        }

        const service = serviceResult[0]; // Extract service details

        // Now, delete the service
        const deleteServiceSql = "DELETE FROM services WHERE id = ?";
        db.query(deleteServiceSql, [id], (deleteErr, deleteResult) => {
            if (deleteErr) {
                console.error(`Error deleting the service with ID = ${id}`, deleteErr);
                return res.status(500).send(`Could not delete the service with ID = ${id}`);
            }

            // Respond with confirmation message including service details
            res.send(`
                <html>
                    <body>
                        <h1>Service Deleted Successfully!</h1>
                        <p><strong>Service Name:</strong> ${service.service_name}</p>
                        <p><strong>Description:</strong> ${service.description}</p>
                        <p><strong>Price:</strong> $${service.default_price}</p>
                    </body>
                </html>
            `);
        });
    });
});











// Export the Router
module.exports = router;