import createFile from './createFile';
import chalk from 'chalk';

export default function(items) {
    console.log(chalk.cyan('\nCreated files:'));
    if (Array.isArray(items)) {
        items.map(item => {
            if (item.fileName && item.content)
                createFile(item.fileName, item.content);
        });
    } else if ('object' === typeof items) {
        if (items.fileName && items.content)
            createFile(items.fileName, items.content);
    }
}