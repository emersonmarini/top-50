module.exports = {
	presets: [
		'@babel/preset-env',
		[
			'@babel/preset-react',
			{
				runtime: 'automatic',
				development: process.env.BABEL_ENV === 'development',
			},
		],
		'@babel/preset-typescript',
	],
	plugins: [
		['@babel/plugin-transform-runtime'],
		[
			'formatjs',
			{
				messagesDir: './dist/messages/',
				workspaceRoot: __dirname,
			},
		],
	],
	env: {
		development: {
			plugins: ['react-refresh/babel'],
		},
		production: {
			plugins: [
				'transform-react-remove-prop-types',
				'@babel/plugin-transform-react-constant-elements',
				'@babel/plugin-transform-react-inline-elements',
			],
		},
	},
};
