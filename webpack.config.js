const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: {
		'bundleApp': './src/client/app.js',
		'bundleAppLogin': './src/client/appLogin.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/public/'
	},
	watch: true,
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: 'eslint-loader'
			},
			{
				test: /\.html$/i,
				exclude: /node_modules/,
				loader: 'html-loader',
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	]
};