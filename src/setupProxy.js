const proxy = require('http-proxy-middleware');

module.exports = app => {
	app.use(
		'/api',
		proxy({
			target: 'https://conduit.productionready.io',
			changeOrigin: true,
		})
	);
};
