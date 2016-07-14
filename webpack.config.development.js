/* eslint max-len: 0 */
import webpack from 'webpack';
import baseConfig from './webpack.config.base';

const config = {
  ...baseConfig,

  debug: true,

  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    './src/app',
  ],

  output: {
    ...baseConfig.output,
    publicPath: 'http://localhost:3000/dist/',
    library: 'app',
  },

  module: {
    ...baseConfig.module,
    loaders: [
      ...baseConfig.module.loaders,

      {
        test: /\.(eot|woff2?|ttf|svg)(#.*)?(\?.*)?$/,
        loader: 'file',
      },

      {
        test: /\.(less|css)$/,
        loaders: [
          'style',
          'css',
          'less-loader',
        ],
      },
    ],
  },

  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],

  target: 'electron-renderer',
};

export default config;
