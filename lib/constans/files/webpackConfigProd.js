const webpackConfigProd = `const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function(env) {
    return Merge(CommonConfig, {
        output: {
            path: path.join(__dirname, '..', 'build'),
            filename: '[name].[hash].js'
        },
        plugins: [
            new CleanWebpackPlugin(['build'], {
                root: path.join(__dirname, '..')
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    });
}`;

export default webpackConfigProd;