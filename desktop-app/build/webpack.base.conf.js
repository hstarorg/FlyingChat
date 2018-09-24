const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const util = require('./util');

function genarateCssLoader(test, lang, options) {
  const appendLoaders = lang === 'css' ? [] : [{ loader: `${lang}-loader`, options: options || {} }];
  return {
    test,
    use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', ...appendLoaders]
  };
}

module.exports = {
  entry: {
    bundle: './src/index.ts'
  },
  resolve: {
    extensions: ['.js', '.ts', '.html']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['awesome-typescript-loader', 'angular2-template-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      },
      genarateCssLoader(/\.css$/, 'css'),
      genarateCssLoader(/\.less$/, 'less')
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core/, util.root('src')),
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    })
  ],
  output: {
    filename: 'bundle.js',
    path: util.root('dist')
  }
};
