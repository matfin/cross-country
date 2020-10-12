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
      'react-dom': '@hot-loader/react-dom',
      'components': path.resolve(__dirname, 'src/components'),
      'hooks': path.resolve(__dirname, 'src/hooks'),
      'models': path.resolve(__dirname, 'src/models'),
      'services': path.resolve(__dirname, 'src/services'),
      'styles': path.resolve(__dirname, 'src/styles'),
      'utils': path.resolve(__dirname, 'src/utils'),
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
