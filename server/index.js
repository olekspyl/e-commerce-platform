import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import connectToDatabase from './db.js'
import orderRoutes from './routes/orderRoutes.js'

//Routes
import productRoutes from './routes/productRoutes.js'
import stripeRoute from './routes/stripeRoute.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()


connectToDatabase()
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.json())
if (process.env.NODE_ENV !== 'production') {
	app.use(cors())
}

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/stripe', stripeRoute)
app.use('/api/orders', orderRoutes)

app.get('/api/config/google', (req, res) => {
	res.json({ googleClientId: process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID' })
})

const port = process.env.PORT || 5001

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

if (process.env.NODE_ENV === 'production') {
	const clientBuildPath = path.resolve(__dirname, '../client/build')
	app.use(express.static(clientBuildPath))
	
	app.get('*', (req, res) => {
		res.sendFile(path.join(clientBuildPath, 'index.html'))
	})
}


app.get('/', (req, res) => {
	res.send('api is running ...')
})


app.listen(port, () => {
	console.log('listening on port ' + port)
})
