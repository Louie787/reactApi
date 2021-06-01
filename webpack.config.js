const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, './web'),
        compress: true,
        port: process.env.WEBPACK_DEV_SERVER_PORT || 3000,
        disableHostCheck: true,
        historyApiFallback: true,
    },
    entry: path.join(__dirname, './index.js'),
    output: {
        path: path.join(__dirname, './'),
        publicPath: '/',
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: [".js", ".jsx"]
                },
                use: {
                    loader: "babel-loader"
                }
            },
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: './node_modules/@tonclient/lib-web/tonclient.wasm' }],
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: true,
        }),

    ],

}
