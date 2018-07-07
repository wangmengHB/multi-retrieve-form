let path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')


module.exports = {
    mode: 'development',
    watch: true,
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    context: path.resolve(__dirname),
    entry: {
        app: path.join(__dirname, './src/index.jsx')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'multi retrieve form',
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'none',
    devServer: {
        clientLogLevel: 'warning',
        hot: true,
        contentBase: false, 
        compress: true,
        host: 'localhost',
        port: 8080,
        open: false,
        overlay: { 
            warnings: false, 
            errors: true 
        },
        // publicPath: config.dev.assetsPublicPath,
        // proxy: config.dev.proxyTable,
        // quiet: true, // necessary for FriendlyErrorsPlugin
        // watchOptions: {
        //     poll: config.dev.poll,
        // }
    },
}