/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var metadata_1 = require('@angular/core/src/metadata');
var testing_1 = require('@angular/core/testing');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
function main() {
    testing_internal_1.describe('directive lifecycle integration spec', function () {
        testing_internal_1.beforeEachProviders(function () { return [testing_internal_1.Log]; });
        testing_internal_1.it('should invoke lifecycle methods ngOnChanges > ngOnInit > ngDoCheck > ngAfterContentChecked', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.Log, testing_internal_1.AsyncTestCompleter], function (tcb, log, async) {
            tcb.overrideView(MyComp5, new metadata_1.ViewMetadata({
                template: '<div [field]="123" lifecycle></div>',
                directives: [LifecycleCmp]
            }))
                .createAsync(MyComp5)
                .then(function (tc) {
                tc.detectChanges();
                testing_internal_1.expect(log.result())
                    .toEqual('ngOnChanges; ngOnInit; ngDoCheck; ngAfterContentInit; ngAfterContentChecked; child_ngDoCheck; ' +
                    'ngAfterViewInit; ngAfterViewChecked');
                log.clear();
                tc.detectChanges();
                testing_internal_1.expect(log.result())
                    .toEqual('ngDoCheck; ngAfterContentChecked; child_ngDoCheck; ngAfterViewChecked');
                async.done();
            });
        }));
    });
}
exports.main = main;
var LifecycleDir = (function () {
    function LifecycleDir(_log) {
        this._log = _log;
    }
    LifecycleDir.prototype.ngDoCheck = function () { this._log.add('child_ngDoCheck'); };
    /** @nocollapse */
    LifecycleDir.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[lifecycle-dir]' },] },
    ];
    /** @nocollapse */
    LifecycleDir.ctorParameters = [
        { type: testing_internal_1.Log, },
    ];
    return LifecycleDir;
}());
var LifecycleCmp = (function () {
    function LifecycleCmp(_log) {
        this._log = _log;
    }
    LifecycleCmp.prototype.ngOnChanges = function (_ /** TODO #9100 */) { this._log.add('ngOnChanges'); };
    LifecycleCmp.prototype.ngOnInit = function () { this._log.add('ngOnInit'); };
    LifecycleCmp.prototype.ngDoCheck = function () { this._log.add('ngDoCheck'); };
    LifecycleCmp.prototype.ngAfterContentInit = function () { this._log.add('ngAfterContentInit'); };
    LifecycleCmp.prototype.ngAfterContentChecked = function () { this._log.add('ngAfterContentChecked'); };
    LifecycleCmp.prototype.ngAfterViewInit = function () { this._log.add('ngAfterViewInit'); };
    LifecycleCmp.prototype.ngAfterViewChecked = function () { this._log.add('ngAfterViewChecked'); };
    /** @nocollapse */
    LifecycleCmp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: '[lifecycle]',
                    inputs: ['field'],
                    template: "<div lifecycle-dir></div>",
                    directives: [LifecycleDir]
                },] },
    ];
    /** @nocollapse */
    LifecycleCmp.ctorParameters = [
        { type: testing_internal_1.Log, },
    ];
    return LifecycleCmp;
}());
var MyComp5 = (function () {
    function MyComp5() {
    }
    /** @nocollapse */
    MyComp5.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'my-comp', directives: [] },] },
    ];
    return MyComp5;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlX2xpZmVjeWNsZV9pbnRlZ3JhdGlvbl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvZGlyZWN0aXZlX2xpZmVjeWNsZV9pbnRlZ3JhdGlvbl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFHSCx5QkFBaUQsNEJBQTRCLENBQUMsQ0FBQTtBQUM5RSx3QkFBbUMsdUJBQXVCLENBQUMsQ0FBQTtBQUMzRCxpQ0FBcUksd0NBQXdDLENBQUMsQ0FBQTtBQUU5SztJQUNFLDJCQUFRLENBQUMsc0NBQXNDLEVBQUU7UUFFL0Msc0NBQW1CLENBQUMsY0FBUSxNQUFNLENBQUMsQ0FBQyxzQkFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU3QyxxQkFBRSxDQUFDLDRGQUE0RixFQUM1Rix5QkFBTSxDQUNGLENBQUMsOEJBQW9CLEVBQUUsc0JBQUcsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMvQyxVQUFDLEdBQXlCLEVBQUUsR0FBUSxFQUFFLEtBQXlCO1lBQzdELEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksdUJBQVksQ0FBQztnQkFDeEIsUUFBUSxFQUFFLHFDQUFxQztnQkFDL0MsVUFBVSxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQzNCLENBQUMsQ0FBQztpQkFDZixXQUFXLENBQUMsT0FBTyxDQUFDO2lCQUNwQixJQUFJLENBQUMsVUFBQyxFQUFFO2dCQUNQLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFFbkIseUJBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ2YsT0FBTyxDQUNKLGdHQUFnRztvQkFDaEcscUNBQXFDLENBQUMsQ0FBQztnQkFFL0MsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNaLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFFbkIseUJB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