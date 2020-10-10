const path = require('path');

module.exports = (env, { mode }) => ({
  entry: { app: './src/index.tsx' },
  output: {
    path: path.resolve(__dirname, 'dist', 'assets', 'built'),
    filename: 'app.js',
    publicPath: '/assets/built/'
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    compress: true,
    port: 3000
  },
  devtool: mode === 'development' ? 'source-map' : false,
  plugins: []
});
