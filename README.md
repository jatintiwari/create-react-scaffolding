# Create React Scaffolding

```sh
npm install -g create-react-scaffolding myapp
```

## current versions 
  - `react` => 16.1.0, 16.0.0
  - `redux` => 4.0.0, 3.7.1
  - `react` => 16.0.0, 16.1.0
  - `redux` => 3.7.1, 4.0.0
  - `redux-logger` => 3.0.6
  - `redux-thunk` => 2.2.0
  - `react-dom` => 16.3.2
  - `webpack` => 3.11.0, 4.8.3
  - `webpack-dev-server` => 3.1.4
  - `webpack-cli` => 2.1.3
  - `path` => 0.12.7
  - `react-router-dom` => 4.2.2
  - `react-redux` => 5.0.7
  - `express` => 4.16.3
  - `ejs` => 2.6.1
  - `babel-core` => 6.26.3
  - `babel-jest` => 22.4.3
  - `babel-loader` => 7.1.4
  - `babel-preset-env` => 1.6.1
  - `babel-preset-react` => 6.24.1

## Folder structure
  ```
    myapp
      |- dist
      |- src
          |- css
          |- images
          |- js
              |- actions
              |- components
              |- reducers
              |- store
              |- index.js
      |- views
      |- package.json
      |- index.js (express server config)
      |- README.md
      |- webpack.config.js
  ```

### `npm start`
```
  webpack-dev-server
```

### `npm run dev`
```
  webpack --watch
```

- package.json
  - `preferGlobal` indicates that the module is designed to be installed globally, otherwise there will be a warning.
  - `bin` entry adds a mapping between the command used in terminal and the actual JavaScript file that will be run each time this command is invoked
  - `npm link` to symlink the script to `/user/local/bin/create-react-scaffolding`
