import fs from 'fs';
import inquirer from 'inquirer';

import createFolderHandler from '../helpers/createFolderHandler';
import createFileHandler from '../helpers/createFileHandler';
import createOtherFiles from '../helpers/createOtherFiles';

function promise(options) {
    if (options.fileList)
        options.fileList.map(file => createOtherFiles[file].create());
}

export default function({ schema, ...options }) {
    let config = ('function' === typeof schema)
        ? schema()
        : require(schema)({
            createFolderHandler,
            createFileHandler
        });

    createFolderHandler(config.folders);
    createFileHandler(config.files);

    if (config.prompt && config.promptThen) {
        inquirer
            .prompt(config.prompt)
            .then(config.promptThen)
            .then(promise.bind(this, options));
    } else {
        promise.call(this, options);
    }
}