import ProductsScreen from './screens/ProductsScreen';
import { Provider } from '@/components/ui/provider';
function App() {
	return (
		<Provider>
			<ProductsScreen />
		</Provider>
	);
}

export default App;
