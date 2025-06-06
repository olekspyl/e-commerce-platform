import axios from 'axios'
import {setError, setShippingAddress, clearOrder} from '../slices/order'

export const setAddress = (data) => async (dispatch) => {
	dispatch(setShippingAddress(data))
}

export const setPayment = () => async (dispatch, getState) =>{
	const { cart: { cartItems, subtotal, shipping },
	order: {shippingAddress}, user: {userInfo}} = getState()
	
	const newOrder = {subtotal, cartItems, shipping, shippingAddress, userInfo}
	
	try {
			const config = {
						headers: {
							Authorization: `Bearer ${userInfo.token}`,
							'Content-Type': 'application/json',
						}}
			const {data} = await axios.post('/api/checkout', newOrder, config)
		window.location.assign(data.url)
		
} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'An error occurred'
			)
		)	}
}

export const resetOrder = () => async (dispatch) => {
	dispatch(clearOrder())
}

