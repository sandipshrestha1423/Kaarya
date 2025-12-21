const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function register(req, res) {
  const { name, email, password, location } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists." });
    }

    let userLocation = undefined;
    if (location && location.lat && location.lng) {
        userLocation = {
            type: 'Point',
            coordinates: [location.lng, location.lat], 
            address: location.address || ''
        };
    }

    const newUser = new User({
      name,
      email,
      password, 
      roles: ['user'], // Default role
      location: userLocation,
      status: 'pending' 
    });

    await newUser.save();

    res.status(201).json({ 
        msg: "Registration successful! Please wait for Admin approval to login." 
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (user.status !== 'active') {
        return res.status(403).json({ msg: "Your account is pending approval or has been rejected." });
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
      roles: user.roles, // Sending array of roles
      profileImage: user.profileImage
    };
    req.session.user = userPayload;

    res.status(200).json({ user: userPayload });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Logout failed.");
    }
    res.clearCookie("connect.sid"); 
    return res.status(200).json({ msg: "Logged out" });
  });
}

async function updateUserProfile(req, res) {
    const { name, mobile, location } = req.body;
    
    try {
        let user = await User.findById(req.session.userId);
        if (!user) return res.status(404).json({ msg: "User not found" });

        if (name) user.name = name;
        if (mobile) user.mobile = mobile;
        
        if (location) {
             let locObj = location;
             if (typeof location === 'string') {
                 try {
                     locObj = JSON.parse(location);
                 } catch (e) {
                     console.error("Location parse error", e);
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

        if (req.file) {
            user.profileImage = req.file.path.replace(/\\/g, "/"); 
        }

        await user.save();

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
            roles: user.roles, // Ensure updated roles are returned
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