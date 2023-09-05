const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // generate HTML file with injected scripts
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),

      // generate manifest.json file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'PWA Text Editor',
        short_name: 'Text Editor',
        description: 'A text editor Progressive Web Application',
        start_url: '/',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        icons: [
          {
            src: path.resolve('src/icons/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),

      // generate a service worker using Workbox
      new InjectManifest({
        swRc: './src/service-worker.js',
      }),
    ],

    module: {
      rules: [
        // configure CSS loaders and Babel
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],            },
          },
        },
      ],
    },
  };
};
