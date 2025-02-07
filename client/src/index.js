import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import store from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider strore={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
