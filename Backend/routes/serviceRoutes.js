const express = require("express");
const verifyToken = require("../middleware/auth.js");
const Service = require("../models/Service.js");

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, category, location, price } = req.body;
    const newService = new Service({
      title,
      description,
      category,
      location,
      price,
      user: req.user._id,
    });

    const savedService = await newService.save();

    res.status(201).json({
      message: "Service posted successfully!",
      service: savedService,
    });
  } catch (error) {
    console.error("Error posting service:", error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

module.exports = router;
