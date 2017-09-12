import chalk from 'chalk';
import { spawn } from 'child_process';

export default function(command, flags = '', exitText) {
    return new Promise((resolve, reject) => {
        console.log(chalk.cyan(`\n${command} ${flags.join(' ')}:\n`));

        setTimeout(() => {
            let child = spawn(command, flags);

            child.stdout.on('data', function (data) {
                process.stdout.write(data);
            });

            child.on('close', () => {
                resolve();
            });
        }, 1500);
    });
}