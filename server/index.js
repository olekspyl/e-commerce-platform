import dotenv from 'dotenv';
dotenv.config();
import connectToDatabase from './db.js';
import express from 'express';
import cors from 'cors';

//Routes
import productRoutes from './routes/productRoutes.js';

connectToDatabase();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
	res.send('api is running ...');
});

const port = 5000;
app.listen(port, () => {
	console.log('listening on port ' + port);
});
