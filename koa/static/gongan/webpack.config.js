var wenpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin")

// webpack.base.conf.js
module.exports = {
    entry: {
        // 写多个入口，每个入口实例化 new Vue({ el: '#app' })
        index: __dirname + '/all.js',
        login: __dirname + '/login.js'
    },
    output: {
        path: __dirname + "/dist",
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    
                }
            },
           
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'auto',
            // 关键的是这里，配置这个html 包含 login 相关的模块
            chunks: ['manifest', 'vendor', 'login'],
        }),
        new HtmlWebpackPlugin({
            filename: 'all.html',
            template: './all.html',
            inject: true,
            chunks: ['manifest', 'vendor', 'all'],
            chunksSortMode: 'dependency',
        }),

    ],


}