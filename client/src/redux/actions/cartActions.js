import axios from 'axios';
import { setError, setLoading, setShippingCosts, cartItemAdd, cartItemRemoval, clearCart } from '../slices/cart';

export const addCartItem = (id, qty) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const { data } = await axios.get(`/api/products/${id}`);
		const itemToAdd = {
			id: data._id,
			name: data.name,
			subtitle: data.subtitle,
			image: data.image[0],
			price: data.stock,
			brand: data.brand,
			qty,
			stripeId: data.stripeId,
		};
		dispatch(cartItemAdd(itemToAdd));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'An error occurred'
			)
		);
	}
};

export const removeCartItem = (id) => async (dispatch) => {
	dispatch(setLoading(true));
	dispatch(cartItemRemoval(id));
};

export const setShipping = (value) => async (dispatch) => {
	dispatch(setShippingCosts(value));
};

export const resetCart = () => async (dispatch) => {
	dispatch(clearCart());
};
