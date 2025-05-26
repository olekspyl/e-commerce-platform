import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import connectToDatabase from './db.js'
import orderRoutes from './routes/orderRoutes.js'

//Routes
import productRoutes from './routes/productRoutes.js'
import stripeRoute from './routes/stripeRoute.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()


connectToDatabase()
const app = express()
app.use(express.json())
if (process.env.NODE_ENV !== 'production') {
	app.use(cors())
}

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/stripe', stripeRoute)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
	res.send('api is running ...')
})
app.get('/api/config/google', (req, res) => {
	res.send(process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID')
})

const port = 5001

const _dirname = path.resolve()
app.use('/uploads', express.static(path.join(_dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(_dirname, '/client/build')))
	
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'))
	})
}


app.listen(port, () => {
	console.log('listening on port ' + port)
})
