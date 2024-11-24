// Javascript file managing the backend (server + database)

// Import necessary dependencies
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');

// Import the modify-services router
// const modifyServicesRoutes = require('./Backend/modify-services');

dotenv.config();

const app = express();

app.use(cors());

const PORT = 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Creating connection to database using database credentials from .env
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Connecting to database
db.connect((err) => {
    if (err) throw err;
    console.log("Database service_hub_db connected");
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/signup-client', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup-client.html'));
})

app.post('/signup-client', async (req, res) => {
    console.log('Request body:', req.body);

    if (!req.body) {
        return res.status(400).json({ error: 'No data received' });
    }

    res.sendStatus(200);

    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ error: 'A field is missing' });
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO Clients (name, email, phone, password) VALUES (?, ?, ?, ?)';
        db.query(query, [name, email, phone, passwordHash], (err, result) => {
            if (err) {
                if (err.code == 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'Account under this email already exists' });
                }
                return res.status(500).json({ error: 'Database error' });
            }

            res.status(201).json({ message: 'Registered successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// app.use("/api", modifyServicesRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

