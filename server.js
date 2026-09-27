const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const TARGET = "https://aaaaasilaapi-839f6b7fe1e3.herokuapp.com/";

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
          "aaaaasilaapi-839f6b7fe1e3.herokuapp.com"
        );
      }
    }
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});