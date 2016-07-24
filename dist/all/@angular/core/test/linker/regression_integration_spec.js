/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var testing_1 = require('@angular/core/testing');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
function main() {
    testing_internal_1.describe('jit', function () { declareTests({ useJit: true }); });
    testing_internal_1.describe('no jit', function () { declareTests({ useJit: false }); });
}
exports.main = main;
function declareTests(_a) {
    var useJit = _a.useJit;
    // Place to put reproductions for regressions
    testing_internal_1.describe('regressions', function () {
        testing_internal_1.describe('platform pipes', function () {
            testing_internal_1.beforeEach(function () {
                testing_1.configureCompiler({ useJit: useJit });
                testing_1.configureModule({ declarations: [PlatformPipe] });
            });
            testing_internal_1.it('should overwrite them by custom pipes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp1, new core_1.ViewMetadata({ template: '{{true | somePipe}}', pipes: [CustomPipe] }))
                    .createAsync(MyComp1)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    matchers_1.expect(fixture.nativeElement).toHaveText('someCustomPipe');
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('expressions', function () {
            testing_internal_1.it('should evaluate conditional and boolean operators with right precedence - #8244', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp1, new core_1.ViewMetadata({ template: "{{'red' + (true ? ' border' : '')}}" }))
                    .createAsync(MyComp1)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    matchers_1.expect(fixture.nativeElement).toHaveText('red border');
                    async.done();
                });
            }));
            testing_internal_1.it('should evaluate conditional and unary operators with right precedence - #8235', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp1, new core_1.ViewMetadata({ template: "{{!null?.length}}" }))
                    .createAsync(MyComp1)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    matchers_1.expect(fixture.nativeElement).toHaveText('true');
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('providers', function () {
            function createInjector(tcb, proviers) {
                return tcb.overrideProviders(MyComp1, [proviers])
                    .createAsync(MyComp1)
                    .then(function (fixture) { return fixture.componentInstance.injector; });
            }
            testing_internal_1.it('should support providers with an OpaqueToken that contains a `.` in the name', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var token = new core_1.OpaqueToken('a.b');
                var tokenValue = 1;
                createInjector(tcb, [
                    { provide: token, useValue: tokenValue }
                ]).then(function (injector) {
                    matchers_1.expect(injector.get(token)).toEqual(tokenValue);
                    async.done();
                });
            }));
            testing_internal_1.it('should support providers with string token with a `.` in it', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var token = 'a.b';
                var tokenValue = 1;
                createInjector(tcb, [
                    { provide: token, useValue: tokenValue }
                ]).then(function (injector) {
                    matchers_1.expect(injector.get(token)).toEqual(tokenValue);
                    async.done();
                });
            }));
            testing_internal_1.it('should support providers with an anonymous function', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var token = function () { return true; };
                var tokenValue = 1;
                createInjector(tcb, [
                    { provide: token, useValue: tokenValue }
                ]).then(function (injector) {
                    matchers_1.expect(injector.get(token)).toEqual(tokenValue);
                    async.done();
                });
            }));
            testing_internal_1.it('should support providers with an OpaqueToken that has a StringMap as value', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var token1 = new core_1.OpaqueToken('someToken');
                var token2 = new core_1.OpaqueToken('someToken');
                var tokenValue1 = { 'a': 1 };
                var tokenValue2 = { 'a': 1 };
                createInjector(tcb, [
                    { provide: token1, useValue: tokenValue1 },
                    { provide: token2, useValue: tokenValue2 }
                ]).then(function (injector) {
                    matchers_1.expect(injector.get(token1)).toEqual(tokenValue1);
                    matchers_1.expect(injector.get(token2)).toEqual(tokenValue2);
                    async.done();
                });
            }));
        });
        testing_internal_1.it('should allow logging a previous elements class binding via interpolation', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(MyComp1, "<div [class.a]=\"true\" #el>Class: {{el.className}}</div>")
                .createAsync(MyComp1)
                .then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect(fixture.nativeElement).toHaveText('Class: a');
                async.done();
            });
        }));
        testing_internal_1.it('should support ngClass before a component and content projection inside of an ngIf', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MyComp1, new core_1.ViewMetadata({
                template: "A<cmp-content *ngIf=\"true\" [ngClass]=\"'red'\">B</cmp-content>C",
                directives: [common_1.NgClass, common_1.NgIf, CmpWithNgContent]
            }))
                .createAsync(MyComp1)
                .then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect(fixture.nativeElement).toHaveText('ABC');
                async.done();
            });
        }));
        testing_internal_1.it('should handle mutual recursion entered from multiple sides - #7084', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(FakeRecursiveComp).then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect(fixture.nativeElement).toHaveText('[]');
                async.done();
            });
        }));
    });
}
var MyComp1 = (function () {
    function MyComp1(injector) {
        this.injector = injector;
    }
    /** @nocollapse */
    MyComp1.decorators = [
        { type: core_1.Component, args: [{ selector: 'my-comp', template: '' },] },
    ];
    /** @nocollapse */
    MyComp1.ctorParameters = [
        { type: core_1.Injector, },
    ];
    return MyComp1;
}());
var PlatformPipe = (function () {
    function PlatformPipe() {
    }
    PlatformPipe.prototype.transform = function (value) { return 'somePlatformPipe'; };
    /** @nocollapse */
    PlatformPipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'somePipe', pure: true },] },
    ];
    return PlatformPipe;
}());
var CustomPipe = (function () {
    function CustomPipe() {
    }
    CustomPipe.prototype.transform = function (value) { return 'someCustomPipe'; };
    /** @nocollapse */
    CustomPipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'somePipe', pure: true },] },
    ];
    return CustomPipe;
}());
var CmpWithNgContent = (function () {
    function CmpWithNgContent() {
    }
    /** @nocollapse */
    CmpWithNgContent.decorators = [
        { type: core_1.Component, args: [{ selector: 'cmp-content', template: "<ng-content></ng-content>" },] },
    ];
    return CmpWithNgContent;
}());
var LeftComp = (function () {
    function LeftComp() {
    }
    /** @nocollapse */
    LeftComp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'left',
                    template: "L<right *ngIf=\"false\"></right>",
                    directives: [
                        common_1.NgIf,
                        core_1.forwardRef(function () { return RightComp; }),
                    ]
                },] },
    ];
    return LeftComp;
}());
var RightComp = (function () {
    function RightComp() {
    }
    /** @nocollapse */
    RightComp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'right',
                    template: "R<left *ngIf=\"false\"></left>",
                    directives: [
                        common_1.NgIf,
                        core_1.forwardRef(function () { return LeftComp; }),
                    ]
                },] },
    ];
    return RightComp;
}());
var FakeRecursiveComp = (function () {
    function FakeRecursiveComp() {
    }
    /** @nocollapse */
    FakeRecursiveComp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'fakeRecursiveComp',
                    template: "[<left *ngIf=\"false\"></left><right *ngIf=\"false\"></right>]",
                    directives: [
                        common_1.NgIf,
                        core_1.forwardRef(function () { return LeftComp; }),
                        core_1.forwardRef(function () { return RightComp; }),
                    ]
                },] },
    ];
    return FakeRecursiveComp;
}());
exports.FakeRecursiveComp = FakeRecursiveComp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVncmVzc2lvbl9pbnRlZ3JhdGlvbl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvbGlua2VyL3JlZ3Jlc3Npb25faW50ZWdyYXRpb25fc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQXlILHdDQUF3QyxDQUFDLENBQUE7QUFDbEsseUJBQXFCLDRDQUE0QyxDQUFDLENBQUE7QUFDbEUsd0JBQXVFLHVCQUF1QixDQUFDLENBQUE7QUFFL0YscUJBQThGLGVBQWUsQ0FBQyxDQUFBO0FBQzlHLHVCQUE0QixpQkFBaUIsQ0FBQyxDQUFBO0FBRTlDO0lBQ0UsMkJBQVEsQ0FBQyxLQUFLLEVBQUUsY0FBUSxZQUFZLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXpELDJCQUFRLENBQUMsUUFBUSxFQUFFLGNBQVEsWUFBWSxDQUFDLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRCxDQUFDO0FBSmUsWUFBSSxPQUluQixDQUFBO0FBRUQsc0JBQXNCLEVBQTJCO1FBQTFCLGtCQUFNO0lBQzNCLDZDQUE2QztJQUM3QywyQkFBUSxDQUFDLGFBQWEsRUFBRTtRQUV0QiwyQkFBUSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLDZCQUFVLENBQUM7Z0JBQ1QsMkJBQWlCLENBQUMsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztnQkFDcEMseUJBQWUsQ0FBQyxFQUFDLFlBQVksRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztZQUVILHFCQUFFLENBQUMsdUNBQXVDLEVBQ3ZDLHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0Is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