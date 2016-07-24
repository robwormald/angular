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
var lang_1 = require('../../src/facade/lang');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
function main() {
    testing_internal_1.describe('JsonPipe', function () {
        var regNewLine = '\n';
        var inceptionObj;
        var inceptionObjString;
        var pipe;
        function normalize(obj) { return lang_1.StringWrapper.replace(obj, regNewLine, ''); }
        testing_internal_1.beforeEach(function () {
            inceptionObj = { dream: { dream: { dream: 'Limbo' } } };
            inceptionObjString = '{\n' +
                '  "dream": {\n' +
                '    "dream": {\n' +
                '      "dream": "Limbo"\n' +
                '    }\n' +
                '  }\n' +
                '}';
            pipe = new common_1.JsonPipe();
        });
        testing_internal_1.describe('transform', function () {
            testing_internal_1.it('should return JSON-formatted string', function () { matchers_1.expect(pipe.transform(inceptionObj)).toEqual(inceptionObjString); });
            testing_internal_1.it('should return JSON-formatted string even when normalized', function () {
                var dream1 = normalize(pipe.transform(inceptionObj));
                var dream2 = normalize(inceptionObjString);
                matchers_1.expect(dream1).toEqual(dream2);
            });
            testing_internal_1.it('should return JSON-formatted string similar to Json.stringify', function () {
                var dream1 = normalize(pipe.transform(inceptionObj));
                var dream2 = normalize(lang_1.Json.stringify(inceptionObj));
                matchers_1.expect(dream1).toEqual(dream2);
            });
        });
        testing_internal_1.describe('integration', function () {
            testing_internal_1.it('should work with mutable objects', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.createAsync(TestComp).then(function (fixture) {
                    var mutable = [1];
                    fixture.debugElement.componentInstance.data = mutable;
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('[\n  1\n]');
                    mutable.push(2);
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('[\n  1,\n  2\n]');
                    async.done();
                });
            }));
        });
    });
}
exports.main = main;
var TestComp = (function () {
    function TestComp() {
    }
    /** @nocollapse */
    TestComp.decorators = [
        { type: core_1.Component, args: [{ selector: 'test-comp', template: '{{data | json}}', pipes: [common_1.JsonPipe] },] },
    ];
    return TestComp;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbl9waXBlX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbW1vbi90ZXN0L3BpcGVzL2pzb25fcGlwZV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBb0csd0NBQXdDLENBQUMsQ0FBQTtBQUM3SSx5QkFBcUIsNENBQTRDLENBQUMsQ0FBQTtBQUNsRSx3QkFBbUMsdUJBQXVCLENBQUMsQ0FBQTtBQUMzRCxxQkFBa0MsdUJBQXVCLENBQUMsQ0FBQTtBQUUxRCxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMsdUJBQXVCLGlCQUFpQixDQUFDLENBQUE7QUFFekM7SUFDRSwyQkFBUSxDQUFDLFVBQVUsRUFBRTtRQUNuQixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxZQUFpQixDQUFDO1FBQ3RCLElBQUksa0JBQTBCLENBQUM7UUFDL0IsSUFBSSxJQUFjLENBQUM7UUFFbkIsbUJBQW1CLEdBQVcsSUFBWSxNQUFNLENBQUMsb0JBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFOUYsNkJBQVUsQ0FBQztZQUNULFlBQVksR0FBRyxFQUFDLEtBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUMsRUFBQyxFQUFDLENBQUM7WUFDbEQsa0JBQWtCLEdBQUcsS0FBSztnQkFDdEIsZ0JBQWdCO2dCQUNoQixrQkFBa0I7Z0JBQ2xCLDBCQUEwQjtnQkFDMUIsU0FBUztnQkFDVCxPQUFPO2dCQUNQLEdBQUcsQ0FBQztZQUdSLElBQUksR0FBRyxJQUFJLGlCQUFRLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUVILDJCQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3BCLHFCQUFFLENBQUMscUNBQXFDLEVB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