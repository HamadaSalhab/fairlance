const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://3897-188-130-155-162.ngrok-free.app',
            changeOrigin: true,
        })
    );
    app.use(
        '/media',
        createProxyMiddleware({
            target: 'https://3897-188-130-155-162.ngrok-free.app',
            changeOrigin: true,

        })
    )
};