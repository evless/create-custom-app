const gulpConfigClean = `const config = require('config');
const del = require('del');

module.exports = {
    name: 'clean',
    description: 'Очистка папки с билдом\\\n\\\n',
    callback: function (done) {
        del(config.buildFolder()).then(() => done());
    }
}`;

export default gulpConfigClean;