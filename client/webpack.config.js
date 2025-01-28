import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config = {
	entry: './src/index.js',
	mode: 'development',
	module: {
		rules: [
			{
				exclude: /(node_modules)/,
				test: /\.(js|jsx|ts|tsx)$/i, // Додано підтримку TypeScript
				loader: 'babel-loader',
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'], // Додано підтримку розширень TypeScript
		plugins: [
			new TsconfigPathsPlugin({
				configFile: path.resolve('./tsconfig.json'), // Вказуємо шлях до tsconfig.json
			}),
		],
	},
	output: {
		path: path.resolve('./dist'),
		filename: 'bundle.js', // Вказуємо ім'я файлу виводу
	},
	plugins: [],
};

export default config;
