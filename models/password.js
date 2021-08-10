const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passwordSchema = new Schema({
  password: {
    type: String,
    required: true
  }
});

const Password = mongoose.model('Password', passwordSchema);

module.exports = Password;