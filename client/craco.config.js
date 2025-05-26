const path = require('path')

module.exports = {
	webpack: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		},
		configure: (webpackConfig, { env, paths }) => {
			// Знаходимо babel-loader
			const babelLoader = webpackConfig.module.rules
				.find(rule => Array.isArray(rule.oneOf)).oneOf
				.find(rule => rule.loader && rule.loader.includes('babel-loader'))
			
			if (babelLoader) {
				// Фільтруємо плагіни, якщо продакшн
				babelLoader.options.plugins = babelLoader.options.plugins.filter(
					plugin =>
						!(
							typeof plugin === 'string' && plugin.includes('react-refresh'))
				)
			}
			
			return webpackConfig
		}
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
	}
}
