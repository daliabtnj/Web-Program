const mysql = require('mysql2');

// Configure your database connection
const db = mysql.createConnection({
  host: 'localhost',   // Adjust based on your setup
  user: 'root',        // Replace with your DB username
  password: '',        // Replace with your DB password
  database: 'service_website'
});

// Establish connection
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
  console.log('Connected to the database.');
});

module.exports = db;

