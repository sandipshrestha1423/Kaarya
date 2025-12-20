const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function register(req, res) {
  const { name, email, password, location, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Construct the location object if provided
    let userLocation = undefined;
    if (location && location.lat && location.lng) {
        userLocation = {
            type: 'Point',
            coordinates: [location.lng, location.lat], // GeoJSON expects [lng, lat]
            address: location.address || ''
        };
    }

    user = new User({
      name,
      email,
      password,
      role: role || 'seeker',
      location: userLocation
    });

    await user.save();

    req.session.userId = user.id;
    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    req.session.user = userPayload;

    res.status(201).json({ user: userPayload });
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
    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    req.session.user = userPayload;

    res.status(200).json({ user: userPayload });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

async function logout(req, res) {
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
    res.status(200).json({ msg: "Already logged out or no active session." });
  }
}

async function updateUserProfile(req, res) {
    // Handle multipart form data fields
    const { name, mobile, location } = req.body;
    
    try {
        let user = await User.findById(req.session.userId || req.user.id);
        if (!user) return res.status(404).json({ msg: "User not found" });

        if (name) user.name = name;
        if (mobile) user.mobile = mobile;
        
        // Handle Location (it might come as a JSON string if sent via FormData)
        if (location) {
             let locObj = location;
             if (typeof location === 'string') {
                 try {
                     locObj = JSON.parse(location);
                 } catch (e) {
                     console.error("Error parsing location JSON", e);
                 }
             }

             if (locObj.lat && locObj.lng) {
                user.location = {
                    type: 'Point',
                    coordinates: [locObj.lng, locObj.lat],
                    address: locObj.address || ''
                };
             }
        }

        // Handle Profile Image
        if (req.file) {
            // Store relative path
            user.profileImage = req.file.path.replace(/\\/g, "/"); 
        }

        await user.save();

        // Update session user payload if using session
        if(req.session && req.session.user) {
             req.session.user.name = user.name;
             req.session.user.mobile = user.mobile;
             req.session.user.profileImage = user.profileImage;
        }
        
        const userPayload = {
            id: user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            location: user.location,
            profileImage: user.profileImage
        };

        res.json({ user: userPayload });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports = {
  register,
  login,
  logout,
  updateUserProfile
};