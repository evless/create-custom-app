import path from 'path';
import fs from 'fs';

import parseSchema from './utils/parseSchema';

import * as SCHEMA_NAME from './constans/schemaName';
import * as FILE_NAME from './constans/fileName';
// import optimist from 'optimist';

// optimist
//     .usage('LALALAL')
//     .describe('help', 'prints WebdriverIO help menu')
//     .alias('help', 'h');

import inquirer from 'inquirer';

inquirer
    .prompt([
        {
            type: 'list',
            name: 'schemaName',
            message: 'Selected type app:',
            choices: [
                SCHEMA_NAME.WDIO,
                SCHEMA_NAME.FRONT_BACK,
                // SCHEMA.CUSTOM
            ]
        },
        {
            type: 'confirm',
            name: 'files',
            message: 'Include config files(.gitignore, .babelrc, ...)?'
        },
        {
            type: 'checkbox',
            name: 'configsList',
            message: 'Selected files:',
            choices: [
                FILE_NAME.BABELRC,
                FILE_NAME.GITIGNORE,
                FILE_NAME.ESLINTRC,
                FILE_NAME.README,
                FILE_NAME.NPMIGNORE,
                FILE_NAME.GULPFILE,
                FILE_NAME.WEBPACK
            ],
            when: (response) => !!response.files
        },
        {
            type: 'confirm',
            name: 'package',
            message: 'Include package.json?'
        },
        {
            type: 'input',
            name: 'npm',
            message: function() {
                return 'Будут установлены пакеты, хотите какие-то еще?';
            }
        },
        {
            type: 'input',
            name: 'customSchema',
            message: 'Укажите абсолютный путь до JSON схемы:',
            validate(input) {
                let done = this.async();

                fs.access(input, (err, fd) => {
                    if (err) {
                        if ('ENOENT' === err.code) {
                            done('ENOENT: no such file or directory');
                        } else {
                            done(err.code);
                        }
                    }

                    done(null, true);
                });
            },
            when: (response) => SCHEMA_NAME.CUSTOM === response.schemaName
        }
    ])
    .then(response => parseSchema(response));

