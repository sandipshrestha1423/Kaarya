const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Import the logic from our controller
const { register, login, logout, updateUserProfile } = require('../controllers/authController');

// Import our Gatekeeper (Middleware)
const authMiddleware = require('../middleware/auth');

// --- SETUP FOR FILE UPLOADS (Images) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Save images in the 'uploads' folder
    },
    filename: (req, file, cb) => {
      // Give each image a unique name using the date
      cb(null, 'profile-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5000000 }, // Max 5MB
    fileFilter: (req, file, cb) => {
        // Only allow image files
        const filetypes = /jpeg|jpg|png|webp/;
        const isImage = filetypes.test(file.mimetype);
        if (isImage) return cb(null, true);
        cb(new Error('Please upload an image only (jpg, png, or webp).'));
    }
});

// --- ROUTES ---

// 1. Sign Up
router.post('/register', register);

// 2. Sign In
router.post('/login', login);

// 3. Sign Out
router.post('/logout', logout);

// 4. Update Profile (Requires Login + handles 1 image upload)
router.put('/profile', authMiddleware, upload.single('profileImage'), updateUserProfile);

module.exports = router;