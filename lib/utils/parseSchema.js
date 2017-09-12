import inquirer from 'inquirer';

import createFolderHandler from '../helpers/createFolderHandler';
import createFileHandler from '../helpers/createFileHandler';

import SCHEMA_LIST from '../constans/schemaList';

import created from './created';

export default function({ customSchema, schemaName, ...options }) {
    let schema = customSchema ? customSchema : SCHEMA_LIST[schemaName];

    let methods = {
        createFolderHandler,
        createFileHandler
    };

    let config = ('function' === typeof schema)
        ? schema(methods)
        : require(schema)(methods);

    if (config.prompt && config.promptThen) {
        inquirer
            .prompt(config.prompt)
            .then(config.promptThen)
            .then(created.bind(this, options, config));
    } else {
        created.call(this, { schemaName, ...options }, config);
    }
}