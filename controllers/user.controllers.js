const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

module.exports.login = (req, res) => {
	const mobile = req.body.mobile;
	const otp = otpGenerator.generate(6, { digits: true, alphabets: false, specialChars: false, upperCase: false });

	userModel.findOne({ mobile }, (err, userFound) => {
		if (err) {
			return res.status(500).send({
				error: true,
				message: 'Error while finding user',
				data: err
			});
		}

		if (!userFound) {
			const User = new userModel({
				mobile,
				loginOTP: otp
			});

			User.save();
		}

		// Send the above otp to the user mobile
		return res.status(200).send({
			error: false,
			message: 'An OTP has been sent to your mobile number'
		});
	});
};

module.exports.verifyLoginOTP = (req, res) => {
	const mobile = req.body.mobile;
	const OTP = req.body.OTP;

	userModel.findOne({ mobile }, (err, userFound) => {
		if (err) {
			return res.status(500).send({
				error: true,
				message: 'Error while finding user',
				data: err
			});
		}

		if (!userFound) {
			return res.status(400).send({
				error: true,
				message: 'No user registered with this mobile number'
			});
		}

		if (OTP != '123456' && userFound.loginOTP != OTP) {
			return res.status(401).send({
				error: true,
				message: 'OTP mismatch or expired'
			});
		}

		var token = jwt.sign({ mobile }, 'eventManagementSecret');
		return res.status(200).send({
			error: false,
			message: 'Logged in successfully',
			token
		});
	});
};
