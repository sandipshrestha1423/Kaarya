const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { register, login, logout, updateUserProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Multer Config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, 'profile-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed'));
    }
});

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.put('/profile', authMiddleware, upload.single('profileImage'), updateUserProfile);

module.exports = router;