const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  },
  track: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: "/uploads/tracks/thumbnails/default.jpg"
  }
}, { timestamps: true });

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;