// const { resolve } = require('path');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: true,
    port: 8080,
    static: path.join(__dirname, 'public'),
  },
};

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: development ? 'source-map' : false,
  entry: {
    index: './src/pages/main/script.js',
    game: './src/pages/game/game.js',
    result: './src/pages/result/result.js',

  },
  output: {
    // clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].[contenthash].js',
    // filename: './js/bundle.js',
    assetModuleFilename: 'assets/[hash][ext]',
  },
  module: {
    rules: [
      // {
      //   test: /\.[tj]s$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(mp3|ogg)$/,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   // title: 'Demo webpack'
    //   template: './src/index.html',
    //   favicon: './src/assets/favicon.ico'
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'main.html',
    //   template: './src/pages/main/main.html',
    //   favicon: "./src/favicon.png",
    //   chunks: ["main"]
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/pages/main/index.html',
      favicon: "./src/favicon.png",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      filename: 'game.html',
      template: './src/pages/game/game.html',
      favicon: "./src/favicon.png",
      chunks: ["game"]
    }),
    new HtmlWebpackPlugin({
      filename: 'result.html',
      template: './src/pages/result/result.html',
      favicon: "./src/favicon.png",
      chunks: ["result"]
    }),
    new MiniCssExtractPlugin({
      filename: './[name].css'
      // filename: './css/[name].css'
      // filename: '[name].[contenthash].css'
    }),
    // new CopyPlugin({
    //   patterns: [
    //     // {from: './public',}
    //     // { from: './public', to 'dir' },
    //     // noErrorOnMissing: true,
    //     // { from: './src/assets/quotes/*.json', to: './assets/quotes/[name][ext]' },
    //     // { from: './src/assets/sounds/*.mp3', to: './assets/sounds/[name][ext]' },
    //   ],
    // }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  ...devServer(development),
});