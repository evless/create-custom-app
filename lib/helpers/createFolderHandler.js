import createFolder from './createFolder';
import chalk from 'chalk';

export default function(items) {
    console.log(chalk.cyan('\nCreated folders:'));
    if (Array.isArray(items)) {
        items.map(createFolder);
    } else if ('string' === typeof items) {
        createFolder(items);
    }
}