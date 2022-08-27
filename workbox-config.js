module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{tsx,css,ts,js}'
	],
	swDest: 'src/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};