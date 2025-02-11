import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	loading: false,
	error: null,
	products: [],
	product: null,
	pagination: {},
	favoritesToggled: true,
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
		setFavouritesToggled: (state, { payload }) => {
			state.favoritesToggled = payload;
		},
	},
});

export const { setLoading, setProducts, setError, setPagination, setFavorites, setFavouritesToggled } =
	productsSlice.actions;

export default productsSlice.reducer;

export const productSelector = (state) => state.products;
