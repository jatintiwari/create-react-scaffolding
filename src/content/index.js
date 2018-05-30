const appName = process.argv[2] ||  "myapp";

exports.gitIgnore = `node_modules/`
exports.imports = {
  react: `import React from "react";`
};
exports.defaults = {
  js: `/**\n* @${appName}\n*/`,
  css: `/* @${appName} */`,
  helloReact: `import React from "react";\nimport ReactDOM from "react-dom";\nReactDOM.render(<div>${appName}</div>, document.getElementById("root"));`,
  views: {
    index: `
    <html>
    <head>
      <title>${appName}</title>
    </head>
    <body>
      <div id="root"></div>
      <script src="/bundle.js"></script>
    </body>
  </html>
  `
  },
  serverIndex: `/**
  * dependencies
  */
  const express = require("express");
  const ejs = require("ejs");
  const path = require("path");
  
  /**
    * express
    */
  const app = express();
  
  
  /**
    * constants
    */
  app.set("port", (process.argv[2] || 3000));
  app.set("view engine", "ejs");
  app.set("views", __dirname + "/views");
  app.engine("html", ejs.renderFile);
  
  /**
    * routes
    */
  app.use("/bundle.js", function (req, res, next) {
    res.sendFile(path.join(__dirname, "dist", "bundle.js"));
  });
  
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
      .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Accept, Content-Type");
    next();
  })

  app.use("/api/*", function (req, res, next) {
    res.status(200).send({ message: "YOLO!" });
  });
  
  app.use("/", function (req, res, next) {
    res.render("index.html", {});
  });
  
  app.listen(app.get("port"), function () {
    console.log("Express server is up on port 3000");
  });`,
  webpack4Config: `
  const path = require("path");

  module.exports = {
    mode: process.env.NODE_ENV ? "production": "development", 
    entry: "./src/js/index.js",   
    devServer: {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, "views")
    },
    output: {
      path: path.resolve(__dirname, "dist"), 
      filename: "bundle.js", 
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          include: [
            path.resolve(__dirname, "src")
          ],
          exclude: [
            path.resolve(__dirname, "node_modules")
          ],
          loader: "babel-loader",
          options: {
            presets: ["env", "react"]
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        }
      ]
    },
    resolve: {
      modules: [
        "node_modules",
      ],
      extensions: [".js", ".json", ".jsx", ".css"],
    },
    performance: {
      hints: "warning", 
      maxAssetSize: 200000, 
      maxEntrypointSize: 400000, 
      assetFilter: function (assetFilename) {  
        return assetFilename.endsWith(".css") || assetFilename.endsWith(".js");
      }
    },
    devtool: "source-map",   
    context: __dirname,   
    target: "web",   
  }`
}
