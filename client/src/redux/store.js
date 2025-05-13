import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cart from './slices/cart'
import product from './slices/product'
import user from './slices/user'
import order from './slices/order'
import admin from './slices/admin'

const reducer = combineReducers({
	product,
	cart,
	user,
	order,
	admin
})

export default configureStore({ reducer })
