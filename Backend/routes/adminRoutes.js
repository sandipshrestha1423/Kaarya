const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, logoutAdmin } = require('../controllers/adminController');

// Route to create an admin (useful for initial setup)
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);

module.exports = router;
