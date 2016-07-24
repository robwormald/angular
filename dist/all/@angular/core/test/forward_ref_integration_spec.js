/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
function main() {
    testing_internal_1.describe('forwardRef integration', function () {
        testing_internal_1.it('should instantiate components which are declared using forwardRef', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(App).then(function (tc) {
                tc.detectChanges();
                matchers_1.expect(core_1.asNativeElements(tc.debugElement.children)).toHaveText('frame(lock)');
                async.done();
            });
        }));
    });
}
exports.main = main;
var App = (function () {
    function App() {
    }
    /** @nocollapse */
    App.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app',
                    viewProviders: [core_1.forwardRef(function () { return Frame; })],
                    template: "<door><lock></lock></door>",
                    directives: [core_1.forwardRef(function () { return Door; }), core_1.forwardRef(function () { return Lock; })],
                },] },
    ];
    return App;
}());
var Door = (function () {
    function Door(locks, frame) {
        this.frame = frame;
        this.locks = locks;
    }
    /** @nocollapse */
    Door.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'lock',
                    directives: [common_1.NgFor],
                    template: "{{frame.name}}(<span *ngFor=\"let  lock of locks\">{{lock.name}}</span>)",
                },] },
    ];
    /** @nocollapse */
    Door.ctorParameters = [
        { type: core_1.QueryList, decorators: [{ type: core_1.Query, args: [core_1.forwardRef(function () { return Lock; }),] },] },
        { type: Frame, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return Frame; }),] },] },
    ];
    return Door;
}());
var Frame = (function () {
    function Frame() {
        this.name = 'frame';
    }
    return Frame;
}());
var Lock = (function () {
    function Lock() {
        this.name = 'lock';
    }
    /** @nocollapse */
    Lock.decorators = [
        { type: core_1.Directive, args: [{ selector: 'lock' },] },
    ];
    return Lock;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yd2FyZF9yZWZfaW50ZWdyYXRpb25fc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0L2ZvcndhcmRfcmVmX2ludGVncmF0aW9uX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHVCQUFvQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3RDLHFCQUE2SCxlQUFlLENBQUMsQ0FBQTtBQUM3SSx3QkFBbUMsdUJBQXVCLENBQUMsQ0FBQTtBQUMzRCxpQ0FBd0Ysd0NBQXdDLENBQUMsQ0FBQTtBQUNqSSx5QkFBcUIsNENBQTRDLENBQUMsQ0FBQTtBQUVsRTtJQUNFLDJCQUFRLENBQUMsd0JBQXdCLEVBQUU7UUFDakMscUJBQUUsQ0FBQyxtRUFBbUUsRUFDbkUseUJBQU0sQ0FDRixDQUFDLDhCQUFvQixFQUFFLHFDQUFrQixDQUFDLEVBQzFDLFVBQUMsR0FBeUIsRUFBRSxLQUF5QjtZQUNuRCxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEVBQUU7Z0JBQzNCLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDbkIsaUJBQU0sQ0FBQyx1QkFBZ0IsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM3RSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDYixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFiZSxZQUFJLE9BYW5CLENBQUE7QUFDRDtJQUFBO0lBVUEsQ0FBQztJQVRELGtCQUFrQjtJQUNYLGNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLEtBQUs7b0JBQ2YsYUFBYSxFQUFFLENBQUMsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FBQyxDQUFDO29CQUN4QyxRQUFRLEVBQUUsNEJBQTRCO29CQUN0QyxVQUFVLEVBQUUsQ0FBQyxpQkFBVSxDQUFDLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDLEVBQUUsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQyxDQUFDO2lCQUM3RCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0YsVUFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBQ0Q7SUFJRSxjQUFhLEtBQXNCLEVBQUUsS0FBWTtRQUMvQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsZUFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsTUFBTTtvQkFDaEIsVUFBVSxFQUFFLENBQUMsY0FBSyxDQUFDO29CQUNuQixRQUFRLEVBQUUsMEVBQXdFO2lCQUNuRixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsbUJBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQyxFQUFHLEVBQUUsRUFBRyxFQUFDO1FBQ3BGLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FBQyxFQUFHLEVBQUUsRUFBRyxFQUFDO0tBQ2pGLENBQUM7SUFDRixXQUFDO0FBQUQsQ0FBQyxBQXJCRCxJQXFCQztBQUVEO0lBQUE7UUFDRSxTQUFJLEdBQVcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFBRCxZQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFDRDtJQUFBO1FBQ0UsU0FBSSxHQUFXLE1BQU0sQ0FBQztJQUt4QixDQUFDO0lBSkQsa0JBQWtCO0lBQ1gsZUFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBQyxFQUFHLEVBQUU7S0FDaEQsQ0FBQztJQUNGLFdBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQyJ9