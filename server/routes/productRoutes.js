import express from 'express';
import Product from '../models/Product.js';

const productRoutes = express.Router();

const getProducts = async (req, res) => {
	try {
		const products = await Product.find();
		console.log('Products from DB:', products); // Додаємо лог
		res.json({
			products: products,
			pagination: {},
		});
	} catch (error) {
		console.error('Error fetching products:', error);
		res.status(500).json({ message: 'Server Error' });
	}
};

productRoutes.route('/').get(getProducts);

export default productRoutes;
