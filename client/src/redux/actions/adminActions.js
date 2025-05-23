import axios from 'axios'
import {
	getOrders,
	getUsers,
	orderDelete,
	resetError,
	setDeliveredFlag,
	setError,
	setLoading,
	userDelete
} from '../slices/admin'
import {
	setProducts,
	setProductUpdateFlag,
	setReviewRemovalFlag
} from '../slices/product'

export const getAllUsers = () => async (dispatch, getState) => {
	setLoading()
	const { user: { userInfo } } = getState()
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`
		}
	}
	
	try {
		const { data } = await axios.get('/api/users', config)
		dispatch(getUsers(data))
	}
	catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
						? error.message
						: 'An error occurred'
			)
		)
	}
}


export const deleteUser = (id) => async (dispatch, getState) => {
	setLoading()
	const { user: { userInfo } } = getState()
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`
		}
	}
	
	try {
		const { data } = await axios.delete(`/api/users/${id}`, config)
		dispatch(userDelete(data))
	}
	catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
						? error.message
						: 'An error occurred'
			)
		)
	}
}


export const getAllOrders = () => async (dispatch, getState) => {
	setLoading()
	const { user: { userInfo } } = getState()
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`
		}
	}
	
	try {
		const { data } = await axios.get(`/api/orders`, config)
		dispatch(getOrders(data))
	}
	catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
						? error.message
						: 'An error occurred'
			)
		)
	}
}

export const deleteOrder = (id) => async (dispatch, getState) => {
	setLoading()
	const { user: { userInfo } } = getState()
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`
		}
	}
	
	try {
		const { data } = await axios.delete(`/api/orders/${id}`, config)
		dispatch(orderDelete(data))
	}
	catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
						? error.message
						: 'An error occurred'
			)
		)
	}
}


export const setDelivered = (id) => async (dispatch, getState) => {
	setLoading()
	const { user: { userInfo } } = getState()
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`
		}
	}
	
	try {
		await axios.put(`/api/orders/${id}`, {}, config)
		dispatch(setDeliveredFlag())
	}
	catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
						? error.message
						: 'An error occurred'
			)
		)
	}
}


export const resetErrorAndRemoval = () => async (dispatch) => {
	dispatch(resetError())
}

export const updateProduct = (brand, name, category, stock, price, id, productIsNew, description, subtitle, stripeId, imageOne, imageTwo) => async (dispatch, getState) => {
	setLoading()
	const { user: { userInfo } } = getState()
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`
		}
	}
	
	try {
		const { data } = await axios.put(`/api/products/${id}`, {
			brand,
			name,
			category,
			stock,
			price,
			id,
			productIsNew,
			description,
			subtitle,
			stripeId,
			imageOne,
			imageTwo
		}, config)
		dispatch(setProducts(data))
		dispatch(setProductUpdateFlag())
	}
	catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
						? error.message
						: 'An error occurred'
			)
		)
	}
}

export const deleteProduct = (id) => async (dispatch, getState) => {
	setLoading()
	const { user: { userInfo } } = getState()
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`
		}
	}
	
	try {
		const { data } = await axios.delete(`/api/products/${id}`, config)
		dispatch(setProducts(data))
		dispatch(setProductUpdateFlag())
		dispatch(resetError())
	}
	catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
						? error.message
						: 'An error occurred'
			)
		)
	}
}

export const uploadProduct = (newProduct) => async (dispatch, getState) => {
	setLoading()
	const { user: { userInfo } } = getState()
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`
		}
	}
	
	try {
		const { data } = await axios.post(`/api/products`, newProduct, config)
		dispatch(setProducts(data))
		dispatch(setProductUpdateFlag())
	}
	catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
						? error.message
						: 'An error occurred'
			)
		)
	}
}


export const removeReview = (productId, reviewId) => async (dispatch, getState) => {
	setLoading()
	const { user: { userInfo } } = getState()
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`
		}
	}
	
	try {
		const { data } = await axios.put(`/api/products/${productId}/${reviewId}`, {}, config)
		dispatch(setProducts(data))
		dispatch(setReviewRemovalFlag())
	}
	catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
						? error.message
						: 'An error occurred'
			)
		)
	}
}