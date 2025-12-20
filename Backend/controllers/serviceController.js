const Service = require("../models/Service");
const User = require("../models/User");

exports.createService = async (req, res) => {
  const { title, category, description, type, fee, feeUnit, preferredTime, preferredDay } = req.body;

  try {
    // Fetch user to get their registered location
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    // Use user's registered address/location string for the service
    // Assuming user.location.address is the string representation
    const userLocationStr = user.location ? user.location.address : "Location not available";

    const service = new Service({
      title,
      category,
      description,
      location: userLocationStr, // Auto-populate location
      type: type || 'request',
      fee,
      feeUnit,
      preferredTime,
      preferredDay,
      user: req.user.id,
    });

    const savedService = await service.save();
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
      "name email mobile"
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
    const { title, description, category, location, fee, feeUnit, preferredTime, preferredDay } = req.body;
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
      { $set: { title, description, category, location, fee, feeUnit, preferredTime, preferredDay } },
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

    await service.deleteOne(); // updated from remove() to deleteOne() for newer mongoose versions

    res.json({ msg: "Service removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Service not found" });
    }
    res.status(500).send("Server error");
  }
};