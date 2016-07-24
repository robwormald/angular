'use strict';
var multi_copy_1 = require('./../multi_copy');
var broccoli_dest_copy_1 = require('../broccoli-dest-copy');
var Funnel = require('broccoli-funnel');
var broccoli_merge_trees_1 = require('../broccoli-merge-trees');
var path = require('path');
var broccoli_lodash_1 = require('../broccoli-lodash');
var stew = require('broccoli-stew');
var broccoli_ts2dart_1 = require('../broccoli-ts2dart');
var broccoli_dartfmt_1 = require('../broccoli-dartfmt');
var broccoli_replace_1 = require('../broccoli-replace');
var broccoli_generate_for_test_1 = require('../broccoli-generate-for-test');
var global_excludes = [
    'angular2/examples/**/ts/**/*',
    'angular2/http*',
    'angular2/http/**/*',
    'angular2/src/http/**/*',
    'angular2/src/upgrade/**/*',
    'angular2/test/http/**/*',
    'angular2/test/upgrade/**/*',
    'angular2/upgrade*',
    'payload_tests/**/ts/**/*',
    'playground/src/http/**/*',
    'playground/src/jsonp/**/*',
    'playground/test/http/**/*',
    'playground/test/jsonp/**/*',
];
/**
 * A funnel starting at modules, including the given filters, and moving into the root.
 * @param include Include glob filters.
 */
function modulesFunnel(include, exclude) {
    exclude = exclude || [];
    exclude = exclude.concat(global_excludes);
    return new Funnel('modules', { include: include, destDir: '/', exclude: exclude });
}
/**
 * Replaces $SCRIPT$ in .html files with actual <script> tags.
 */
