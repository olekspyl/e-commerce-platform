import dotenv from 'dotenv';
dotenv.config();
import connectToDatabase from './db.js';
import express from 'express';
import cors from 'cors';

//Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import stripeRoute from './routes/stripeRoute.js'

connectToDatabase();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stripe', stripeRoute);

app.get('/', (req, res) => {
	res.send('api is running ...');
});
app.get('/api/config/google', (req, res) => {
	res.send(process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID');
})

const port = 5001;
app.listen(port, () => {
	console.log('listening on port ' + port);
});
