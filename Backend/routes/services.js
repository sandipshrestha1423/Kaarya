const express = require("express");
const router = express.Router();
const { createService } = require("../controllers/serviceController");
const auth = require("../middleware/authMiddleware");

// @route   POST api/services
// @desc    Create a service
// @access  Private
router.post("/", auth, createService);

module.exports = router;