function replaceScriptTagInHtml(placeholder, relativePath) {
    var scriptTags = '';
    if (relativePath.match(/^benchmarks/)) {
        scriptTags += '<script src="url_params_to_form.js" type="text/javascript"></script>\n';
    }
    var scriptName = relativePath.replace(/\\/g, '/').replace(/.*\/([^/]+)\.html$/, '$1.dart');
    scriptTags += '<script src="' + scriptName + '" type="application/dart"></script>\n' +
        '<script src="packages/browser/dart.js" type="text/javascript"></script>';
    return scriptTags;
}
function stripModulePrefix(relativePath) {
    if (!relativePath.match(/^modules\//)) {
        throw new Error('Expected path to root at modules/: ' + relativePath);
    }
    return relativePath.replace(/^modules\//, '');
}
function getSourceTree(options) {
    var tsInputTree = modulesFunnel([
        'tsconfig-ts2dart.json',
        'upgrade-ts2dart.d.ts',
        'zone-ts2dart.d.ts',
        '**/*.js',
        '**/*.ts',
        '**/*.dart',
    ], [
        'rollup-test/**/*',
        'angular1_router/**/*',
        'angular2/upgrade/**/*',
        'angular2/core/test/typings.d.ts',
        'angular2/manual_typings/globals.d.ts',
        'angular2/typings/es6-collections/es6-collections.d.ts',
        'angular2/typings/es6-promise/es6-promise.d.ts',
        'angular2/typings/tsd.d.ts',
        'angular2/typings.d.ts',
    ]);
    var transpiled = broccoli_ts2dart_1.default(tsInputTree, {
        generateLibraryName: true,
        generateSourceMap: false,
        translateBuiltins: true,
        tsconfig: 'tsconfig-ts2dart.json'
    });
    // Native sources, dart only examples, etc.
    var dartSrcs = modulesFunnel(['**/*.dart', '**/*.ng_meta.json', '**/*.aliases.json', '**/css/**', '**/*.css']);
    var compiledTree = broccoli_merge_trees_1.default([transpiled, dartSrcs]);
    // Generate test files
    var generatedDartTestFiles = broccoli_generate_for_test_1.default(broccoli_merge_trees_1.default([compiledTree, new Funnel('packages', { include: ['path/**', 'stack_trace/**'] })]), { files: ['*/test/**/*_codegen_typed.dart'], dartPath: options.dartSDK.VM });
    return broccoli_merge_trees_1.default([compiledTree, generatedDartTestFiles], { overwrite: true });
}
function fixDartFolderLayout(sourceTree) {
    // Move around files to match Dart's layout expectations.
    return stew.rename(sourceTree, function (relativePath) {
        // If a file matches the `pattern`, insert the given `insertion` as the second path part.
        var replacements = [
            { pattern: /^benchmarks\/test\//, insertion: '' },
            { pattern: /^benchmarks\//, insertion: 'web' },
            { pattern: /^benchmarks_external\/test\//, insertion: '' },
            { pattern: /^benchmarks_external\//, insertion: 'web' },
            { pattern: /^playground\/test\//, insertion: '' },
            { pattern: /^playground\//, insertion: 'web/' },
            { pattern: /^[^\/]*\/test\//, insertion: '' },
            // catch all.
            { pattern: /^./, insertion: 'lib' },
        ];
        for (var i = 0; i < replacements.length; i++) {
            var repl = replacements[i];
            if (relativePath.match(repl.pattern)) {
                var parts = relativePath.split('/');
                parts.splice(1, 0, repl.insertion);
                return path.join.apply(path, parts);
            }
        }
        throw new Error('Failed to match any path: ' + relativePath);
    });
}
function getHtmlSourcesTree() {
    // Replace $SCRIPT$ markers in HTML files.
    var htmlSrcsTree = modulesFunnel(['*/src/**/*.html']);
    htmlSrcsTree = broccoli_replace_1.default(htmlSrcsTree, { files: ['*/**'], patterns: [{ match: '$SCRIPTS$', replacement: replaceScriptTagInHtml }] });
    // Copy a url_params_to_form.js for each benchmark html file.
    var urlParamsToFormTree = new multi_copy_1.MultiCopy('', {
        srcPath: 'tools/build/snippets/url_params_to_form.js',
        targetPatterns: ['modules/benchmarks*/src/*', 'modules/benchmarks*/src/*/*'],
    });
    urlParamsToFormTree = stew.rename(urlParamsToFormTree, stripModulePrefix);
    return broccoli_merge_trees_1.default([htmlSrcsTree, urlParamsToFormTree]);
}
function getExamplesJsonTree() {
    // Copy JSON files
    return modulesFunnel(['playground/**/*.json']);
}
function getTemplatedPubspecsTree() {
    // The JSON structure for templating pubspec.yaml files.
    var BASE_PACKAGE_JSON = require('../../../../package.json');
    var COMMON_PACKAGE_JSON = {
        version: BASE_PACKAGE_JSON.version,
        homepage: BASE_PACKAGE_JSON.homepage,
        bugs: BASE_PACKAGE_JSON.bugs,
        license: BASE_PACKAGE_JSON.license,
        contributors: BASE_PACKAGE_JSON.contributors,
        dependencies: BASE_PACKAGE_JSON.dependencies,
        devDependencies: {}
    };
    // Generate pubspec.yaml from templates.
    var pubspecs = modulesFunnel(['**/pubspec.yaml']);
    // Then render the templates.
    return broccoli_lodash_1.default(pubspecs, { context: { 'packageJson': COMMON_PACKAGE_JSON } });
}
function getDocsTree() {
    // LICENSE files
    var licenses = new multi_copy_1.MultiCopy('', {
        srcPath: 'LICENSE',
        targetPatterns: ['modules/*'],
        exclude: [
            '*/@angular',
            '*/angular2',
            '*/angular1_router',
            '*/angular2/src/http',
            '*/payload_tests',
            '*/upgrade',
        ] // Not in dart.
    });
    licenses = stew.rename(licenses, stripModulePrefix);
    // Documentation.
    // Rename *.dart.md -> *.dart.
    var mdTree = stew.rename(modulesFunnel(['**/*.dart.md']), function (relativePath) { return relativePath.replace(/\.dart\.md$/, '.md'); });
    // Copy all assets, ignore .js. and .dart. (handled above).
    var docs = modulesFunnel(['**/*.md', '**/*.png', '**/*.html', '**/*.css', '**/*.scss'], ['**/*.js.md', '**/*.dart.md', 'angular1_router/**/*']);
    var assets = modulesFunnel(['playground/**/*.json']);
    return broccoli_merge_trees_1.default([licenses, mdTree, docs, assets]);
}
module.exports = function makeDartTree(options) {
    var dartSources = broccoli_dartfmt_1.default(getSourceTree(options), { dartSDK: options.dartSDK, logs: options.logs });
    var sourceTree = broccoli_merge_trees_1.default([dartSources, getHtmlSourcesTree(), getExamplesJsonTree()]);
    sourceTree = fixDartFolderLayout(sourceTree);
    var dartTree = broccoli_merge_trees_1.default([sourceTree, getTemplatedPubspecsTree(), getDocsTree()]);
    return broccoli_dest_copy_1.default(dartTree, options.outputPath);
};
//# sourceMappingURL=dart_tree.js.map