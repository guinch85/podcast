/**
 * Created by chateaup on 20/03/2017.
 */
let child_process = require('child_process');

process.env.UV_THREADPOOL_SIZE = 20;

function start(nodefile) {
    if (typeof start !== 'string') {
        console.log('Has none file. like this: start("app.js")');
    }

    console.log('Master process is running.');

    let proc = child_process.spawn('node', [nodefile]);

    proc.stdout.on('data', function (data) {
        console.log(data.toString().replace(/[\n\r]$/g, ''));
    });

    proc.stderr.on('data', function (data) {
        console.log(data.toString().replace(/[\n\r]$/g, ''));
    });

    proc.on('exit', function (code) {
        console.log('Child process excited!');
        console.log(arguments);
        console.log('child process exited with code ' + code);
        delete(proc);
        setTimeout(function () {
            start(nodefile)
        }, 5000);
    });
}

start(__dirname + '/server');