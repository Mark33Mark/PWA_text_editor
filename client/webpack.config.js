const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      bundle: path.resolve(__dirname, 'src/js/index.js'),
      install: './src/js/install.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name][contenthash].js',
      clean: true,
      assetModuleFilename: '[name][ext]',
    },

    devtool: 'source-map',
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      port: 3000,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
    },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'J.A.T.E. | a persisting text editor',
      filename: 'index.html',
      template: './src/template.html',
      favicon: "./favicon.ico",
    }),
    
    new BundleAnalyzerPlugin(),

    new InjectManifest({
      swSrc: "./src-sw.js",
      swDest: "./src-sw.js",
    }),

    new WebpackPwaManifest({
      fingerprints: false,
      inject: true,
      name: 'Just Another Text Editor',
      short_name: 'J.A.T.E.',
      description: 'A text editor with JavaScript syntax highlighting.',
      start_url: '/',
      publicPath: '/',
      background_color: '#225ca3',
      theme_color: '#225ca3',
      crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],
    
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              "@babel/plugin-proposal-object-rest-spread", 
              "@babel/transform-runtime",
            ],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  };
};