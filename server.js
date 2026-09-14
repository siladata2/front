const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const TARGET = "https://aaaasilamin-0ac06c45a8b6.herokuapp.com";

app.use(
  "/",
  createProxyMiddleware({
    target: TARGET,
    changeOrigin: true,
    secure: true,

    on: {
      proxyReq: (proxyReq) => {
        proxyReq.setHeader(
          "Host",
          "aaaasilamin-0ac06c45a8b6.herokuapp.com"
        );
      }
    }
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});