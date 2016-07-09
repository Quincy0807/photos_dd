const path = require('path')
const fs = require('fs')
const package_json = JSON.parse(fs.readFileSync('package.json'))
const babel_opts = package_json.babel
const autoprefixer = require('autoprefixer')

let config = {
  entry: {
    upload: path.resolve(__dirname,'build/js/upload.js'),
    photos: path.resolve(__dirname,'build/js/photos.js'),
    index: path.resolve(__dirname,'build/js/index.js'),
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
        loaders: ['style', 'css', 'postcss', 'sass']
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
  postcss: function(){
    return [autoprefixer]
  },
  babel: babel_opts,
}

module.exports = config
