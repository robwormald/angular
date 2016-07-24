/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var ts = require('typescript');
var reflector_host_1 = require('../src/reflector_host');
var mocks_1 = require('./mocks');
testing_internal_1.describe('reflector_host', function () {
    var context;
    var host;
    var program;
    var reflectorHost;
    testing_internal_1.beforeEach(function () {
        context = new mocks_1.MockContext('/tmp/src', clone(FILES));
        host = new mocks_1.MockCompilerHost(context);
        program = ts.createProgram(['main.ts'], {
            module: ts.ModuleKind.CommonJS,
        }, host);
        // Force a typecheck
        var errors = program.getSemanticDiagnostics();
        if (errors && errors.length) {
            throw new Error('Expected no errors');
        }
        reflectorHost = new reflector_host_1.ReflectorHost(program, host, {
            genDir: '/tmp/dist',
            basePath: '/tmp/src',
            skipMetadataEmit: false,
            skipTemplateCodegen: false,
            trace: false
        }, context);
    });
    testing_internal_1.it('should provide the import locations for angular', function () {
        var _a = reflectorHost.angularImportLocations(), coreDecorators = _a.coreDecorators, diDecorators = _a.diDecorators, diMetadata = _a.diMetadata, animationMetadata = _a.animationMetadata, provider = _a.provider;
        testing_internal_1.expect(coreDecorators).toEqual('@angular/core/src/metadata');
        testing_internal_1.expect(diDecorators).toEqual('@angular/core/src/di/decorators');
        testing_internal_1.expect(diMetadata).toEqual('@angular/core/src/di/metadata');
        testing_internal_1.expect(animationMetadata).toEqual('@angular/core/src/animation/metadata');
        testing_internal_1.expect(provider).toEqual('@angular/core/src/di/provider');
    });
    testing_internal_1.it('should be able to produce an import from main @angular/core', function () {
        testing_internal_1.expect(reflectorHost.getImportPath('main.ts', 'node_modules/@angular/core.d.ts'))
            .toEqual('@angular/core');
    });
    testing_internal_1.it('should be ble to produce an import from main to a sub-directory', function () {
        testing_internal_1.expect(reflectorHost.getImportPath('main.ts', 'lib/utils.ts')).toEqual('./lib/utils');
    });
    testing_internal_1.it('should be able to produce an import from to a peer file', function () {
        testing_internal_1.expect(reflectorHost.getImportPath('lib/utils.ts', 'lib/collections.ts'))
            .toEqual('./collections');
    });
    testing_internal_1.it('should be able to produce an import from to a sibling directory', function () {
        testing_internal_1.expect(reflectorHost.getImportPath('lib2/utils2.ts', 'lib/utils.ts')).toEqual('../lib/utils');
    });
    testing_internal_1.it('should be able to produce a symbol for an exported symbol', function () {
        testing_internal_1.expect(reflectorHost.findDeclaration('@angular/router-deprecated', 'foo', 'main.ts'))
            .toBeDefined();
    });
    testing_internal_1.it('should be able to produce a symbol for values space only reference', function () {
        testing_internal_1.expect(reflectorHost.findDeclaration('@angular/router-deprecated/src/providers', 'foo', 'main.ts'))
            .toBeDefined();
    });
    testing_internal_1.it('should be produce the same symbol if asked twice', function () {
        var foo1 = reflectorHost.getStaticSymbol('main.ts', 'foo');
        var foo2 = reflectorHost.getStaticSymbol('main.ts', 'foo');
        testing_internal_1.expect(foo1).toBe(foo2);
    });
    testing_internal_1.it('should be able to produce a symbol for a module with no file', function () {
        testing_internal_1.expect(reflectorHost.getStaticSymbol('angularjs', 'SomeAngularSymbol')).toBeDefined();
    });
    testing_internal_1.it('should be able to read a metadata file', function () {
        testing_internal_1.expect(reflectorHost.getMetadataFor('node_modules/@angular/core.d.ts'))
            .toEqual({ __symbolic: 'module', version: 1, metadata: { foo: { __symbolic: 'class' } } });
    });
    testing_internal_1.it('should be able to read metadata from an otherwise unused .d.ts file ', function () {
        testing_internal_1.expect(reflectorHost.getMetadataFor('node_modules/@angular/unused.d.ts')).toBeUndefined();
    });
    testing_internal_1.it('should return undefined for missing modules', function () {
        testing_internal_1.expect(reflectorHost.getMetadataFor('node_modules/@angular/missing.d.ts')).toBeUndefined();
    });
});
var dummyModule = 'export let foo: any[];';
var FILES = {
    'tmp': {
        'src': {
            'main.ts': "\n        import * as c from '@angular/core';\n        import * as r from '@angular/router-deprecated';\n        import * as u from './lib/utils';\n        import * as cs from './lib/collections';\n        import * as u2 from './lib2/utils2';\n      ",
            'lib': {
                'utils.ts': dummyModule,
                'collections.ts': dummyModule,
            },
            'lib2': { 'utils2.ts': dummyModule },
            'node_modules': {
                '@angular': {
                    'core.d.ts': dummyModule,
                    'core.metadata.json': "{\"__symbolic\":\"module\", \"version\": 1, \"metadata\": {\"foo\": {\"__symbolic\": \"class\"}}}",
                    'router-deprecated': { 'index.d.ts': dummyModule, 'src': { 'providers.d.ts': dummyModule } },
                    'unused.d.ts': dummyModule
                }
            }
        }
    }
};
function clone(entry) {
    if (typeof entry === 'string') {
        return entry;
    }
    else {
        var result = {};
        for (var name_1 in entry) {
            result[name_1] = clone(entry[name_1]);
        }
        return result;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdG9yX2hvc3Rfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXItY2xpL3Rlc3QvcmVmbGVjdG9yX2hvc3Rfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQStELHdDQUF3QyxDQUFDLENBQUE7QUFDeEcsSUFBWSxFQUFFLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFFakMsK0JBQTRCLHVCQUF1QixDQUFDLENBQUE7QUFFcEQsc0JBQThELFNBQVMsQ0FBQyxDQUFBO0FBRXhFLDJCQUFRLENBQUMsZ0JBQWdCLEVBQUU7SUFDekIsSUFBSSxPQUFvQixDQUFDO0lBQ3pCLElBQUksSUFBcUIsQ0FBQztJQUMxQixJQUFJLE9BQW1CLENBQUM7SUFDeEIsSUFBSSxhQUE0QixDQUFDO0lBRWpDLDZCQUFVLENBQUM7UUFDVCxPQUFPLEdBQUcsSUFBSSxtQkFBVyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNwRCxJQUFJLEdBQUcsSUFBSSx3QkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxPQUFPLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FDdEIsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNYLE1BQU0sRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVE7U0FDL0IsRUFDRCxJQUFJLENBQUMsQ0FBQztRQUNWLG9CQUFvQjtRQUNwQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFDRCxhQUFhLEdBQUcsSUFBSSw4QkFBYSxDQUM3QixPQUFPLEVB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