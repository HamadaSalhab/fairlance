const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://194.67.78.162:8000',
            changeOrigin: true,
        })
    );
    app.use(
        '/media',
        createProxyMiddleware({
            target: 'http://194.67.78.162:8000',
            changeOrigin: true,

        })
    )
};