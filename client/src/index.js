import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import { Provider as ChakrapProvider } from '@/components/ui/provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ChakrapProvider>
				<App />
			</ChakrapProvider>
		</Provider>
	</React.StrictMode>
);
