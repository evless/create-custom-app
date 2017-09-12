const webpackConfigDev = `const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const path = require('path');

module.exports = function(env) {
    return Merge(CommonConfig, {
        devServer: {
            contentBase: path.join(__dirname, '..', 'build'),
            historyApiFallback: true,
            port: 7676
        }
    });
}`;

export default webpackConfigDev;