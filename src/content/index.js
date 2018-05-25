exports.gitIgnore = `node_modules/`
exports.imports = {
  react: `import React from 'react';`
};
exports.defaults = {
  js: `/**\n* @create-react-scaffolding\n*/`,
  css: `/* @create-react-scaffolding */`,
  webpackConfig:`module.exports = {
    mode: process.env.NODE_ENV ? "production": "development", 
    entry: "./src/js/index.js",   
    devServer: {
      historyApiFallback: true
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
        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
      }
    },
    devtool: "source-map",   
    context: __dirname,   
    target: "web",   
  }`
}
