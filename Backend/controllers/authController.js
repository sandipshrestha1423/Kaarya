const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function register(req, res) {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
    });

    await user.save();

    req.session.userId = user.id;
    req.session.user = { id: user.id, name: user.name, email: user.email };

    res
      .status(201)
      .json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

exports.register = register;

async function login(req, res) {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    req.session.userId = user.id;
    req.session.user = { id: user.id, name: user.name, email: user.email };

    res
      .status(200)
      .json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

exports.login = login;

async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Could not log out, please try again.");
    }
    res.clearCookie("connect.sid"); // Clears the session cookie
    return res.status(200).json({ msg: "Logged out successfully" });
  });
}
exports.logout = logout;