const path = require('path');

module.exports = {
  entry: './src/content.js', // Your main content script
  output: {
    filename: 'bundle.js', // The output bundle file
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
