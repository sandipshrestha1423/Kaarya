const Service = require("../models/Service");

exports.createService = async (req, res) => {
  const { title, category, description, location } = req.body;

  try {
    console.log("Request Body:", req.body);
    console.log("User ID:", req.user.id);

    const service = new Service({
      title,
      category,
      description,
      location,
      user: req.user.id,
    });

    const savedService = await service.save();
    console.log("Service saved successfully:", savedService);
    res.status(201).json(savedService);
  } catch (err) {
    console.error("Error saving service:", err);
    res.status(500).send("Server error");
  }
};
