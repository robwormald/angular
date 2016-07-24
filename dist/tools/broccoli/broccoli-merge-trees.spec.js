"use strict";
var mockfs = require('mock-fs');
var fs = require('fs');
var tree_differ_1 = require('./tree-differ');
var broccoli_merge_trees_1 = require('./broccoli-merge-trees');
describe('MergeTrees', function () {
    afterEach(function () { return mockfs.restore(); });
    function mergeTrees(inputPaths, cachePath, options) {
        return new broccoli_merge_trees_1.MergeTrees(inputPaths, cachePath, options);
    }
    function MakeTreeDiffers(rootDirs) {
        return rootDirs.map(function (rootDir) { return new tree_differ_1.TreeDiffer('MergeTrees', rootDir); });
    }
    var diffTrees = function (differs) { return differs.map(function (tree) { return tree.diffTree(); }); };
    function read(path) { return fs.readFileSync(path, 'utf-8'); }
    it('should copy the file from the right-most inputTree with overwrite=true', function () {
        var testDir = {
            'tree1': { 'foo.js': mockfs.file({ content: 'tree1/foo.js content', mtime: new Date(1000) }) },
            'tree2': { 'foo.js': mockfs.file({ content: 'tree2/foo.js content', mtime: new Date(1000) }) },
            'tree3': { 'foo.js': mockfs.file({ content: 'tree3/foo.js content', mtime: new Date(1000) }) }
        };
        mockfs(testDir);
        var treeDiffer = MakeTreeDiffers(['tree1', 'tree2', 'tree3']);
        var treeMerger = mergeTrees(['tree1', 'tree2', 'tree3'], 'dest', { overwrite: true });
        treeMerger.rebuild(diffTrees(treeDiffer));
        expect(read('dest/foo.js')).toBe('tree3/foo.js content');
        delete testDir.tree2['foo.js'];
        delete testDir.tree3['foo.js'];
        mockfs(testDir);
        treeMerger.rebuild(diffTrees(treeDiffer));
        expect(read('dest/foo.js')).toBe('tree1/foo.js content');
        testDir.tree2['foo.js'] = mockfs.file({ content: 'tree2/foo.js content', mtime: new Date(1000) });
        mockfs(testDir);
        treeMerger.rebuild(diffTrees(treeDiffer));
        expect(read('dest/foo.js')).toBe('tree2/foo.js content');
    });
    it('should throw if duplicates are found during the initial build', function () {
        var testDir = {
            'tree1': { 'foo.js': mockfs.file({ content: 'tree1/foo.js content', mtime: new Date(1000) }) },
            'tree2': { 'foo.js': mockfs.file({ content: 'tree2/foo.js content', mtime: new Date(1000) }) },
            'tree3': { 'foo.js': mockfs.file({ content: 'tree3/foo.js content', mtime: new Date(1000) }) }
        };
        mockfs(testDir);
        var treeDiffer = MakeTreeDiffers(['tree1', 'tree2', 'tree3']);
        var treeMerger = mergeTrees(['tree1', 'tree2', 'tree3'], 'dest', {});
        expect(function () { return treeMerger.rebuild(diffTrees(treeDiffer)); })
            .toThrowError('Duplicate path found while merging trees. Path: "foo.js".\n' +
            'Either remove the duplicate or enable the "overwrite" option for this merge.');
        testDir = {
            'tree1': { 'foo.js': mockfs.file({ content: 'tree1/foo.js content', mtime: new Date(1000) }) },
            'tree2': {},
            'tree3': {}
        };
        mockfs(testDir);
    });
    it('should throw if duplicates are found during rebuild', function () {
        var testDir = {
            'tree1': { 'foo.js': mockfs.file({ content: 'tree1/foo.js content', mtime: new Date(1000) }) },
            'tree2': {},
            'tree3': {}
        };
        mockfs(testDir);
        var treeDiffer = MakeTreeDiffers(['tree1', 'tree2', 'tree3']);
        var treeMerger = mergeTrees(['tree1', 'tree2', 'tree3'], 'dest', {});
        expect(function () { return treeMerger.rebuild(diffTrees(treeDiffer)); }).not.toThrow();
        testDir.tree2['foo.js'] = mockfs.file({ content: 'tree2/foo.js content', mtime: new Date(1000) });
        mockfs(testDir);
        expect(function () { return treeMerger.rebuild(diffTrees(treeDiffer)); })
            .toThrowError('Duplicate path found while merging trees. Path: "foo.js".\n' +
            'Either remove the duplicate or enable the "overwrite" option for this merge.');
    });
});
//# sourceMappingURL=broccoli-merge-trees.spec.js.map