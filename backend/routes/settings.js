const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

// Endpoint to update a setting
router.put('/update', settingsController.updateSetting);

// Endpoint to fetch a setting
router.get('/:key_name', settingsController.getSetting);

module.exports = router;

router.post('/update-company-name', (req, res) => {
    const { companyName } = req.body;
    if (companyName) {
        res.status(200).send({ message: 'Company name updated successfully' });
    } else {
        res.status(400).send({ error: 'Invalid data' });
    }
});
