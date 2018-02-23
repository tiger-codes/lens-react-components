module.exports = {
  entry: './demo/index.js',
  output: {
       path:__dirname+ '/lib/',
       filename: 'bundle.js',
       publicPath: '/lib'
   },
  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 9090
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ],
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    }
    ]
  }
};
