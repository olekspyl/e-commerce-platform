import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	error: null,
	userList: null,
	userRemoval: false,
	orders: null,
	orderRemoval: false,
	deliveredFlag: false
}

export const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.loading = false
		},
		setError: (state, action) => {
			state.error = action.payload
			state.loading = false
		},
		getUsers: (state, action) => {
			state.userList = action.payload
			state.loading = false
			state.error = null
		},
		getOrders: (state, action) => {
			state.orders = action.payload
			state.loading = false
			state.error = null
		},
		userDelete: (state) => {
			state.error = null
			state.loading = false
			state.userRemoval = true
		},
		orderDelete: (state) => {
			state.error = null
			state.loading = false
			state.orderRemoval = true
		},
		resetError: (state) => {
			state.error = null
			state.loading = false
			state.userRemoval = false
			state.deliveredFlag = false
		},
		setDeliveredFlag: (state) => {
			state.deliveredFlag = true
			state.loading = false
		}
	}
})

export const {setLoading, setError, getUsers, getOrders, userDelete, resetError, setDeliveredFlag, orderDelete} = adminSlice.actions

export default adminSlice.reducer

export const adminSelector = state => state.admin