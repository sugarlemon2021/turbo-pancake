// Generated using webpack-cli https://github.com/webpack/webpack-cli

import os from 'os';
import path from 'path';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack, { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const isProduction = process.env.NODE_ENV === 'production';

const config: Configuration = {
  entry: ['react-hot-loader/patch', './src/index.tsx'],
  output: {
    filename: isProduction ? 'js/bundle.[fullhash].js' : 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: !isProduction,
      eslint: {
        files: 'src/**/*.ts?(x)',
        options: {
          cache: true,
          cacheLocation: 'node_modules/.cache/.eslintcache'
        }
      },
      issue: {
        exclude: {
          severity: 'warning'
        }
      }
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html'
    })
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: 'node_modules/.cache/cache-loader'
            }
          },
          {
            loader: 'thread-loader',
            options: {
              workers: os.cpus().length - 1
            }
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: ['/node_modules/']
      },
      {
        test: /\.css$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                exportLocalsConvention: 'camelCase',
                localIdentName: isProduction ? '[hash:base64:5]' : '[local]__[hash:base64:5]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-normalize', 'tailwindcss', 'autoprefixer']
              }
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset'
      }
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  },
  optimization: { minimizer: [new CssMinimizerPlugin(), '...'] },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  context: __dirname
};

if (!(config.plugins && config.resolve)) {
  //
} else if (isProduction) {
  config.mode = 'production';
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'css/style.[fullhash].css'
    })
  );
  config.plugins.push(new CopyWebpackPlugin({ patterns: [{ from: 'public' }] }));
} else {
  config.mode = 'development';
  config.devServer = {
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    port: 8090
  };
  config.devtool = 'eval-source-map';
  config.resolve.alias = {
    'react-dom': '@hot-loader/react-dom'
  };
}

export default config;
