const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/user",
    createProxyMiddleware({
      target: "http://localhost:8080/user",
      changeOrigin: true,
    })
  );
  // app.use(
  //   "/",
  //   createProxyMiddleware({
  //     target: "http://localhost:8080/",
  //     changeOrigin: true,
  //   })
  // );
};
