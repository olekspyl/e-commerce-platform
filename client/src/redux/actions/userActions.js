import axios from 'axios'
import { clearCart } from '../slices/cart'
import {
	setError,
	setLoading,
	setServerResponseMsg,
	setServerResponseStatus,
	stateReset,
	userLogin,
	userLogout,
	verificationEmail,
} from '../slices/user'

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

export const verifyEmail = token => async dispatch => {
	dispatch(setLoading(true))
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		}
		await axios.get('/api/users/verify-email', config)

		dispatch(verificationEmail())
		const parsed = JSON.parse(localStorage.getItem('userInfo'));
parsed.active = true;
localStorage.setItem('userInfo', JSON.stringify(parsed));
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

export const sendResetEmail = email => async dispatch => {
	dispatch(setLoading(true))
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const { data, status } = await axios.post(
			'/api/users/password-reset-request',
			{ email },
			config
		)

		dispatch(setServerResponseMsg(data))
		dispatch(setServerResponseStatus(status))
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

export const resetPassword = (password, token) => async dispatch => {
	dispatch(setLoading(true))
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		}
		const { data, status } = await axios.post(
			'/api/users/password-reset',
			{ password },
			config
		)

		dispatch(setServerResponseMsg(data, status))
		dispatch(setServerResponseStatus(status))
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

export const resetState = () => async dispatch => {
	dispatch(stateReset())
}
