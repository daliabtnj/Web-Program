const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const settingsRoutes = require('./routes/settings');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/settings', settingsRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});






