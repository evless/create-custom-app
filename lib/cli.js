import path from 'path';
import fs from 'fs';

import parseSchema from './utils/parseSchema';

import * as SCHEMA from './constans/schemaName';
import * as FILE from './constans/fileName';
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
            message: 'Выберите тип приложения:',
            choices: [
                SCHEMA.WDIO_CUCUMBER,
                SCHEMA.FRONT_BACK,
                SCHEMA.CUSTOM
            ]
        },
        {
            type: 'confirm',
            name: 'webpack',
            message: 'Нужен ли вам webpack?',
            when: (response) => SCHEMA.FRONT_BACK === response.schemaName
        },
        {
            type: 'confirm',
            name: 'webpackConfig',
            message: 'Нужен ли вам готовый конфиг для webpack?',
            when: (response) => !!response.webpack
        },
        {
            type: 'confirm',
            name: 'files',
            message: 'Хотите произвести настройку дополнительных файлов?'
        },
        {
            type: 'checkbox',
            name: 'fileList',
            message: 'Выберите из списка файлы, которые вам нужны:',
            choices: [
                FILE.BABELRC,
                FILE.GITIGNORE,
                FILE.ESLINTRC,
                FILE.README,
                FILE.PACKAGE
            ],
            when: (response) => !!response.files

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
            when: (response) => SCHEMA.CUSTOM === response.schemaName
        }
    ])
    .then(response => parseSchema(response));

