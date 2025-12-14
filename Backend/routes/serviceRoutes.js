const express = require("express");
const router = express.Router();
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const auth = require("../middleware/auth");

// @route   GET api/services
// @desc    Get all services
// @access  Public
router.get("/", getAllServices);

// @route   GET api/services/:id
// @desc    Get service by ID
// @access  Public
router.get("/:id", getServiceById);

// @route   POST api/services
// @desc    Create a service
// @access  Private
router.post("/", auth, createService);

// @route   PUT api/services/:id
// @desc    Update a service
// @access  Private
router.put("/:id", auth, updateService);

// @route   DELETE api/services/:id
// @desc    Delete a service
// @access  Private
router.delete("/:id", auth, deleteService);

module.exports = router;
