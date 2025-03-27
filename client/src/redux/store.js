import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cart from './slices/cart'
import product from './slices/product'
import user from './slices/user'

const reducer = combineReducers({
	product,
	cart,
	user,
})

export default configureStore({ reducer })
