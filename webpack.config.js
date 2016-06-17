const path = require('path')
const fs = require('fs')
const package_json = JSON.parse(fs.readFileSync('package.json'))
const babel_opts = package_json.babel

let config = {
  entry: {
    upload: path.resolve(__dirname,'build/js/upload.js')
  },
  output:{
    path: 'js',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_mudules/,
        loader: 'babel',
      },{
        test: /\.json$/,
        loader: 'json',
        exclude: /node_mudules/
      },{
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },{
        test: /\.css$/,
        loaders: ['style', 'css']
      },{
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },{
        test: /\.vue$/,
        loader: 'vue'
      },{
        test: /\.jade$/,
        loader: 'jade'
      },
    ]
  },
  babel: babel_opts,
}

module.exports = config
