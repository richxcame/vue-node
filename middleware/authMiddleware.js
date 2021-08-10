const Password = require('../models/password')

const authMiddleware = (req, res, next) => {
	Password.findOne({ _id: '6095847ebcb6e5145c3120be' })
		.then(data => {
			if (req.cookies.adminpassword === data.password) {
				next();
			}
		})
		.catch(err => {
			console.log(err);
			next();
		})
}

module.exports = { authMiddleware }
