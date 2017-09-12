import fs from 'fs';
import inquirer from 'inquirer';
import chalk from 'chalk';

import createFolderHandler from '../helpers/createFolderHandler';
import createFileHandler from '../helpers/createFileHandler';
import command from '../helpers/command';

import configList from '../constans/configList';
import * as SCHEMA_NAME from '../constans/schemaName';

export default function(options, config, response = {}) {
    let files = response.files || [];
    let folders = response.folders || [];
    let npmList = [];
    
    if (options.configsList)
        options.configsList.map(fileName => {
            files = files.concat(configList[fileName].files || []);
            npmList = npmList.concat(configList[fileName].npmList || []);
            folders = folders.concat(configList[fileName].folders || []);
        });

    createFolderHandler(config.folders.concat(folders));
    createFileHandler(config.files.concat(files));

    command('npm', ['init', '-y'], '')
        .then(res => {
            return npmList
                .reduce((prev, packageName) => {
                    return prev.then(result => {
                        return command('npm', ['install', packageName, '--save-dev']);
                    });
                }, Promise.resolve());
        })
        .then(res => {
            if (SCHEMA_NAME.WDIO === options.schemaName)
                require('webdriverio/build/lib/cli.js');
        });

}