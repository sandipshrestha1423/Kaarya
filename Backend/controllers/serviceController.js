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

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate("user", "name email");
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }
    res.json(service);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Service not found" });
    }
    res.status(500).send("Server error");
  }
};

exports.updateService = async (req, res) => {
  try {
    const { title, description, category, location, price } = req.body;
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }

    // Check user
    if (service.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    service = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, category, location, price } },
      { new: true }
    );

    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }

    // Check user
    if (service.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await service.remove();

    res.json({ msg: "Service removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Service not found" });
    }
    res.status(500).send("Server error");
  }
};
