/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var ng_module_resolver_1 = require('@angular/compiler/src/ng_module_resolver');
var metadata_1 = require('@angular/core/src/metadata');
var lang_1 = require('../src/facade/lang');
var SomeClass1 = (function () {
    function SomeClass1() {
    }
    return SomeClass1;
}());
var SomeClass2 = (function () {
    function SomeClass2() {
    }
    return SomeClass2;
}());
var SomeClass3 = (function () {
    function SomeClass3() {
    }
    return SomeClass3;
}());
var SomeClass4 = (function () {
    function SomeClass4() {
    }
    return SomeClass4;
}());
var SomeClass5 = (function () {
    function SomeClass5() {
    }
    return SomeClass5;
}());
var SomeModule = (function () {
    function SomeModule() {
    }
    /** @nocollapse */
    SomeModule.decorators = [
        { type: metadata_1.NgModule, args: [{
                    declarations: [SomeClass1],
                    imports: [SomeClass2],
                    exports: [SomeClass3],
                    providers: [SomeClass4],
                    precompile: [SomeClass5]
                },] },
    ];
    return SomeModule;
}());
var SimpleClass = (function () {
    function SimpleClass() {
    }
    return SimpleClass;
}());
function main() {
    describe('NgModuleResolver', function () {
        var resolver;
        beforeEach(function () { resolver = new ng_module_resolver_1.NgModuleResolver(); });
        it('should read out the metadata from the class', function () {
            var viewMetadata = resolver.resolve(SomeModule);
            expect(viewMetadata).toEqual(new metadata_1.NgModuleMetadata({
                declarations: [SomeClass1],
                imports: [SomeClass2],
                exports: [SomeClass3],
                providers: [SomeClass4],
                precompile: [SomeClass5]
            }));
        });
        it('should throw when simple class has no component decorator', function () {
            expect(function () { return resolver.resolve(SimpleClass); })
                .toThrowError("No NgModule metadata found for '" + lang_1.stringify(SimpleClass) + "'.");
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kdWxlX3Jlc29sdmVyX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3Rlc3QvbmdfbW9kdWxlX3Jlc29sdmVyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILG1DQUErQiwwQ0FBMEMsQ0FBQyxDQUFBO0FBQzFFLHlCQUF5Qyw0QkFBNEIsQ0FBQyxDQUFBO0FBQ3RFLHFCQUF3QixvQkFBb0IsQ0FBQyxDQUFBO0FBRTdDO0lBQUE7SUFBa0IsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FBQyxBQUFuQixJQUFtQjtBQUNuQjtJQUFBO0lBQWtCLENBQUM7SUFBRCxpQkFBQztBQUFELENBQUMsQUFBbkIsSUFBbUI7QUFDbkI7SUFBQTtJQUFrQixDQUFDO0lBQUQsaUJBQUM7QUFBRCxDQUFDLEFBQW5CLElBQW1CO0FBQ25CO0lBQUE7SUFBa0IsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FBQyxBQUFuQixJQUFtQjtBQUNuQjtJQUFBO0lBQWtCLENBQUM7SUFBRCxpQkFBQztBQUFELENBQUMsQUFBbkIsSUFBbUI7QUFDbkI7SUFBQTtJQVdBLENBQUM7SUFWRCxrQkFBa0I7SUFDWCxxQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxtQkFBUSxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQzFCLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDckIsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNyQixTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQ3ZCLFVBQVUsRUFBRSxDQUFDLFVBQVUsQ0FBQztpQkFDekIsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGlCQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7QUFFRDtJQUFBO0lBQW1CLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFBcEIsSUFBb0I7QUFFcEI7SUFDRSxRQUFRLENBQUMsa0JBQWtCLEVBQUU7UUFDM0IsSUFBSSxRQUEwQixDQUFDO1FBRS9CLFVBQVUsQ0FBQyxjQUFRLFFBQVEsR0FBRyxJQUFJLHFDQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV6RCxFQUFFLENBQUMsNkNBQTZDLEVBQUU7WUFDaEQsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksMkJBQWdCLENBQUM7Z0JBQ2hELFlBQVksRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDMUIsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUNyQixPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3JCLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDdkIsVUFBVSxFQUFFLENBQUMsVUFBVSxDQUFDO2FBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsMkRBQTJELEVBQUU7WUFDOUQsTUFBTSxDQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUE3QixDQUE2QixDQUFDO2lCQUN0QyxZQUFZLENBQUMscUNBQW1DLGdCQUFTLENBQUMsV0FBVyxDQUFDLE9BQUksQ0FBQyxDQUFDO1FBQ25GLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBdEJlLFlBQUksT0FzQm5CLENBQUEifQ==