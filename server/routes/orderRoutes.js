import express from 'express'
import asyncHandler from 'express-async-handler'
import { admin, protectRoute } from '../middleware/authMiddleware.js'
import Order from '../models/Order.js'

const orderRoutes = express.Router()

const getOrders = async (req, res) => {
	const orders = await Order.find({})
	res.json(orders)
}

const deleteOrder = asyncHandler(async (req, res) => {
	const order = await Order.findByIdAndDelete(req.params.id)
	
	if (order) {
		res.json(order)
	} else {
		res.status(404).send('Order not found')
		throw new Error('Order not found')
	}
})

const setDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)
	if (order) {
		order.isDelivered = true
		const updateOrder = await order.save()
		res.json(updateOrder)
	} else {
		res.status(404).send('Order not found')
		throw new Error('Order could not be updated')
	}
})

orderRoutes.route('/').get(protectRoute, admin, getOrders)
orderRoutes.route('/:id').put(protectRoute, admin, deleteOrder)
orderRoutes.route('/:id').delete(protectRoute, admin, setDelivered)

export default orderRoutes