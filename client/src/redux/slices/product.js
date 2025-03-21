import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	loading: false,
	error: null,
	products: [],
	product: null,
	pagination: {},
	reviewed: false,
	favoritesToggled: false,
	favorites: JSON.parse(localStorage.getItem('favorites')) ?? [],
};

export const productsSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.loading = true;
		},
		setProducts: (state, { payload }) => {
			state.loading = false;
			state.error = null;
			state.products = payload;
		},
		setProduct: (state, { payload }) => {
			state.loading = false;
			state.error = null;
			state.product = payload;
			state.reviewed = false;
		},
		setError: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		setPagination: (state, { payload }) => {
			state.loading = false;
			state.error = null;
			state.pagination = payload;
		},
		setFavorites: (state, { payload }) => {
			state.favorites = payload;
		},
		setFavoritesToggle: (state, { payload }) => {
			state.favoritesToggled = payload;
		},
	},
});

export const { setLoading, setProducts, setError, setPagination, setProduct, setFavorites, setFavoritesToggle } =
	productsSlice.actions;

export default productsSlice.reducer;

export const productSelector = (state) => state.products;
