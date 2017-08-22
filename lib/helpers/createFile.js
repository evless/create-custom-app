import fs from 'fs';
import path from 'path';

export default function(directory, content = 'File created!', callback = () => {}) {
    fs.appendFile(path.join(process.cwd(), directory), content, 'utf-8', callback);
}