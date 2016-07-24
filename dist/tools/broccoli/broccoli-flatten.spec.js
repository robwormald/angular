"use strict";
var mockfs = require('mock-fs');
var fs = require('fs');
var path = require('path');
var tree_differ_1 = require('./tree-differ');
var broccoli_flatten_1 = require('./broccoli-flatten');
describe('Flatten', function () {
    afterEach(function () { return mockfs.restore(); });
    var flatten = function (inputPaths) { return new broccoli_flatten_1.DiffingFlatten(inputPaths, 'output', null); };
    var read = function (path) { return fs.readFileSync(path, { encoding: 'utf-8' }); };
    var rm = function (path) { return fs.unlinkSync(path); };
    var write = function (path, content) { fs.writeFileSync(path, content, { encoding: 'utf-8' }); };
    it('should flatten files and be incremental', function () {
        var testDir = {
            'input': {
                'dir1': {
                    'file-1.txt': mockfs.file({ content: 'file-1.txt content', mtime: new Date(1000) }),
                    'file-2.txt': mockfs.file({ content: 'file-2.txt content', mtime: new Date(1000) }),
                    'subdir-1': {
                        'file-1.1.txt': mockfs.file({ content: 'file-1.1.txt content', mtime: new Date(1000) })
                    },
                    'empty-dir': {}
                },
            },
            'output': {}
        };
        mockfs(testDir);
        var differ = new tree_differ_1.TreeDiffer('testLabel', 'input');
        var flattenedTree = flatten('input');
        flattenedTree.rebuild(differ.diffTree());
        expect(fs.readdirSync('output')).toEqual(['file-1.1.txt', 'file-1.txt', 'file-2.txt']);
        // fails  due to a mock-fs bug related to reading symlinks?
        // expect(read('output/file-1.1.txt')).toBe('file-1.1.txt content');
        // delete a file
        rm('input/dir1/file-1.txt');
        // add a new one
        write('input/dir1/file-3.txt', 'file-3.txt content');
        flattenedTree.rebuild(differ.diffTree());
        expect(fs.readdirSync('output')).toEqual(['file-1.1.txt', 'file-2.txt', 'file-3.txt']);
    });
    it('should throw an exception if duplicates are found', function () {
        var testDir = {
            'input': {
                'dir1': {
                    'file-1.txt': mockfs.file({ content: 'file-1.txt content', mtime: new Date(1000) }),
                    'subdir-1': { 'file-1.txt': mockfs.file({ content: 'file-1.1.txt content', mtime: new Date(1000) }) },
                    'empty-dir': {}
                },
            },
            'output': {}
        };
        mockfs(testDir);
        var differ = new tree_differ_1.TreeDiffer('testLabel', 'input');
        var flattenedTree = flatten('input');
        expect(function () { return flattenedTree.rebuild(differ.diffTree()); })
            .toThrowError('Duplicate file \'file-1.txt\' found in path \'dir1' + path.sep + 'subdir-1' +
            path.sep + 'file-1.txt\'');
    });
});
//# sourceMappingURL=broccoli-flatten.spec.js.map