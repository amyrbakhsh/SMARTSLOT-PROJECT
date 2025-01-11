const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  carmake: {
    type: String,
    required: true,
  },
  carmodel: {
    type: String,
    required: true,
  },
  servicetype: {
    type: String,
    enum: ['Car Wash','Car Polish','Car Detailing','Paint Protection','Window Tint']
  },
  notes: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true,
    match: /^(?:[01]\d|2[0-3]):[0-5]\d$/ 
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  appointments: [appointmentSchema],
});

module.exports = mongoose.model('User', userSchema);
