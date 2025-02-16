import ProductsScreen from './screens/ProductsScreen';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';

function App() {
	return (
		<div>
			<Router>
				<Header />
				<main>
					<Routes>
						<Route path='/' element={<ProductsScreen />} />
					</Routes>
				</main>
			</Router>
			<ProductsScreen />
		</div>
	);
}

export default App;
