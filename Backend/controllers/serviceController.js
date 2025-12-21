const Service = require("../models/Service");
const User = require("../models/User");

exports.createService = async (req, res) => {
  const { title, category, description, type, fee, feeUnit, preferredTime, preferredDay } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    const userLocationStr = user.location && user.location.address 
        ? user.location.address 
        : "Location not available";

    const service = new Service({
      title,
      category,
      description,
      location: userLocationStr, 
      type: type || 'request', 
      fee,
      feeUnit,
      preferredTime,
      preferredDay,
      user: req.user.id, 
      status: 'pending' 
    });

    await service.save();

    // DYNAMIC ROLE ASSIGNMENT
    // 'offer' -> 'provider'
    // 'request' -> 'seeker'
    let roleToAdd = type === 'offer' ? 'provider' : 'seeker';
    
    // Add the role if they don't have it yet
    if (!user.roles.includes(roleToAdd)) {
        user.roles.push(roleToAdd);
        await user.save();
        
        // Update session info if needed
        if (req.session.user) {
            req.session.user.roles = user.roles;
        }
    }

    res.status(201).json(service);

  } catch (err) {
    console.error("Create Service Error:", err);
    res.status(500).send("Server error");
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ status: 'active' }).populate("user", "name email");
    res.json(services);
  } catch (err) {
    console.error("Get All Services Error:", err.message);
    res.status(500).send("Server error");
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "user",
      "name email mobile profileImage" 
    );

    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }
    res.json(service);

  } catch (err) {
    console.error("Get Service By ID Error:", err.message);
    res.status(500).send("Server error");
  }
};

exports.updateService = async (req, res) => {
  try {
    const { title, description, category, fee, feeUnit, preferredTime, preferredDay } = req.body;
    
    let service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }

    if (service.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    service = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, category, fee, feeUnit, preferredTime, preferredDay } },
      { new: true } 
    );

    res.json(service);

  } catch (err) {
    console.error("Update Service Error:", err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }

    if (service.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await service.deleteOne(); 

    res.json({ msg: "Service deleted" });
  } catch (err) {
    console.error("Delete Service Error:", err.message);
    res.status(500).send("Server error");
  }
};