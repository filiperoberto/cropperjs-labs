module.exports = {
	proxy: {
		'/api/*': 'http://url.of.prod.api/',
	},
	app: '/index.html'
};