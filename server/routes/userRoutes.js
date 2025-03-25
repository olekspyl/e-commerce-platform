import express from 'express';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const userRoutes = express.Router();

//TODO: redefine expires
const genToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, {
		expiresIn: '60d',
	});
};

//login
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		user.firstLogin = false;
		await user.save();
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			googleImage: user.image,
			googleId: user.googleId,
			isAdmin: user.isAdmin,
			token: genToken(user._id),
			active: user.active,
			firstLogin: user.firstLogin,
			createdAt: user.createdAt,
		});
	} else {
		res.status(401).send('Invalid email or password');
		throw new Error('Invalid email or password');
	}
});

//register
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400).send('User already exists');
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	const newToken = genToken(user._id);
	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			googleImage: user.image,
			googleId: user.googleId,
			isAdmin: user.isAdmin,
			token: newToken,
			active: user.active,
			firstLogin: user.firstLogin,
			createdAt: user.createdAt,
		});
	} else {
		res.status(400).send('We could not register you');
		throw new Error('Something went wrong');
	}
});

//verifyEmail

//passwordReset request

//passwordReset set

userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);
export default userRoutes;
