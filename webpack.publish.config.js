var webpack=require("webpack");
var path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    entry:{
        app:path.resolve(__dirname,'src/app.js'),
        vendors:['angular','bootstrap','angular-ui-router','jquery']
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    },
    module:{
        loaders:[
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015','stage-0','stage-1','stage-2','stage-3']
                }
            },
            {
                test:/\.html$/,
                loader:'raw'
            },
            {
                test:/\.css$/,
                loader:'style!css'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.(gif|jpg|png|woff|woff2|svg|eot|ttf)$/,
                loader: 'url?limit=25000&name=img/[name].[ext]'
            }
        ]
    },
    resolve:{
        extensions: ['', '.js', '.json', '.scss'],
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            htmlWebpackPlugin: {
                "files": {
                    "css": ["app.css"],
                    "js": ["bundle.js", "vendors.js"]
                }
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.ProvidePlugin({
          $:"jquery",
          jQuery:"jquery",
          "window.jQuery":"jquery"
        })
    ]
}