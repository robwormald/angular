"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var child_process_1 = require('child_process');
var fs_1 = require('fs');
var tsc_watch_1 = require('./tsc_watch');
__export(require('./tsc_watch'));
require('reflect-metadata');
var OFFLINE_COMPILE = ['output/output_emitter_codegen_untyped', 'output/output_emitter_codegen_typed'];
function processOutputEmitterCodeGen() {
    return new Promise(function (resolve, reject) {
        var outDir = 'dist/all/@angular/compiler/test/';
        var promises = [];
        console.log('Processing codegen...');
        OFFLINE_COMPILE.forEach(function (file) {
            var codegen = require('../../all/@angular/compiler/test/' + file + '.js');
            if (codegen.emit) {
                console.log("  " + file + " has changed, regenerating...");
                promises.push(Promise.resolve(codegen.emit()).then(function (code) {
                    fs_1.writeFileSync(outDir + file + '.ts', code);
                }));
            }
        });
        if (promises.length) {
            Promise.all(promises)
                .then(function () {
                var args = ['--project', 'tools/cjs-jasmine/tsconfig-output_emitter_codegen.json'];
                console.log('    compiling changes: tsc ' + args.join(' '));
                var tsc = child_process_1.spawn(tsc_watch_1.TSC, args, { stdio: 'pipe' });
                tsc.stdout.on('data', function (data) { return process.stdout.write(data); });
                tsc.stderr.on('data', function (data) { return process.stderr.write(data); });
                tsc.on('close', function (code) { return code ? reject('Tsc exited with: ' + code) : resolve(code); });
            })
                .catch(tsc_watch_1.reportError);
        }
        else {
            resolve(0);
        }
    })
        .catch(tsc_watch_1.reportError);
}
function md(dir, folders) {
    if (folders.length) {
        var next = folders.shift();
        var path = dir + '/' + next;
        if (!fs_1.existsSync(path)) {
            fs_1.mkdirSync(path);
        }
        md(path, folders);
    }
}
var tscWatch = null;
var platform = process.argv.length >= 3 ? process.argv[2] : null;
var runMode = process.argv.length >= 4 ? process.argv[3] : null;
if (platform == 'node') {
    tscWatch = new tsc_watch_1.TscWatch({
        tsconfig: 'modules/tsconfig.json',
        start: 'File change detected. Starting incremental compilation...',
        error: 'error',
        complete: 'Compilation complete. Watching for file changes.',
        onChangeCmds: [
            processOutputEmitterCodeGen,
            [
                'node', 'dist/tools/cjs-jasmine', '--', '{@angular,benchpress}/**/*_spec.js',
                '@angular/compiler-cli/test/**/*_spec.js'
            ]
        ]
    });
}
else if (platform == 'browser') {
    tscWatch = new tsc_watch_1.TscWatch({
        tsconfig: 'modules/tsconfig.json',
        start: 'File change detected. Starting incremental compilation...',
        error: 'error',
        complete: 'Compilation complete. Watching for file changes.',
        onStartCmds: [
            [
                'node', 'node_modules/karma/bin/karma', 'start', '--no-auto-watch', '--port=9876',
                'karma-js.conf.js'
            ],
            [
                'node', 'node_modules/karma/bin/karma', 'start', '--no-auto-watch', '--port=9877',
                'modules/@angular/router/karma.conf.js'
            ],
        ],
        onChangeCmds: [
            ['node', 'node_modules/karma/bin/karma', 'run', 'karma-js.conf.js', '--port=9876'],
            ['node', 'node_modules/karma/bin/karma', 'run', '--port=9877'],
        ]
    });
}
else if (platform == 'tools') {
    tscWatch = new tsc_watch_1.TscWatch({
        tsconfig: 'tools/tsconfig.json',
        start: 'File change detected. Starting incremental compilation...',
        error: 'error',
        complete: 'Compilation complete. Watching for file changes.',
        onChangeCmds: [[
                'node', 'dist/tools/cjs-jasmine/index-tools', '--', '@angular/tsc-wrapped/**/*{_,.}spec.js'
            ]]
    });
}
else {
    throw new Error("unknown platform: " + platform);
}
if (runMode === 'watch') {
    tscWatch.watch();
}
else if (runMode === 'runCmdsOnly') {
    tscWatch.runCmdsOnly();
}
else {
    tscWatch.run();
}
//# sourceMappingURL=index.js.map