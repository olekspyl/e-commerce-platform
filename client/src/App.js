import CartScreen from './screens/CartScreen'
import LandingScreen from './screens/LandingScreen'
import LoginScreen from './screens/LoginScreen'
import ProductScreen from './screens/ProductScreen'
import ProductsScreen from './screens/ProductsScreen'
import EmailVerificationScreen from './screens/EmailVerificationScreen'
import PasswordResetScreen from './screens/PasswordResetScreen'

import { ChakraProvider } from '@chakra-ui/react'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {
	return (
		<ChakraProvider>
			<div>
				<Router>
					<Header />
					<main>
						<Routes>
							<Route path='/products' element={<ProductsScreen />} />
							<Route path='/' element={<LandingScreen />} />
							<Route path='/product/:id' element={<ProductScreen />} />
							<Route path='/cart' element={<CartScreen />} />
							<Route path='/login' element={<LoginScreen />} />
							<Route path='/email-verify/:token' element={<EmailVerificationScreen />} />
							<Route path='/password-reset/:token' element={<PasswordResetScreen />} />
						</Routes>
					</main>
					<Footer />
				</Router>
			</div>
		</ChakraProvider>
	)
}

export default App
