### Angular CLI custom webpack config :tada:

1. Install plugin _`webpack-notifier`_
   > `npm install @angular-builders/custom-webpack`

```javascript
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.gql', '.graphql'],
    modules: [path.resolve(__dirname), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  },
  plugins: [
    new WebpackNotifierPlugin({
      alwaysNotify: true,
      title: 'Akita'
    })
  ]
};
```

2. Installation and configuration

- > `npm install @angular-builders/custom-webpack`

###[Link github for guide](https://github.com/just-jeb/angular-builders/tree/master/packages/custom-webpack) :rocket: :rocket: :rocket:

- Inside **`angular.json`** file

```json
"serve": {
    "builder": "@angular-builders/custom-webpack:dev-server",
    "options": {
    "browserTarget": "my-app:build",
    "customWebpackConfig": {
        "path": "./webpack.config.js"
    }
    },
    "configurations": {
    "production": {
        "browserTarget": "my-app:build:production"
    }
    }
},
```

- This is a content when start with `dev` mode. Insted, if you want use with `pro` mode, please do the same as above (`dev` mode)

3. Create `@types` folder and **`graphql.d.ts`** file

```typescript
declare module '*.graphql' {
  import { DocumentNode } from 'graphql';
  const value: {
    [key: string]: DocumentNode;
  };
  export = value;
}
```

> This enables us to import graphql files, which is used to communicate with the graphql server
