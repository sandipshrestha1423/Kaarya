const express = require("express");
const router = express.Router();

// Import the logic (Controllers)
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

// Import our Gatekeeper (Middleware)
const auth = require("../middleware/auth");

// --- ROUTES ---

// 1. Get all services (Public - anyone can see this)
router.get("/", getAllServices);

// 2. Get details for one specific service (Public)
router.get("/:id", getServiceById);

// 3. Create a new service (Private - must be logged in)
router.post("/", auth, createService);

// 4. Update a service (Private - must be logged in)
router.put("/:id", auth, updateService);

// 5. Delete a service (Private - must be logged in)
router.delete("/:id", auth, deleteService);

module.exports = router;