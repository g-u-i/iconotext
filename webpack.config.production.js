import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import baseConfig from './webpack.config.base';

const config = {
  ...baseConfig,

  devtool: 'source-map',

  entry: './src/app',

  output: {
    ...baseConfig.output,

    publicPath: '../dist/',
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
    }),
    new ExtractTextPlugin('style.css', { allChunks: true }),
  ],

  target: 'electron-renderer',
};

export default config;
