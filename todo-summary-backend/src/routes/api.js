const express = require('express');
const router = express.Router();

// Sample GET route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

// Example additional route
router.get('/summary', (req, res) => {
  res.json({ summary: 'This is a mock summary data for TODO app.' });
});

module.exports = router;
