const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://e8b6-188-130-155-154.ngrok-free.app',
            changeOrigin: true,
        })
    );
    app.use(
        '/media',
        createProxyMiddleware({
            target: 'https://e8b6-188-130-155-154.ngrok-free.app',
            changeOrigin: true,

        })
    )
};