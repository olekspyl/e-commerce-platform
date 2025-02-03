const path = require('path');

module.exports = {
	webpack: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'], // Додаємо підтримку TS і JSX
	},
};
