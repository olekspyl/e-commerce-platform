import { setProducts, setLoading, setError, setPagination } from './productActions';
import axios from 'axios';

export const fetchProducts = (page, favouriteToggle) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const { data } = await axios.get(`/api/products`);
		const { products, pagination } = data;
		dispatch(setProducts(products));
		dispatch(setPagination(pagination));
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
