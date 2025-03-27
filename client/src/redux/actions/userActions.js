import axios from 'axios'
import { clearCart } from '../slices/cart'
import { setError, setLoading, userLogin, userLogout } from '../slices/user'

export const login = (email, password) => async dispatch => {
	dispatch(setLoading())
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const { data } = await axios.post(
			'/api/users/login',
			{ email, password },
			config
		)
		dispatch(userLogin(data))
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
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

export const logout = () => dispatch => {
	localStorage.removeItem('userInfo')
	localStorage.removeItem('cartItems')
	dispatch(clearCart())
	dispatch(userLogout())
}

export const register = (name, email, password) => async dispatch => {
	dispatch(setLoading())
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const { data } = await axios.post(
			'/api/users/register',
			{ name, email, password },
			config
		)
		dispatch(userLogin(data))
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
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
