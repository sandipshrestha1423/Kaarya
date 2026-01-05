const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Roles is now an array. Everyone starts as just a 'user'.
  // As they post services, we can add 'seeker' or 'provider' here.
  roles: {
    type: [String],
    enum: ['user', 'seeker', 'provider', 'admin'], 
    default: ['user']
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'rejected'],
    default: 'pending' 
  },
  mobile: {
    type: String,
  },
  profileImage: {
    type: String, 
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], 
      index: '2dsphere', 
    },
    address: {
      type: String, 
    },
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(5);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);