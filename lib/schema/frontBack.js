import indexServer from '../constans/files/indexServer';
import serverConfig from '../constans/files/serverConfig';
import indexHTML from '../constans/files/indexHtml';

module.exports = function(methods) {
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
        ],

        files: [
            {
                fileName: 'config/config.js',
                content: serverConfig
            },
            {
                fileName: 'server/index.js',
                content: indexServer
            },
            {
                fileName: 'client/templates/index.html',
                content: indexHTML
            }
        ]
    };
};