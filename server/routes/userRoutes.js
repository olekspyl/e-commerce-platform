import express from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { admin, protectRoute } from '../middleware/authMiddleware.js'
import { sendPasswordResetEmail } from '../middleware/sendPasswordResetEmail.js'
import { sendVerificationEmail } from '../middleware/sendVerificationEmail.js'
import Order from '../models/Order.js'
import User from '../models/User.js'

const userRoutes = express.Router()

//TODO: redefine expires
const genToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, {
		expiresIn: '1d'
	})
}

//login
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })
	if (user && (
		await user.matchPassword(password))) {
		user.firstLogin = false
		await user.save()
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
			createdAt: user.createdAt
		})
	} else {
		res.status(401).send('Invalid email or password')
		throw new Error('Invalid email or password')
	}
})

//register
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body
	const userExists = await User.findOne({ email })
	if (userExists) {
		res.status(400).send('User already exists')
	}
	
	const user = await User.create({
		name,
		email,
		password
	})
	
	const newToken = genToken(user._id)
	
	sendVerificationEmail(newToken, email, name)
	
	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			googleImage: user.googleImage,
			googleId: user.googleId,
			isAdmin: user.isAdmin,
			token: newToken,
			active: user.active,
			firstLogin: user.firstLogin,
			createdAt: user.createdAt
		})
	} else {
		res.status(400).send('We could not register you')
		throw new Error('Something went wrong')
	}
})

//verifyEmail
const verifyEmail = asyncHandler(async (req, res) => {
	const user = req.user
	user.active = true
	await user.save()
	res.status(200).send('Thanks for activating your account')
})

//passwordReset request
const passwordResetRequest = asyncHandler(async (req, res) => {
	const { email } = req.body
	try {
		const user = await User.findOne({ email: email })
		if (user) {
			const newToken = genToken(user._id)
			sendPasswordResetEmail(newToken, user.email, user.name)
			res.status(200).send(`We have send you a recover email to ${email}`)
		}
	}
	catch (error) {
		res.status(401).send('There is not account with such an email address')
	}
})
//passwordReset set
const passwordReset = asyncHandler(async (req, res) => {
	const token = req.headers.authorization.split(' ')[1]
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
		const user = await User.findById(decoded.id)
		if (user) {
			user.password = req.body.password
			await user.save()
			res.status(200).json('Password has been updated successfully')
		} else {
			res.status(404).send('User not found')
		}
	}
	catch {
		res.status(401).send('Password reset failed')
	}
})


// googleLogin
const googleLogin = asyncHandler(async (req, res) => {
	const { googleId, email, name, googleImage } = req.body
	
	try {
		const user = await User.findOne({ email: email })
		if (user) {
			user.firstLogin = false
			await user.save()
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				googleImage: googleImage,
				googleId: googleId,
				isAdmin: user.isAdmin,
				token: genToken(user._id),
				active: user.active,
				firstLogin: user.firstLogin,
				createdAt: user.createdAt
			})
		} else {
			const newUser = await User.create({
				name,
				email,
				googleId,
				googleImage
			})
			const newToken = genToken(newUser._id)
			sendVerificationEmail(newToken, newUser.email, newUser.name, newUser._id)
			
			res.status(201).json({
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				googleImage: newUser.googleImage,
				googleId: newUser.googleId,
				isAdmin: newUser.isAdmin,
				token: genToken(newUser._id),
				active: newUser.active,
				firstLogin: newUser.firstLogin,
				createdAt: newUser.createdAt
			})
		}
	}
	catch (error) {
		res.status(404).send('Something went wrong')
	}
})

const getUserOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.params.id })
	if (orders) {
		res.json(orders)
	} else {
		res.status(404).send('No orders found')
		throw new Error('Orders not found')
	}
})

const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({})
	res.json(users)
})

const deleteUser = asyncHandler(async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id)
		res.json(user)
	}
	catch (error) {
		res.status(404).send('User not found')
		throw new Error('User not found')
	}
})

userRoutes.route('/login').post(loginUser)
userRoutes.route('/register').post(registerUser)
userRoutes.route('/verify-email').get(protectRoute, verifyEmail)
userRoutes.route('/password-reset-request').post(passwordResetRequest)
userRoutes.route('/password-reset').post(protectRoute, passwordReset)
userRoutes.route('/google-login').post(googleLogin)
userRoutes.route('/:id').get(protectRoute, getUserOrders)
userRoutes.route('/').get(protectRoute, admin, getUsers)
userRoutes.route('/:id').delete(protectRoute, admin, deleteUser)


export default userRoutes
