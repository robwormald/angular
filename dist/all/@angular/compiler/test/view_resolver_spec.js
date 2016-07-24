/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var view_resolver_1 = require('@angular/compiler/src/view_resolver');
var metadata_1 = require('@angular/core/src/metadata');
var SomeDir = (function () {
    function SomeDir() {
    }
    return SomeDir;
}());
var SomePipe = (function () {
    function SomePipe() {
    }
    return SomePipe;
}());
var ComponentWithTemplate = (function () {
    function ComponentWithTemplate() {
    }
    /** @nocollapse */
    ComponentWithTemplate.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'sample',
                    template: 'some template',
                    directives: [SomeDir],
                    pipes: [SomePipe],
                    styles: ['some styles']
                },] },
    ];
    return ComponentWithTemplate;
}());
var ComponentWithoutView = (function () {
    function ComponentWithoutView() {
    }
    /** @nocollapse */
    ComponentWithoutView.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'sample' },] },
    ];
    return ComponentWithoutView;
}());
var SimpleClass = (function () {
    function SimpleClass() {
    }
    return SimpleClass;
}());
function main() {
    describe('ViewResolver', function () {
        var resolver;
        beforeEach(function () { resolver = new view_resolver_1.ViewResolver(); });
        it('should read out the View metadata from the Component metadata', function () {
            var viewMetadata = resolver.resolve(ComponentWithTemplate);
            expect(viewMetadata).toEqual(new metadata_1.ViewMetadata({
                template: 'some template',
                directives: [SomeDir],
                pipes: [SomePipe],
                styles: ['some styles']
            }));
        });
        it('should throw when Component has neither template nor templateUrl set', function () {
            expect(function () { return resolver.resolve(ComponentWithoutView); })
                .toThrowError(/Component 'ComponentWithoutView' must have either 'template' or 'templateUrl' set/);
        });
        it('should throw when simple class has no component decorator', function () {
            expect(function () { return resolver.resolve(SimpleClass); })
                .toThrowError('Could not compile \'SimpleClass\' because it is not a component.');
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld19yZXNvbHZlcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci90ZXN0L3ZpZXdfcmVzb2x2ZXJfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsOEJBQTJCLHFDQUFxQyxDQUFDLENBQUE7QUFDakUseUJBQXNDLDRCQUE0QixDQUFDLENBQUE7QUFFbkU7SUFBQTtJQUFlLENBQUM7SUFBRCxjQUFDO0FBQUQsQ0FBQyxBQUFoQixJQUFnQjtBQUNoQjtJQUFBO0lBQWdCLENBQUM7SUFBRCxlQUFDO0FBQUQsQ0FBQyxBQUFqQixJQUFpQjtBQUNqQjtJQUFBO0lBV0EsQ0FBQztJQVZELGtCQUFrQjtJQUNYLGdDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLG9CQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxRQUFRO29CQUNsQixRQUFRLEVBQUUsZUFBZTtvQkFDekIsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUNyQixLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUM7b0JBQ2pCLE1BQU0sRUFBRSxDQUFDLGFBQWEsQ0FBQztpQkFDeEIsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLDRCQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7QUFDRDtJQUFBO0lBS0EsQ0FBQztJQUpELGtCQUFrQjtJQUNYLCtCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLG9CQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLEVBQUcsRUFBRTtLQUNsRCxDQUFDO0lBQ0YsMkJBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUdEO0lBQUE7SUFBbUIsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQUFwQixJQUFvQjtBQUVwQjtJQUNFLFFBQVEsQ0FBQyxjQUFjLEVBQUU7UUFDdkIsSUFBSSxRQUFzQixDQUFDO1FBRTNCLFVBQVUsQ0FBQyxjQUFRLFFBQVEsR0FBRyxJQUFJLDRCQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXJELEVBQUUsQ0FBQywrREFBK0QsRUFBRTtZQUNsRSxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDM0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLHVCQUFZLENBQUM7Z0JBQzVDLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ3JCLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDakIsTUFBTSxFQUFFLENBQUMsYUFBYSxDQUFDO2FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsc0VBQXNFLEVBQUU7WUFDekUsTUFBTSxDQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEVBQXRDLENBQXNDLENBQUM7aUJBQy9DLFlBQVksQ0FDVCxtRkFBbUYsQ0FBQyxDQUFDO1FBQy9GLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDJEQUEyRCxFQUFFO1lBQzlELE1BQU0sQ0FBQyxjQUFNLE9BQUEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQztpQkFDdEMsWUFBWSxDQUFDLGtFQUFrRSxDQUFDLENBQUM7UUFDeEYsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUEzQmUsWUFBSSxPQTJCbkIsQ0FBQSJ9