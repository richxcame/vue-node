const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  language: {
    type: String,
    defualt: ''
  },
  tags: {
    type: Array,
    required: true
  },
  smallVideo: {
    type: String,
    required: true
  },
  mediumVideo: {
    type: String,
    required: true
  },
  largeVideo: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: "/uploads/videos/thumbnails/default.jpg"
  }
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;