const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://f604-188-130-155-154.ngrok-free.app', // Sarhan
      changeOrigin: true,
    }),
  );
  app.use(
    '/media',
    createProxyMiddleware({
      target: 'https://f604-188-130-155-154.ngrok-free.app', // Sarhan
      changeOrigin: true,
    }),
  );
};
