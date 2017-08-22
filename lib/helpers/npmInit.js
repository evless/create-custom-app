const exec = require('child_process').exec;

export default function() {
    let message = '';
    const child = exec('npm init');

    child.stdout.on('data', function (data) {
        message = data;
        process.stdout.write(data);
    });

    process.stdin.on('readable', function () {
        let chunk = process.stdin.read();

        if (null !== chunk) {
            child.stdin.write(chunk);

            if (-1 < message.indexOf('Is this ok? (yes)')) {
                process.exit();
            }
        }
    });
}