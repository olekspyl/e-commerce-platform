import ProductsScreen from './screens/ProductsScreen';
import ProductScreen from './screens/ProductScreen';
import LandingScreen from './screens/LandingScreen';
import { ChakraProvider } from '@chakra-ui/react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';

function App() {
	return (
		<ChakraProvider>
			<div>
				<Router>
					<Header />
					<main>
						<Routes>
							<Route path='/' element={<LandingScreen />} />
							<Route path='/products' element={<ProductsScreen />} />
							<Route path='/product/:id' element={<ProductScreen />} />
						</Routes>
					</main>
				</Router>
			</div>
		</ChakraProvider>
	);
}

export default App;
