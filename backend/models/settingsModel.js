const db = require('../db');

// Fetch a setting by key_name
exports.getSetting = (req, res) => {
    const { key_name } = req.params;

    db.query('SELECT value FROM settings WHERE key_name = ?', [key_name], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ message: 'Server error' });
            return;
        }

        if (results.length > 0) {
            res.json({ value: results[0].value });
        } else {
            res.status(404).json({ message: 'Setting not found' });
        }
    });
};

// Update a setting
exports.updateSetting = (req, res) => {
    const { key_name, value } = req.body;

    if (!key_name || !value) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    db.query('UPDATE settings SET value = ? WHERE key_name = ?', [value, key_name], (err) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ message: 'Server error' });
            return;
        }

        res.json({ message: 'Setting updated successfully' });
    });
};
