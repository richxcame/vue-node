const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
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
    defualt: ''
  },
  duration: {
    type: String,
    required: false
  },
  tags: {
    type: Array,
    required: true
  },
  book: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: "default.jpg"
  }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;