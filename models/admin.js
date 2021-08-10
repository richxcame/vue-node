const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
	name: {
		type: String,
		default: 'Railways'
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		default: '/uploads/avatars/default.jpg'
	}
})

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;