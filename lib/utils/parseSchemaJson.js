import fs from 'fs';

import createFolderHandler from '../helpers/createFolderHandler';
import createFileHandler from '../helpers/createFileHandler';

export default function ({ schema }) {
    fs.readFile(schema, 'utf-8', (err, data) => {
        let config = JSON.parse(data);
        createFolderHandler(config.folders);
        createFileHandler(config.files);
    });
}