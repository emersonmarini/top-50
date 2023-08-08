import path from 'path';

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import checkVersion from 'check-node-version';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
// eslint-disable-next-line import/default
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
// eslint-disable-next-line import/no-unresolved
import WebpackBar from 'webpackbar';

import pkg from './package.json';

checkVersion(pkg.engines, (error, result) => {
	if (error) {
		throw error;
	}

	if (result.isSatisfied) return;

	let errorMessage = '';
	const { node } = result.versions;

	if (!node.isSatisfied) {
		errorMessage += `\nUnexpected Node version\n - found: ${node.version}\n - wanted: ${node.wanted}`;
	}

	const { npm } = result.versions;

	if (!npm.isSatisfied) {
		errorMessage += `\nUnexpected npm version\n - found: ${npm.version}\n - wanted: ${npm.wanted}`;
	}

	errorMessage += `\nPlease update to the minimum wanted version.`;
	throw new Error(errorMessage);
});

export default (_: any, options: any) => {
	const prod = process.env.NODE_ENV === 'production';

	const config = {
		devtool: prod ? undefined : 'source-map',
		mode: prod ? 'production' : 'development',
		target: 'web',
		entry: {
			app: ['core-js/stable', path.join(__dirname, 'src', 'index')],
		},
		output: prod
			? {
					filename: '[name].[contenthash].js',
					chunkFilename: '[name].[contenthash].chunk.js',
					publicPath: '/',
					path: path.resolve(__dirname, 'dist'),
			  }
			: {
					chunkFilename: '[name].chunk.js',
					clean: true,
					publicPath: '/',
					path: path.resolve(__dirname, 'dist'),
			  },
		optimization: prod
			? {
					minimize: true,
					minimizer: [new CssMinimizerPlugin()],
					removeAvailableModules: true,
					removeEmptyChunks: true,
			  }
			: {
					minimize: false,
					minimizer: undefined,
					removeAvailableModules: false,
					removeEmptyChunks: false,
			  },
		cache: prod
			? false
			: {
					type: 'filesystem',
					allowCollectingMemory: true,
			  },
		resolve: {
			alias: {
				'@src': path.join(__dirname, 'src'),
				'@config': path.join(__dirname, 'src', 'config'),
				'@helpers': path.join(__dirname, 'src', 'helpers'),
				'@hooks': path.join(__dirname, 'src', 'hooks'),
				'@pages': path.join(__dirname, 'src', 'pages'),
			},
			extensions: ['.ts', '.tsx', '.html', '.js', '.jsx'],
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx|ts|tsx)$/i,
					exclude: /node_modules/,
					use: ['babel-loader'],
				},
				{
					test: /\.less$/i,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: require.resolve('css-loader'),
							options: {
								modules: {
									localIdentContext: path.resolve(
										__dirname,
										'..',
										'src',
									),
									localIdentName:
										'[name]__[local]___[hash:base64:5]',
								},
								sourceMap: false,
							},
						},
						require.resolve('less-loader'),
					],
				},
				{
					test: /\.css$/i,
					use: [MiniCssExtractPlugin.loader, 'css-loader'],
				},
				{
					test: /\.(png|jpg|jpeg|gif|ico)$/,
					type: 'asset/resource',
					generator: {
						filename: 'assets/[name][ext][query]',
					},
				},
			],
		},
		plugins: prod
			? [
					new CleanWebpackPlugin(),
					new webpack.EnvironmentPlugin({
						Config:
							process.env.Config || options.mode || 'production',
					}),
					new CopyWebpackPlugin({
						patterns: [
							{
								from: 'src/assets/*',
								to: 'assets/[name][ext][query]',
							},
						],
					}),
					new HtmlWebpackPlugin({
						template: path.join(__dirname, 'public', 'index.html'),
					}),
					new MiniCssExtractPlugin(),
			  ]
			: [
					new HtmlWebpackPlugin({
						template: path.join(__dirname, 'public', 'index.html'),
						chunks: ['app'],
						inject: true,
						cache: true,
						minify: false,
					}),
					new WebpackBar({
						name: 'Loading App',
						color: '#449A9D',
					}),
					new ReactRefreshWebpackPlugin({
						overlay: false,
					}),
					new MiniCssExtractPlugin(),
			  ],
		devServer: prod
			? undefined
			: {
					historyApiFallback: true,
					hot: true,
					https: false,
					host: 'localhost',
					open: true,
					port: 3000,
					static: {
						directory: path.join(__dirname, 'src'),
					},
			  },
	};

	return config;
};
