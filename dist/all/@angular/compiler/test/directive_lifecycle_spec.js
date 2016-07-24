/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var directive_lifecycle_reflector_1 = require('@angular/compiler/src/directive_lifecycle_reflector');
var lifecycle_hooks_1 = require('@angular/core/src/metadata/lifecycle_hooks');
function main() {
    testing_internal_1.describe('Create DirectiveMetadata', function () {
        testing_internal_1.describe('lifecycle', function () {
            testing_internal_1.describe('ngOnChanges', function () {
                testing_internal_1.it('should be true when the directive has the ngOnChanges method', function () {
                    testing_internal_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(lifecycle_hooks_1.LifecycleHooks.OnChanges, DirectiveWithOnChangesMethod))
                        .toBe(true);
                });
                testing_internal_1.it('should be false otherwise', function () {
                    testing_internal_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(lifecycle_hooks_1.LifecycleHooks.OnChanges, DirectiveNoHooks)).toBe(false);
                });
            });
            testing_internal_1.describe('ngOnDestroy', function () {
                testing_internal_1.it('should be true when the directive has the ngOnDestroy method', function () {
                    testing_internal_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(lifecycle_hooks_1.LifecycleHooks.OnDestroy, DirectiveWithOnDestroyMethod))
                        .toBe(true);
                });
                testing_internal_1.it('should be false otherwise', function () {
                    testing_internal_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(lifecycle_hooks_1.LifecycleHooks.OnDestroy, DirectiveNoHooks)).toBe(false);
                });
            });
            testing_internal_1.describe('ngOnInit', function () {
                testing_internal_1.it('should be true when the directive has the ngOnInit method', function () {
                    testing_internal_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(lifecycle_hooks_1.LifecycleHooks.OnInit, DirectiveWithOnInitMethod)).toBe(true);
                });
                testing_internal_1.it('should be false otherwise', function () {
                    testing_internal_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(lifecycle_hooks_1.LifecycleHooks.OnInit, DirectiveNoHooks)).toBe(false);
                });
            });
            testing_internal_1.describe('ngDoCheck', function () {
                testing_internal_1.it('should be true when the directive has the ngDoCheck method', function () {
                    testing_internal_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(lifecycle_hooks_1.LifecycleHooks.DoCheck, DirectiveWithOnCheckMethod)).toBe(true);
                });
                testing_internal_1.it('should be false otherwise', function () {
                    testing_internal_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(lifecycle_hooks_1.LifecycleHooks.DoCheck, DirectiveNoHooks)).toBe(false);
                });
            });
            testing_internal_1.describe('ngAfterContentInit', function () {
                testing_internal_1.it('should be true when the directive has the ngAfterContentInit method', function () {
                    testing_internal_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(lifecycle_hooks_1.LifecycleHooks.AfterContentInit, DirectiveWithAfterContentInitMethod))
                        .toBe(true);
                });
                testing_internal_1.it('should be false otherwise', function () {
                    testing_internal_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(lifecycle_hooks_1.LifecycleHooks.AfterContentInit, DirectiveNoHooks)).toBe(false);
                });
            });
            testing_internal_1.describe('ngAfterContentChecked', function () {
                testing_internal_1.it('should be true when the directive has the ngAfterContentChecked method', function () {
                    testing_internal_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(lifecycle_hooks_1.LifecycleHooks.AfterContentChecked, DirectiveWithAfterContentCheckedMethod))
                        .toBe(true);
                });
                testing_internal_1.it('should be false otherwise', function () {
                    testing_internal_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(lifecycle_hooks_1.LifecycleHooks.AfterContentChecked, DirectiveNoHooks))
                        .toBe(false);
                });
            });
            testing_internal_1.describe('ngAfterViewInit', function () {
                testing_internal_1.it('should be true when the directive has the ngAfterViewInit method', function () {
                    testing_internal_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(lifecycle_hooks_1.LifecycleHooks.AfterViewInit, DirectiveWithAfterViewInitMethod))
                        .toBe(true);
                });
                testing_internal_1.it('should be false otherwise', function () {
                    testing_internal_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(lifecycle_hooks_1.LifecycleHooks.AfterViewInit, DirectiveNoHooks)).toBe(false);
                });
            });
            testing_internal_1.describe('ngAfterViewChecked', function () {
                testing_internal_1.it('should be true when the directive has the ngAfterViewChecked method', function () {
                    testing_internal_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(lifecycle_hooks_1.LifecycleHooks.AfterViewChecked, DirectiveWithAfterViewCheckedMethod))
                        .toBe(true);
                });
                testing_internal_1.it('should be false otherwise', function () {
                    testing_internal_1.expect(directive_lifecycle_reflector_1.hasLifecycleHook(lifecycle_hooks_1.LifecycleHooks.AfterViewChecked, DirectiveNoHooks)).toBe(false);
                });
            });
        });
    });
}
exports.main = main;
var DirectiveNoHooks = (function () {
    function DirectiveNoHooks() {
    }
    return DirectiveNoHooks;
}());
var DirectiveWithOnChangesMethod = (function () {
    function DirectiveWithOnChangesMethod() {
    }
    DirectiveWithOnChangesMethod.prototype.ngOnChanges = function (_ /** TODO #9100 */) { };
    return DirectiveWithOnChangesMethod;
}());
var DirectiveWithOnInitMethod = (function () {
    function DirectiveWithOnInitMethod() {
    }
    DirectiveWithOnInitMethod.prototype.ngOnInit = function () { };
    return DirectiveWithOnInitMethod;
}());
var DirectiveWithOnCheckMethod = (function () {
    function DirectiveWithOnCheckMethod() {
    }
    DirectiveWithOnCheckMethod.prototype.ngDoCheck = function () { };
    return DirectiveWithOnCheckMethod;
}());
var DirectiveWithOnDestroyMethod = (function () {
    function DirectiveWithOnDestroyMethod() {
    }
    DirectiveWithOnDestroyMethod.prototype.ngOnDestroy = function () { };
    return DirectiveWithOnDestroyMethod;
}());
var DirectiveWithAfterContentInitMethod = (function () {
    function DirectiveWithAfterContentInitMethod() {
    }
    DirectiveWithAfterContentInitMethod.prototype.ngAfterContentInit = function () { };
    return DirectiveWithAfterContentInitMethod;
}());
var DirectiveWithAfterContentCheckedMethod = (function () {
    function DirectiveWithAfterContentCheckedMethod() {
    }
    DirectiveWithAfterContentCheckedMethod.prototype.ngAfterContentChecked = function () { };
    return DirectiveWithAfterContentCheckedMethod;
}());
var DirectiveWithAfterViewInitMethod = (function () {
    function DirectiveWithAfterViewInitMethod() {
    }
    DirectiveWithAfterViewInitMethod.prototype.ngAfterViewInit = function () { };
    return DirectiveWithAfterViewInitMethod;
}());
var DirectiveWithAfterViewCheckedMethod = (function () {
    function DirectiveWithAfterViewCheckedMethod() {
    }
    DirectiveWithAfterViewCheckedMethod.prototype.ngAfterViewChecked = function () { };
    return DirectiveWithAfterViewCheckedMethod;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlX2xpZmVjeWNsZV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci90ZXN0L2RpcmVjdGl2ZV9saWZlY3ljbGVfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQW1GLHdDQUF3QyxDQUFDLENBQUE7QUFFNUgsOENBQStCLHFEQUFxRCxDQUFDLENBQUE7QUFDckYsZ0NBQTZCLDRDQUE0QyxDQUFDLENBQUE7QUFFMUU7SUFDRSwyQkFBUSxDQUFDLDBCQUEwQixFQUFFO1FBQ25DLDJCQUFRLENBQUMsV0FBVyxFQUFFO1lBRXBCLDJCQUFRLENBQUMsYUFBYSxFQUFFO2dCQUN0QixxQkFBRSxDQUFDLDhEQUE4RCxFQUFFO29CQUNqRSx5QkFBTSxDQUFDLGdEQUFnQixDQUFDLGdDQUFjLENBQUMsU0FBUyxFQUFFLDRCQUE0QixDQUFDLENBQUM7eUJBQzNFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLENBQUM7Z0JBRUgscUJBQUUsQ0FBQywyQkFBMkIsRUFBRTtvQkFDOUIseUJBQU0sQ0FBQyxnREFBZ0IsQ0FBQyxnQ0FBYyxDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuRixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsMkJBQVEsQ0FBQyxhQUFhLEVBQUU7Z0JBQ3RCLHFCQUFFLENBQUMsOERBQThELEVBQUU7b0JBQ2pFLHlCQUFNLENBQUMsZ0RBQWdCLENBQUMsZ0NBQWMsQ0FBQyxTQUFTLEVBQUUsNEJBQTRCLENBQUMsQ0FBQzt5QkFDM0UsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsQ0FBQztnQkFFSCxxQkFBRSxDQUFDLDJCQUEyQixFQUFFO29C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