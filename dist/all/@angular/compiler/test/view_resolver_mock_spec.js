/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var lang_1 = require('../src/facade/lang');
var testing_1 = require('../testing');
var core_1 = require('@angular/core');
function main() {
    testing_internal_1.describe('MockViewResolver', function () {
        var viewResolver;
        testing_internal_1.beforeEach(testing_internal_1.inject([core_1.Injector], function (injector) { viewResolver = new testing_1.MockViewResolver(injector); }));
        testing_internal_1.describe('View overriding', function () {
            testing_internal_1.it('should fallback to the default ViewResolver when templates are not overridden', function () {
                var view = viewResolver.resolve(SomeComponent);
                testing_internal_1.expect(view.template).toEqual('template');
                testing_internal_1.expect(view.directives).toEqual([SomeDirective]);
            });
            testing_internal_1.it('should allow overriding the @View', function () {
                viewResolver.setView(SomeComponent, new core_1.ViewMetadata({ template: 'overridden template' }));
                var view = viewResolver.resolve(SomeComponent);
                testing_internal_1.expect(view.template).toEqual('overridden template');
                testing_internal_1.expect(lang_1.isBlank(view.directives)).toBe(true);
            });
            testing_internal_1.it('should allow overriding a view after it has been resolved', function () {
                viewResolver.resolve(SomeComponent);
                viewResolver.setView(SomeComponent, new core_1.ViewMetadata({ template: 'overridden template' }));
                var view = viewResolver.resolve(SomeComponent);
                testing_internal_1.expect(view.template).toEqual('overridden template');
                testing_internal_1.expect(lang_1.isBlank(view.directives)).toBe(true);
            });
        });
        testing_internal_1.describe('inline template definition overriding', function () {
            testing_internal_1.it('should allow overriding the default template', function () {
                viewResolver.setInlineTemplate(SomeComponent, 'overridden template');
                var view = viewResolver.resolve(SomeComponent);
                testing_internal_1.expect(view.template).toEqual('overridden template');
                testing_internal_1.expect(view.directives).toEqual([SomeDirective]);
            });
            testing_internal_1.it('should allow overriding an overridden @View', function () {
                viewResolver.setView(SomeComponent, new core_1.ViewMetadata({ template: 'overridden template' }));
                viewResolver.setInlineTemplate(SomeComponent, 'overridden template x 2');
                var view = viewResolver.resolve(SomeComponent);
                testing_internal_1.expect(view.template).toEqual('overridden template x 2');
            });
            testing_internal_1.it('should allow overriding a view after it has been resolved', function () {
                viewResolver.resolve(SomeComponent);
                viewResolver.setInlineTemplate(SomeComponent, 'overridden template');
                var view = viewResolver.resolve(SomeComponent);
                testing_internal_1.expect(view.template).toEqual('overridden template');
            });
        });
        testing_internal_1.describe('Directive overriding', function () {
            testing_internal_1.it('should allow overriding a directive from the default view', function () {
                viewResolver.overrideViewDirective(SomeComponent, SomeDirective, SomeOtherDirective);
                var view = viewResolver.resolve(SomeComponent);
                testing_internal_1.expect(view.directives.length).toEqual(1);
                testing_internal_1.expect(view.directives[0]).toBe(SomeOtherDirective);
            });
            testing_internal_1.it('should allow overriding a directive from an overridden @View', function () {
                viewResolver.setView(SomeComponent, new core_1.ViewMetadata({ directives: [SomeOtherDirective] }));
                viewResolver.overrideViewDirective(SomeComponent, SomeOtherDirective, SomeComponent);
                var view = viewResolver.resolve(SomeComponent);
                testing_internal_1.expect(view.directives.length).toEqual(1);
                testing_internal_1.expect(view.directives[0]).toBe(SomeComponent);
            });
            testing_internal_1.it('should throw when the overridden directive is not present', function () {
                viewResolver.overrideViewDirective(SomeComponent, SomeOtherDirective, SomeDirective);
                testing_internal_1.expect(function () { viewResolver.resolve(SomeComponent); })
                    .toThrowError("Overriden directive " + lang_1.stringify(SomeOtherDirective) + " not found in the template of " + lang_1.stringify(SomeComponent));
            });
            testing_internal_1.it('should allow overriding a directive after its view has been resolved', function () {
                viewResolver.resolve(SomeComponent);
                viewResolver.overrideViewDirective(SomeComponent, SomeDirective, SomeOtherDirective);
                var view = viewResolver.resolve(SomeComponent);
                testing_internal_1.expect(view.directives.length).toEqual(1);
                testing_internal_1.expect(view.directives[0]).toBe(SomeOtherDirective);
            });
        });
    });
}
exports.main = main;
var SomeDirective = (function () {
    function SomeDirective() {
    }
    return SomeDirective;
}());
var SomeComponent = (function () {
    function SomeComponent() {
    }
    /** @nocollapse */
    SomeComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'cmp',
                    template: 'template',
                    directives: [SomeDirective],
                },] },
    ];
    return SomeComponent;
}());
var SomeOtherDirective = (function () {
    function SomeOtherDirective() {
    }
    return SomeOtherDirective;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld19yZXNvbHZlcl9tb2NrX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3Rlc3Qvdmlld19yZXNvbHZlcl9tb2NrX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUF3RSx3Q0FBd0MsQ0FBQyxDQUFBO0FBRWpILHFCQUFpQyxvQkFBb0IsQ0FBQyxDQUFBO0FBQ3RELHdCQUErQixZQUFZLENBQUMsQ0FBQTtBQUM1QyxxQkFBZ0QsZUFBZSxDQUFDLENBQUE7QUFFaEU7SUFDRSwyQkFBUSxDQUFDLGtCQUFrQixFQUFFO1FBQzNCLElBQUksWUFBOEIsQ0FBQztRQUVuQyw2QkFBVSxDQUFDLHlCQUFNLENBQ2IsQ0FBQyxlQUFRLENBQUMsRUFBRSxVQUFDLFFBQWtCLElBQU8sWUFBWSxHQUFHLElBQUksMEJBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTdGLDJCQUFRLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIscUJBQUUsQ0FBQywrRUFBK0UsRUFBRTtnQkFDbEYsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDL0MseUJBQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMxQyx5QkFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ25ELENBQUMsQ0FBQyxDQUFDO1lBRUgscUJBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtnQkFDdEMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxtQkFBWSxDQUFDLEVBQUMsUUFBUSxFQUFFLHFCQUFxQixFQUFDLENBQUMsQ0FBQyxDQUFDO2dC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