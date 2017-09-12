const serverConfig = `const path = require('path');

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
};`;

export default serverConfig;