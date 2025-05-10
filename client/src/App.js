import CartScreen from './screens/CartScreen'
import LandingScreen from './screens/LandingScreen'
import LoginScreen from './screens/LoginScreen'
import ProductScreen from './screens/ProductScreen'
import ProductsScreen from './screens/ProductsScreen'
import YourOrdersScreen from './screens/YourOrdersScreen'
import CheckoutScreen from './screens/CheckoutScreen'
import SuccessScreen from './screens/SuccessScreen'
import CancelScreen from './screens/CancelScreen'
import EmailVerificationScreen from './screens/EmailVerificationScreen'
import PasswordResetScreen from './screens/PasswordResetScreen'
import RegistrationScreen from './screens/RegistrationScreen'

import { ChakraProvider } from '@chakra-ui/react'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import axios from 'axios'
import {VStack, Spinner} from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import {GoogleOAuthProvider} from '@react-oauth/google'



function App() {
	const [googleClient, setGoogleClient] = useState(null)
	
	useEffect(() => {
		const googleKey = async () => {
			const {data: googleId} = await axios.get('/api/config/google')
			setGoogleClient(googleId)
		}
		googleKey()
	}, [googleClient])
	
	return !googleClient ? (<VStack pt='37vh'>
<Spinner
						mt='20'
						thickness='2px'
						speed='0.65s'
						emptyColor='gray.200'
						color='cyan.500'
						size='xl'
					/>	</VStack>) : (
						<GoogleOAuthProvider clientId={googleClient}>
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
							<Route path='/registration' element={<RegistrationScreen />} />
							<Route path='/email-verify/:token' element={<EmailVerificationScreen />} />
							<Route path='/password-reset/:token' element={<PasswordResetScreen />} />
							<Route path='/checkout' element={<CheckoutScreen />} />
							<Route path='/cancel' element={<CancelScreen />} />
							<Route path='/order-history' element={<YourOrdersScreen />} />
							<Route path='/success' element={<SuccessScreen />} />
						</Routes>
					</main>
					<Footer />
				</Router>
			</div>
		</ChakraProvider>
						</GoogleOAuthProvider>

	)
}

export default App
