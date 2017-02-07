var path=require('path')
var webpack=require("webpack");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports={
    entry:[
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:3001',
        path.resolve(__dirname,'src/app.js')
    ],
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
        new OpenBrowserPlugin({ url: 'http://localhost:3001',browser:"chrome" }),
        new webpack.ProvidePlugin({
          $:"jquery",
          jQuery:"jquery",
          "window.jQuery":"jquery"
        })
    ]
}