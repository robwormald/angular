"use strict";
var broccoli = require('broccoli');
var fs = require('fs');
var makeBrowserTree = require('./trees/browser_tree');
var makeNodeTree = require('./trees/node_tree');
var path = require('path');
var printSlowTrees = require('broccoli-slow-trees');
var Q = require('q');
/**
 * BroccoliBuilder facade for all of our build pipelines.
 */
var AngularBuilder = (function () {
    function AngularBuilder(options) {
        this.options = options;
        this.outputPath = options.outputPath;
    }
    AngularBuilder.prototype.rebuildBrowserDevTree = function (opts) {
        this.browserDevBuilder = this.browserDevBuilder || this.makeBrowserDevBuilder(opts);
        return this.rebuild(this.browserDevBuilder, 'js.dev');
    };
    AngularBuilder.prototype.rebuildBrowserProdTree = function (opts) {
        this.browserProdBuilder = this.browserProdBuilder || this.makeBrowserProdBuilder(opts);
        return this.rebuild(this.browserProdBuilder, 'js.prod');
    };
    AngularBuilder.prototype.rebuildNodeTree = function (opts) {
        this.nodeBuilder = this.nodeBuilder || this.makeNodeBuilder(opts.projects);
        return this.rebuild(this.nodeBuilder, 'js.cjs');
    };
    AngularBuilder.prototype.rebuildDartTree = function (projects) {
        this.dartBuilder = this.dartBuilder || this.makeDartBuilder(projects);
        return this.rebuild(this.dartBuilder, 'dart');
    };
    AngularBuilder.prototype.cleanup = function () {
        return Q.all([
            this.nodeBuilder && this.nodeBuilder.cleanup(),
            this.browserDevBuilder && this.browserDevBuilder.cleanup(),
            this.browserProdBuilder && this.browserProdBuilder.cleanup()
        ]);
    };
    AngularBuilder.prototype.makeBrowserDevBuilder = function (opts) {
        var tree = makeBrowserTree({
            name: 'dev',
            typeAssertions: true,
            sourceMaps: true,
            projects: opts.projects,
            noTypeChecks: opts.noTypeChecks,
            generateEs6: opts.generateEs6,
            useBundles: opts.useBundles
        }, path.join(this.outputPath, 'js', 'dev'));
        return new broccoli.Builder(tree);
    };
    AngularBuilder.prototype.makeBrowserProdBuilder = function (opts) {
        var tree = makeBrowserTree({
            name: 'prod',
            typeAssertions: false,
            sourceMaps: false,
            projects: opts.projects,
            noTypeChecks: opts.noTypeChecks,
            generateEs6: opts.generateEs6,
            useBundles: opts.useBundles
        }, path.join(this.outputPath, 'js', 'prod'));
        return new broccoli.Builder(tree);
    };
    AngularBuilder.prototype.makeNodeBuilder = function (projects) {
        var tree = makeNodeTree(projects, path.join(this.outputPath, 'js', 'cjs'));
        return new broccoli.Builder(tree);
    };
    AngularBuilder.prototype.makeDartBuilder = function (projects) {
        var options = {
            outputPath: path.join(this.outputPath, 'dart'),
            dartSDK: this.options.dartSDK,
            logs: this.options.logs,
            projects: projects
        };
        // Workaround for https://github.com/dart-lang/dart_style/issues/493
        var makeDartTree = require('./trees/dart_tree');
        var tree = makeDartTree(options);
        return new broccoli.Builder(tree);
    };
    AngularBuilder.prototype.rebuild = function (builder, name) {
        var _this = this;
        return builder.build().then(function (result) {
            if (!_this.firstResult) {
                _this.firstResult = result;
            }
            printSlowTrees(result.graph);
            writeBuildLog(result, name);
            return result;
        }, function (error) {
            // the build tree is the same during rebuilds, only leaf properties of the nodes
            // change
            // so let's traverse it and get updated values for input/cache/output paths
            if (_this.firstResult) {
                writeBuildLog(_this.firstResult, name);
            }
            throw error;
        });
    };
    return AngularBuilder;
}());
exports.AngularBuilder = AngularBuilder;
function writeBuildLog(result, name) {
    var logPath = "tmp/build." + name + ".log";
    var prevLogPath = logPath + '.previous';
    var formattedLogContent = JSON.stringify(broccoliNodeToBuildNode(result.graph), null, 2);
    if (fs.existsSync(prevLogPath))
        fs.unlinkSync(prevLogPath);
    if (fs.existsSync(logPath))
        fs.renameSync(logPath, prevLogPath);
    fs.writeFileSync(logPath, formattedLogContent, { encoding: 'utf-8' });
}
function broccoliNodeToBuildNode(broccoliNode) {
    var tree = broccoliNode.tree.newStyleTree || broccoliNode.tree;
    return new BuildNode(tree.description || tree.constructor.name, tree.inputPath ? [tree.inputPath] : tree.inputPaths, tree.cachePath, tree.outputPath, broccoliNode.selfTime / (1000 * 1000 * 1000), broccoliNode.totalTime / (1000 * 1000 * 1000), broccoliNode.subtrees.map(broccoliNodeToBuildNode));
}
var BuildNode = (function () {
    function BuildNode(pluginName, inputPaths, cachePath, outputPath, selfTime, totalTime, inputNodes) {
        this.pluginName = pluginName;
        this.inputPaths = inputPaths;
        this.cachePath = cachePath;
        this.outputPath = outputPath;
        this.selfTime = selfTime;
        this.totalTime = totalTime;
        this.inputNodes = inputNodes;
    }
    return BuildNode;
}());
//# sourceMappingURL=angular_builder.js.map