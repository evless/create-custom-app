export const WEBPACK_DEV_TASK = {
    fileName: 'client.webpack.dev.js',
    content: `
const config = require('config');
const webpack = require('webpack');
const gutil = require('gulp-util');

module.exports = {
    name: 'client:webpack:dev',
    description: 'Собирает клиентскую часть в режиме разработки и запускает вотчер\\\n',
    callback: function (done) {
        let options = {
            watch: true,
            watchoptions: {
                aggregateTimeout: 100
            }
        };

        webpack(Object.assign(require('../webpack.config'), options), (err, stats) => {
            if (err) throw new gutil.PluginError(\"webpack\", err);
            gutil.log(\"[webpack:build-dev]\", stats.toString({
                chunks: false,
                    colors: true
            }));
        });
    }
}
`
};

export const WEBPACK_PROD_TASK = {
    fileName: 'client.webpack.prod.js',
    content: `
const config = require('config');
const webpack = require('webpack');
const gutil = require('gulp-util');

module.exports = {
    name: 'client:webpack:prod',
    description: 'Собирает клиентскую часть в для продакшн\\\n\\\n',
    callback: function (done) {
        let options = {

        };

        webpack(Object.assign(require('../webpack.config'), options), (err, stats) => {
            if (err) throw new gutil.PluginError(\"webpack\", err);
            gutil.log(\"[webpack:build-prod]\", stats.toString({
                chunks: false,
                    colors: true
            }));
            done();
        });
    }
}
`
};

export const DEV_TASK = {
    fileName: 'dev.js',
    content: `
const gutil = require('gulp-util');
const sequence = require('gulp-sequence');

module.exports = {
    name: 'dev',
    description: 'Developers сборка, включает в себя сборку статики, сервера и навешивания на них вотчеров\\\n',
    callback: function (done) {
        sequence('clean', ['server:start:dev', 'client:webpack:dev'], () => {
            done();
        });
    }
}
`
};

export const PROD_START_TASK = {
    fileName: 'prod.start.js',
    content: `
const gutil = require('gulp-util');
const sequence = require('gulp-sequence');

module.exports = {
    name: 'prod:start',
    description: 'Production cборка, включает сборку статики, сервера, запуск БД\\\n',
    callback: function(done) {
        sequence('clean', 'client:webpack:prod', 'db:start', 'server:start:prod', () => {
            done();
        });
    }
}
`
};

export const PROD_STOP_TASK = {
    fileName: 'prod.stop.js',
    content: `
const gutil = require('gulp-util');
const sequence = require('gulp-sequence');

module.exports = {
    name: 'prod:stop',
    description: 'Production cборка, останавливает сервер и БД\\\n\\\n',
    callback: function(done) {
        sequence('clean', 'db:stop', 'server:stop:prod', () => {
            done();
        });
    }
}
`
};


export const SERVER_START_DEV_TASK = {
    fileName: 'server.start.dev.js',
    content: `
const config = require('config');
const nodemon = require('gulp-nodemon');

module.exports = {
    name: 'server:start:dev',
    description: 'Запуск сервера в режиме разработки с вотчером\\\n',
    callback: function(done) {
        nodemon({
            nodeArgs: ['--debug'],
            watch: ['server/*'],
            script:   'server/index.js'
        });
    }
}
`
};

export const SERVER_START_PROD_TASK = {
    fileName: 'server.start.prod.js',
    content: `
const config = require('config');
const exec = require('child_process').exec;

module.exports = {
    name: 'server:start:prod',
    description: 'Запуск сервера в режиме продакшена\\\n',
    callback: function(done) {
        exec('NODE_ENV=production node_modules/forever/bin/forever start server/index.js --minUptime 1000 --spinSleepTime 1000', (err, stdout, stderr) => {
            console.log(stdout)
            console.log(stderr)
            done(err)
        })
    }
}
`
};


export const SERVER_RESTART_TASK = {
    fileName: 'server.restart.js',
    content: `
const config = require('config');
const exec = require('child_process').exec;

module.exports = {
    name: 'server:restart',
    description: 'Рестарт сервера\\\n',
    callback: function(done) {
        exec('node_modules/forever/bin/forever restart server/index.js', (err, stdout, stderr) => {
            console.log(stdout)
            console.log(stderr)
            done(err)
        })
    }
}
`
};

export const SERVER_STOP_PROD_TASK = {
    fileName: 'server.stop.prod.js',
    content: `
const config = require('config');
const exec = require('child_process').exec;

module.exports = {
    name: 'server:stop:prod',
    description: 'Останавливает сервер\\\n',
    callback: function(done) {
        exec('node_modules/forever/bin/forever stop server/index.js', (err, stdout, stderr) => {
            console.log(stdout)
            console.log(stderr)
            done(err)
        });
    }
}
`
};