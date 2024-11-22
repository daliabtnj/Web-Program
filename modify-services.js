// to manage services in the admin side for BACKEND purposes
// url : http://localhost:3000
// post: for creating, updating, or sending data to the server
// get: for retrieving information without affecting server data


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
// Add a hardcoded service
app.get("/addhardcodedservice", (req, res) => {
    const service = {
        service_name: "First Service - Tutoring",
        description: "Our first service is tailored for kids from 6 to 18 years old. It supports students who need extra help with their studies. We offer private tutoring services. Prices vary by age:.",
        default_price: 100,
    };

    const sql = "INSERT INTO Services SET ?";
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
