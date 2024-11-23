const settingsModel = require('../models/settingsModel');

exports.getSetting = async (req, res) => {
    const { key_name } = req.params;
    try {
      const setting = await settingsModel.getSettingByKey(key_name);
      if (!setting) {
        return res.status(404).json({ message: 'Setting not found' });
      }
      res.status(200).json({ value: setting.value }); // Only send the value field
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Update a specific setting
exports.updateSetting = async (req, res) => {
  const { key_name, value } = req.body;
  if (!key_name || !value) {
    return res.status(400).json({ message: 'Missing key_name or value' });
  }

  try {
    const result = await settingsModel.updateSetting(key_name, value);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    res.status(200).json({ message: 'Setting updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

app.post('/update-company-name', (req, res) => {
    const { companyName } = req.body;
    if (companyName) {
        res.status(200).send({ message: 'Company name updated successfully' });
    } else {
        res.status(400).send({ error: 'Invalid data' });
    }
});