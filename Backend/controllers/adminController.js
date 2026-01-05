const Admin = require("../models/Admin");
const User = require("../models/User");
const Service = require("../models/Service");
const bcrypt = require("bcryptjs");

async function registerAdmin(req, res) {
  const { email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    admin = new Admin({
      email,
      password,
    });

    await admin.save();

    req.session.adminId = admin.id;
    const adminPayload = {
      id: admin.id,
      email: admin.email,
      role: 'admin'
    };
    req.session.admin = adminPayload;

    res.status(201).json({ admin: adminPayload });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

async function loginAdmin(req, res) {
  const { email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    req.session.adminId = admin.id;
    const adminPayload = {
      id: admin.id,
      email: admin.email,
      role: 'admin'
    };
    req.session.admin = adminPayload;

    res.status(200).json({ admin: adminPayload });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

async function logoutAdmin(req, res) {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Session destruction error:", err); 
          return res.status(500).send("Could not log out, please try again.");
        }
        res.clearCookie("connect.sid"); 
        return res.status(200).json({ msg: "Logged out successfully" });
      });
    } else {
      res.clearCookie("connect.sid");
      return res.status(200).json({ msg: "Already logged out" });
    }
}

// --- NEW ADMIN FUNCTIONS ---

async function getPendingUsers(req, res) {
    try {
        const users = await User.find({ status: 'pending' });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}

async function verifyUser(req, res) {
    const { userId, status } = req.body; // status: 'active' or 'rejected'
    try {
        const user = await User.findByIdAndUpdate(userId, { status }, { new: true });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}

async function getPendingServices(req, res) {
    try {
        const services = await Service.find({ status: 'pending' }).populate('user', 'name email mobile');
        res.json(services);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}

async function verifyService(req, res) {
    const { serviceId, status } = req.body; // status: 'active' or 'rejected'
    try {
        const service = await Service.findByIdAndUpdate(serviceId, { status }, { new: true });
        res.json(service);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}

module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getPendingUsers,
  verifyUser,
  getPendingServices,
  verifyService
};