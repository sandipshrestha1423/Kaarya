const express = require('express');
const router = express.Router();
const { 
    registerAdmin, 
    loginAdmin, 
    logoutAdmin,
    getPendingUsers,
    verifyUser,
    getPendingServices,
    verifyService
} = require('../controllers/adminController');

// Simple check for admin session
const requireAdmin = (req, res, next) => {
    if (req.session && req.session.adminId) {
        return next();
    }
    return res.status(401).json({ msg: "Admin access required" });
};

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);

// Protected Admin Routes
router.get('/pending-users', requireAdmin, getPendingUsers);
router.post('/verify-user', requireAdmin, verifyUser);

router.get('/pending-services', requireAdmin, getPendingServices);
router.post('/verify-service', requireAdmin, verifyService);

module.exports = router;