const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const config = {
  name: 'webpack-config',
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-cheap-source-map' : 'hidden-source-map',
  entry: {
    app: './src/index.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json', 'css'],
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      context: path.resolve(__dirname, 'src/context'),
      library: path.resolve(__dirname, 'src/library'),
      modules: path.resolve(__dirname, 'src/modules'),
      pages: path.resolve(__dirname, 'src/pages'),
      styles: path.resolve(__dirname, 'src/styles'),
    },
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: isDevelopment ? '[name].[chunkhash].js' : '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          env: {
            development: {
              plugins: [
                ['styled-components', { sourceMap: true }],
                require.resolve('react-refresh/babel'),
              ],
            },
            production: {
              plugins: ['styled-components'],
            },
          },
          plugins: [
            'react-refresh/babel',
            '@babel/plugin-syntax-dynamic-import',
          ],
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css?$/,
        use: [
          !isDevelopment ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'assets/[name].[ext]?[hash]',
            limit: 25000,
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    removeEmptyChunks: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: isDevelopment ? 'development' : 'production',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 8080,
    contentBase: path.join(__dirname, '/dist'),
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
    disableHostCheck: true,
    index: 'index.html',
    open: true,
    hot: true,
    compress: true,
    inline: true,
    overlay: true,
    stats: 'errors-only',
  },
};

if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
  config.plugins.push(new CleanWebpackPlugin());
  config.plugins.push(new webpack.ProgressPlugin());
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.png',
    }),
  );
  config.plugins.push(
    new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: true }),
  );
}
if (!isDevelopment && config.plugins) {
  config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
  config.plugins.push(new CleanWebpackPlugin());
  config.plugins.push(
    new MiniCssExtractPlugin({ filename: 'styles/[name].css' }),
  );
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.png',
    }),
  );
}

module.exports = config;
