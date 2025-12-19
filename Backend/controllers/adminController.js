const Admin = require("../models/Admin");
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
          console.error("Session destruction error:", err); // Log the error
          return res.status(500).send("Could not log out, please try again.");
        }
        res.clearCookie("connect.sid"); // Clears the session cookie
        return res.status(200).json({ msg: "Logged out successfully" });
      });
    } else {
      // If no session exists, just clear any potential session cookie
      res.clearCookie("connect.sid");
      return res.status(200).json({ msg: "Already logged out or no active session." });
    }
}

module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin
};
