const { Schema, model } = require('mongoose');

const warSchema = new Schema({
  city: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true,
    trim: true
  },
  time: {
    type: String,
    required: true,
    trim: true
  },
  warAuthor: {
    type: String,
    required: true,
    trim: true
  },
  tanks: {
    type: Array
  },
  mdps: {
    type: Array
  },
  prdps: {
    type: Array
  },
  erdps: {
    type: Array
  },
  healers: {
    type: Array
  },
  artillery: {
    type: Array
  }
});

const War = model('War', warSchema);

module.exports = War;