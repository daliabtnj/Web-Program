// to manage services in the admin side for BACKEND purposes
// url : http://localhost:3000
// post: for creating, updating, or sending data to the server
// get: for retrieving information without affecting server data


// Import required modules
const express = require("express"); // to deal with http methods 
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
//http://localhost:3000/addhardcodedservices

app.get("/addhardcodedservices", (req, res) => {
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
// Define a route for adding a new service (get)
// you have to define parameters
//http://localhost:3000/addservice?service_name=New%20Service&description=Private+lessons+for+kids&default_price=120

app.get("/addservice", (req, res) => {
    // Extract service details from query parameters
    const service = {
        service_name: req.query.service_name,
        description: req.query.description,
        default_price: parseFloat(req.query.default_price),
    };

    // Validate required parameters
    if (!service.service_name || !service.description || isNaN(service.default_price)) {
        return res.status(400).send("Missing or invalid parameters!");
    }

    // SQL query to insert the service into the database
    const sql = "INSERT INTO Services SET ?";

    // Execute the query
    db.query(sql, service, (err, result) => {
        if (err) {
            console.error("Error adding service:", err);
            res.send("Could not insert new service!");
        } else {
            // Respond with the added service details
            res.send(`
                <html>
                    <body>
                        <h1>Service added successfully!</h1>
                        <p><strong>Service Name:</strong> ${service.service_name}</p>
                        <p><strong>Description:</strong> ${service.description}</p>
                        <p><strong>Default Price:</strong> $${service.default_price}</p>
                    </body>
                </html>
            `);
        }
    });
});





/*----------------------------------------------------------------------------------------------------------------------*/
// Get all services (JSON) to display
// http://localhost:3000/services
// THIS works 

app.get("/services", (req, res) => {
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
// http://localhost:3000/update-service/1?service_name=New%20Name&description=Updated%20Description&default_price=150

app.get("/update-service/:id", (req, res) => {
    const { service_name, description, default_price } = req.query; // Extract query parameters
    const { id } = req.params;

    if (!service_name || !description || !default_price) {
        return res.status(400).send("All fields (service_name, description, and default_price) are required.");
    }

    const sql = "UPDATE Services SET service_name = ?, description = ?, default_price = ? WHERE id = ?";
    db.query(sql, [service_name, description, parseFloat(default_price), id], (err, result) => {
        if (err) {
            console.error("Could not update the service:", err);
            res.status(500).send(`Could not update the service with ID = ${id}`);
        } else if (result.affectedRows === 0) {
            res.status(404).send(`No service found with ID = ${id}`);
        } else {
            res.send(`
                <html>
                    <body>
                        <h1>Service Updated Successfully!</h1>
                        <p><strong>Service ID:</strong> ${id}</p>
                        <p><strong>Service Name:</strong> ${service_name}</p>
                        <p><strong>Description:</strong> ${description}</p>
                        <p><strong>Default Price:</strong> $${default_price}</p>
                    </body>
                </html>
            `);
        }
    });
});



/*----------------------------------------------------------------------------------------------------------------------*/
// Delete a service by ID
//http://localhost:3000/delete-service/1

app.get("/delete-service/:id", (req, res) => {
    const { id } = req.params;

    // First, fetch the service details
    const fetchServiceSql = "SELECT * FROM services WHERE id = ?";
    db.query(fetchServiceSql, [id], (err, serviceResult) => {
        if (err || serviceResult.length === 0) {
            console.error(`Could not find the service with ID = ${id}`, err);
            return res.send(`Could not find the service with ID = ${id}`);
        }

        const service = serviceResult[0]; // Extract service details

        // Now, delete the service
        const deleteServiceSql = "DELETE FROM services WHERE id = ?";
        db.query(deleteServiceSql, [id], (deleteErr, deleteResult) => {
            if (deleteErr) {
                console.error(`Could not delete the service with ID = ${id}`, deleteErr);
                return res.send(`Could not delete the service with ID = ${id}`);
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


/*----------------------------------------------------------------------------------------------------------------------*/
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
