import fs from 'fs';
import path from 'path';

export default function(directory, content = 'File created!') {
    fs.appendFileSync(path.join(process.cwd(), directory), content, 'utf-8');
    console.log(`    ${directory}`);
}