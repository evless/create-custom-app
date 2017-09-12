const gulpConfig = `const config = require('config');
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

gulp.task('default', require(path.join(__dirname, TASKS_FOLDER, 'help')).callback);`

export default gulpConfig;