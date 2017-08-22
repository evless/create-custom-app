import fs from 'fs';
import path from 'path';

export default function(directory) {
    directory
        .split('/')
        .reduce((parentDir, childDir) => {
            const currentDir = path.resolve(parentDir, childDir);
            if (!fs.existsSync(currentDir)) {
                fs.mkdirSync(currentDir);
            }

            return currentDir;
        }, process.cwd());
}