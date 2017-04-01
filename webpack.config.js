const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Copy = require('copy-webpack-plugin')
const webpack = require('webpack')
const outputSrc = path.resolve(__dirname, 'dist')

const hotReplacement = new webpack.HotModuleReplacementPlugin()

const assetDir = path.resolve(__dirname, './asset')

let asset = new Copy([
    {
        from: assetDir,
        to: outputSrc + '/asset'
    }
])

let html = new HtmlWebpackPlugin({
    title: 'test',
    template: 'template.html'
})

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: outputSrc
    },
    resolve: {
        extensions: ['.js', '.less', '.html'],
        alias: {
            '@': path.resolve('src'),
            'variable$': path.resolve('asset/styles/var/index.less')
        }
    },
    plugins: [
        html,
        asset,
        hotReplacement
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },   
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: outputSrc,
        hot: true,
        inline: true,
        port: 3000
    },
    devtool: '#source-map'
}