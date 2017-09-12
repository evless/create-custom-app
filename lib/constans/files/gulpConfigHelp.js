const gulpConfigHelp = `const gutil = require('gulp-util');
const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'help',
    description: 'Выводит список команд\\\\n',
    callback: function (done) {
        let logs = '\u001b[32m\\\\n\\\\n Gulp commands: \\\\n\\\\n\u001b[32m';

        const tasks = fs.readdirSync(path.join(__dirname, '..', 'tasks')).sort();
        tasks.forEach(function (task) {
            let req = require(path.join(__dirname, '..', 'tasks', task));
            logs += \`\u001b[36m \${req.name} \u001b[39m \`;
            logs += req.description;
        });

        gutil.log(logs);
    }
}`;

export default gulpConfigHelp;