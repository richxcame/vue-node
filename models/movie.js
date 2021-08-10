const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title_tk: {
    type: String,
    default: '',
  },
  title_ru: {
    type: String,
    default: '',
  },
  title_en: {
    type: String,
    default: '',
  },
  description_tk: {
    type: String,
    default: '',
  },
  description_ru: {
    type: String,
    default: '' ,
  },
  description_en: {
    type: String,
  },
  language: {
    type: String,
    default: '',
  },
  voice: {
    type: Number,
    defualt: 50,
  },
  tags: {
    type: Array,
    required: true
  },
  smallMovie: {
    type: String,
    required: true
  },
  mediumMovie: {
    type: String,
    required: true
  },
  largeMovie: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: "/uploads/movies/thumbnails/defualt.jpg"
  },
  background_image: {
    type: String,
    default: "/uploads/movies/background_images/default.jpg"
  }
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;