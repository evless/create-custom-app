module.exports = function(context) {
    const GULP_LIST = [
        {
            fileName: 'gulpfile.js',
            content: `
const config = require('config');
const gulp = require('gulp');
const path = require('path');
const fs = require('fs');

const TASKS_FOLDER = './tasks/';

// Собираем все таски
const tasks = fs.readdirSync(path.join(__dirname, TASKS_FOLDER)).sort();
tasks.forEach(function (task) {
    let req = require(path.join(__dirname, TASKS_FOLDER, task));
    gulp.task(req.name, req.callback);
});

gulp.task('default', require(path.join(__dirname, TASKS_FOLDER, 'help')).callback);
`
        },
        {
            fileName: 'tasks/clean.js',
            content: `
const config = require('config');
const del = require('del');

module.exports = {
    name: 'clean',
    description: 'Очистка папки с билдом\\\n\\\n',
    callback: function (done) {
        del(config.buildFolder()).then(() => done());
    }
}
`
        },
        {
            fileName: 'tasks/help.js',
            content: `
const gutil = require('gulp-util');
const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'help',
    description: 'Выводит список команд\\\n',
    callback: function (done) {
        let logs = '\u001b[32m\\\n\\\n Gulp commands: \\\n\\\n\u001b[32m';

        const tasks = fs.readdirSync(path.join(__dirname, '..', 'tasks')).sort();
        tasks.forEach(function (task) {
            let req = require(path.join(__dirname, '..', 'tasks', task));
            logs += \`\u001b[36m \${req.name} \u001b[39m \`;
            logs += req.description;
        });

        gutil.log(logs);
    }
}
`
        }
    ];

    const WEBPACK_LIST = [
        {
            fileName: 'webpack.config.js',
            content: `
module.exports = function(env) {
    return require(\`./config / webpack.\${env }.js\`)();
};
`
        },
        {
            fileName: 'webpack/webpack.common.js',
            content: `
const webpack = require('webpack');
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
}
`
        },
        {
            fileName: 'webpack/webpack.dev.js',
            content: `
const Merge = require('webpack-merge');
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
}
`
        },
        {
            fileName: 'webpack/webpack.prod.js',
            content: `
const webpack = require('webpack');
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
}
`
        }
    ];


    return {
        folders: [
            'client/app',
            'client/public/css',
            'client/public/images',
            'client/templates',
            'server/models',
            'server/routers',
            'server/middlewares',
            'config',
            'tasks',
            'webpack'
        ],

        files: [
            {
                fileName: 'config/config.js',
                content: `
const path = require('path');

module.exports = {
    port: 5555,
    root: process.cwd(),
    buildFolderName: 'build',
    html: {
        index: 'index.html',
    },
    buildFolder: function() {
        return path.join(this.root, this.buildFolderName);
    },
    dateFormat: 'DD.MM.YYYY'
};
`
            },
            {
                fileName: 'templates/index.html',
                content: `
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
        <title>Create App</title>
        <base href="/">
    </head>
    <body>
        <div id="body"></div>
    </body>
</html>
`
            },
            {
                fileName: 'index.js',
                content: `
const http = require('http');
const config = require('config');

http.createServer(function(req, res) {
    switch (req.url) {
        case '/':
            res.statusCode = 200;
            res.end('Hellow World!');
            break;
        default:
            res.statusCode = 404;
            res.end('Not Found');
    }
}).listen(config.port);
`
            }
        ],

        prompt: [
            {
                type: 'confirm',
                name: 'gulpfile',
                message: 'Нужна ли поддержка gulp и пример таски для сборки?'
            },
            {
                type: 'confirm',
                name: 'webpack',
                message: 'Нужен ли вам webpack?'
            },
        ],

        promptThen: function(response) {
            if (response.webpack) {
                context.createFolderHandler('webpack');
                context.createFileHandler(WEBPACK_LIST);
            }

            if (response.gulpfile) {
                context.createFolderHandler('tasks');
                context.createFileHandler(GULP_LIST);
            }
        }
    };
};