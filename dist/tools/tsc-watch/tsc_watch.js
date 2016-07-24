"use strict";
var child_process_1 = require('child_process');
var os_1 = require('os');
var path_1 = require('path');
var State;
(function (State) {
    State[State["idle"] = 0] = "idle";
    State[State["waiting"] = 1] = "waiting";
    State[State["error"] = 2] = "error";
})(State || (State = {}));
exports.TSC = path_1.normalize('node_modules/.bin/tsc') + (/^win/.test(os_1.platform()) ? '.cmd' : '');
var TscWatch = (function () {
    function TscWatch(_a) {
        var tsconfig = _a.tsconfig, start = _a.start, error = _a.error, complete = _a.complete, _b = _a.onStartCmds, onStartCmds = _b === void 0 ? null : _b, _c = _a.onChangeCmds, onChangeCmds = _c === void 0 ? null : _c;
        this.triggered = null;
        this.runOnce = false;
        console.log('Watching:', tsconfig, 'in', process.cwd());
        this.tsconfig = tsconfig;
        this.start = start;
        this.error = error;
        this.complete = complete;
        this.onStartCmds = onStartCmds || [];
        this.onChangeCmds = onChangeCmds || [];
    }
    TscWatch.prototype.watch = function () {
        var _this = this;
        var args = [exports.TSC, '--emitDecoratorMetadata', '--project', this.tsconfig];
        if (!this.runOnce)
            args.push('--watch');
        var tsc = this.runCmd(args, {}, function (d) { return _this.consumeLine(d, false); }, function (d) { return _this.consumeLine(d, true); });
        if (this.runOnce) {
            tsc.then(function () { return _this.triggerCmds(); }, function (code) { return process.exit(code); });
        }
        this.state = State.waiting;
        this.onStartCmds.forEach(function (cmd) { return _this.runCmd(cmd, null, function () { return null; }, function () { return null; }); });
    };
    TscWatch.prototype.runCmd = function (argsOrCmd, env, stdOut, stdErr) {
        if (stdOut === void 0) { stdOut = pipeStdOut; }
        if (stdErr === void 0) { stdErr = pipeStdErr; }
        if (typeof argsOrCmd == 'function') {
            return argsOrCmd(stdErr, stdOut);
        }
        else if (argsOrCmd instanceof Array) {
            var args = argsOrCmd;
            return new Promise(function (resolve, reject) {
                var cmd = args[0], options = args.slice(1);
                console.log('=====>', cmd, options.join(' '));
                var childProcess = child_process_1.spawn(cmd, options, { stdio: 'pipe' });
                childProcess.stdout.on('data', stdOut);
                childProcess.stderr.on('data', stdErr);
                var onExit = function () { return childProcess.kill(); };
                childProcess.on('close', function (code) {
                    process.removeListener('exit', onExit);
                    console.log('EXIT:', code, '<=====', args.join(' '));
                    code ? reject(code) : resolve(code);
                });
                process.on('exit', onExit);
            })
                .catch(reportError);
        }
        else {
            throw new Error('Expecting function or an array of strings...');
        }
    };
    TscWatch.prototype.run = function () {
        this.runOnce = true;
        this.watch();
    };
    TscWatch.prototype.runCmdsOnly = function () {
        this.runOnce = true;
        this.triggerCmds();
    };
    TscWatch.prototype.consumeLine = function (buffer, isStdError) {
        var _this = this;
        var line = '' + buffer;
        if (contains(line, this.start)) {
            console.log('==============================================================================');
            stdOut(buffer, isStdError);
            this.state = State.waiting;
        }
        else if (contains(line, this.error)) {
            stdOut(buffer, isStdError);
            this.state = State.error;
        }
        else if (contains(line, this.complete)) {
            stdOut(buffer, isStdError);
            console.log('------------------------------------------------------------------------------');
            if (this.state == State.error) {
                console.log('Errors found.... (response not triggered)');
                if (this.runOnce)
                    process.exit(1);
                this.state = State.idle;
            }
            else {
                if (this.triggered) {
                    this.triggered.then(function () { return _this.triggerCmds(); }, function (e) { console.log('Error while running commands....', e); });
                }
                else {
                    this.triggerCmds();
                }
            }
        }
        else {
            stdOut(buffer, isStdError);
        }
    };
    TscWatch.prototype.triggerCmds = function () {
        var _this = this;
        var cmdPromise = Promise.resolve(0);
        this.onChangeCmds.forEach(function (cmd) {
            cmdPromise = cmdPromise.then(function () {
                return _this.runCmd(cmd);
            });
        });
        cmdPromise.then(function () { return _this.triggered = null; }, function (code) {
            if (_this.runOnce) {
                if (typeof code != 'number') {
                    console.error('Error occurred while executing commands', code);
                    process.exit(1);
                }
                process.exit(code);
            }
            else {
                _this.triggered = null;
            }
        });
        this.triggered = cmdPromise;
    };
    return TscWatch;
}());
exports.TscWatch = TscWatch;
function stdOut(data, isStdError) {
    if (isStdError) {
        process.stderr.write(data);
    }
    else {
        process.stdout.write(data);
    }
}
function contains(line, text) {
    if (typeof text == 'string') {
        return line.indexOf(text) != -1;
    }
    else if (text instanceof RegExp) {
        return text.test(line);
    }
    else {
        throw new Error('Unknown: ' + text);
    }
}
function reportError(e) {
    if (e.message && e.stack) {
        console.error(e.message);
        console.error(e.stack);
    }
    else {
        console.error(e);
    }
    // process.exit(1);
    return Promise.reject(e);
}
exports.reportError = reportError;
function pipeStdOut(d) {
    process.stdout.write(d);
}
function pipeStdErr(d) {
    process.stderr.write(d);
}
//# sourceMappingURL=tsc_watch.js.map