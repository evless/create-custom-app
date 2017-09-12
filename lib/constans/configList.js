import * as FILE from './fileName';

import webpackConfig from './files/webpackConfig';
import webpackConfigCommon from './files/webpackConfigCommon';
import webpackConfigDev from './files/webpackConfigDev';
import webpackConfigProd from './files/webpackConfigProd';

import gulpConfig from './files/gulpConfig';
import gulpConfigClean from './files/gulpConfigClean';
import gulpConfigHelp from './files/gulpConfigHelp';

export default {
    [FILE.BABELRC]: {
        files: [{
            fileName: '.babelrc',
            content: '{"presets": ["stage-0"]}'
        }],
        npmList: ['babel-cli', 'babel-preset-stage-0']
    },

    [FILE.ESLINTRC]: {
        files: [
            {
                fileName: '.eslintrc',
                content: '{}'
            }
        ],
        npmList: ['eslint']
    },

    [FILE.GITIGNORE]: {
        files: [
            {
                fileName: '.gitignore',
                content: 'node_modules'
            }
        ]
    },

    [FILE.NPMIGNORE]: {
        files: [
            {
                fileName: '.npmignore',
                content: 'node_modules'
            }
        ],
    },

    [FILE.README]: {
        files: [
            {
                fileName: 'README.md',
                content: '# Name App'
            }
        ],
    },

    [FILE.GULPFILE]: {
        files: [
            {
                fileName: 'gulpfile.js',
                content: gulpConfig
            },
            {
                fileName: 'tasks/clean.js',
                content: gulpConfigClean
            },
            {
                fileName: 'tasks/help.js',
                content: gulpConfigHelp
            }
        ],
        folders: ['tasks']
    },

    [FILE.WEBPACK]: {
        files: [
            {
                fileName: 'webpack.config.js',
                content: webpackConfig
            },
            {
                fileName: 'webpack/webpack.common.js',
                content: webpackConfigCommon
            },
            {
                fileName: 'webpack/webpack.dev.js',
                content: webpackConfigDev
            },
            {
                fileName: 'webpack/webpack.prod.js',
                content: webpackConfigProd
            }
        ],
        folders: ['webpack']
    },
};