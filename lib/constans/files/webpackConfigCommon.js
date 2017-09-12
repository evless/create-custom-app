const webpackConfigCommon = `const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    context: path.join(__dirname, '..', 'client'),
    entry: {
        index: './app/app.js',
        vendor: [
            'angular',
            'angular-route'
        ]
    },
    output: {
        path: path.join(__dirname, '..', 'build'),
        filename: '[name].js'
    },
    resolve: {
        modules: ['bower_components', 'node_modules']
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: './templates/index.html',
            showErrors: true,
            chunks: ['vendor', 'index']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        })
    ],
    module: {
        rules: [
            {
                test: /\.(pcss|css)$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: { minimize: true }
                }, 'postcss-loader']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(jsx|js)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: 'file-loader'
            }
        ]
    }
}`;

export default webpackConfigCommon;