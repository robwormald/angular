/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var decorators_1 = require('@angular/core/src/util/decorators');
var lang_1 = require('../../src/facade/lang');
var core_1 = require('@angular/core');
var reflection_1 = require('@angular/core/src/reflection/reflection');
var TestAnnotation = (function () {
    function TestAnnotation(arg) {
        this.arg = arg;
    }
    return TestAnnotation;
}());
var TerminalAnnotation = (function () {
    function TerminalAnnotation() {
        this.terminal = true;
    }
    return TerminalAnnotation;
}());
var DecoratedParent = (function () {
    function DecoratedParent() {
    }
    return DecoratedParent;
}());
var DecoratedChild = (function (_super) {
    __extends(DecoratedChild, _super);
    function DecoratedChild() {
        _super.apply(this, arguments);
    }
    return DecoratedChild;
}(DecoratedParent));
function main() {
    var Reflect = lang_1.global.Reflect;
    var TerminalDecorator = decorators_1.makeDecorator(TerminalAnnotation);
    var TestDecorator = decorators_1.makeDecorator(TestAnnotation, function (fn) { return fn.Terminal = TerminalDecorator; });
    testing_internal_1.describe('decorators', function () {
        testing_internal_1.it('should invoke as decorator', function () {
            function Type() { }
            TestDecorator({ marker: 'WORKS' })(Type);
            var annotations = Reflect.getMetadata('annotations', Type);
            testing_internal_1.expect(annotations[0].arg.marker).toEqual('WORKS');
        });
        testing_internal_1.it('should invoke as new', function () {
            var annotation = new TestDecorator({ marker: 'WORKS' });
            testing_internal_1.expect(annotation instanceof TestAnnotation).toEqual(true);
            testing_internal_1.expect(annotation.arg.marker).toEqual('WORKS');
        });
        testing_internal_1.it('should invoke as chain', function () {
            var chain = TestDecorator({ marker: 'WORKS' });
            testing_internal_1.expect(typeof chain.Terminal).toEqual('function');
            chain = chain.Terminal();
            testing_internal_1.expect(chain.annotations[0] instanceof TestAnnotation).toEqual(true);
            testing_internal_1.expect(chain.annotations[0].arg.marker).toEqual('WORKS');
            testing_internal_1.expect(chain.annotations[1] instanceof TerminalAnnotation).toEqual(true);
        });
        testing_internal_1.it('should not apply decorators from the prototype chain', function () {
            TestDecorator({ marker: 'parent' })(DecoratedParent);
            TestDecorator({ marker: 'child' })(DecoratedChild);
            var annotations = Reflect.getOwnMetadata('annotations', DecoratedChild);
            testing_internal_1.expect(annotations.length).toBe(1);
            testing_internal_1.expect(annotations[0].arg.marker).toEqual('child');
        });
        testing_internal_1.describe('Class', function () {
            testing_internal_1.it('should create a class', function () {
                var i0 /** TODO #9100 */, i1;
                var MyClass = TestDecorator('test-works').Class({
                    extends: decorators_1.Class({
                        constructor: function () { },
                        extendWorks: function () { return 'extend ' + this.arg; }
                    }),
                    constructor: [String, function (arg /** TODO #9100 */) { this.arg = arg; }],
                    methodA: [
                        i0 = new core_1.Inject(String), [i1 = core_1.Inject(String), Number],
                        function (a /** TODO #9100 */, b /** TODO #9100 */) { }
                    ],
                    works: function () { return this.arg; },
                    prototype: 'IGNORE'
                });
                var obj = new MyClass('WORKS');
                testing_internal_1.expect(obj.arg).toEqual('WORKS');
                testing_internal_1.expect(obj.works()).toEqual('WORKS');
                testing_internal_1.expect(obj.extendWorks()).toEqual('extend WORKS');
                testing_internal_1.expect(reflection_1.reflector.parameters(MyClass)).toEqual([[String]]);
                testing_internal_1.expect(reflection_1.reflector.parameters(obj.methodA)).toEqual([[i0], [i1.annotation, Number]]);
                var proto = MyClass.prototype;
                testing_internal_1.expect(proto.extends).toEqual(undefined);
                testing_internal_1.expect(proto.prototype).toEqual(undefined);
                testing_internal_1.expect(reflection_1.reflector.annotations(MyClass)[0].arg).toEqual('test-works');
            });
            testing_internal_1.describe('errors', function () {
                testing_internal_1.it('should ensure that last constructor is required', function () {
                    testing_internal_1.expect(function () { decorators_1.Class({}); })
                        .toThrowError('Only Function or Array is supported in Class definition for key \'constructor\' is \'undefined\'');
                });
                testing_internal_1.it('should ensure that we dont accidently patch native objects', function () {
                    testing_internal_1.expect(function () {
                        decorators_1.Class({ constructor: Object });
                    }).toThrowError('Can not use native Object as constructor');
                });
                testing_internal_1.it('should ensure that last position is function', function () {
                    testing_internal_1.expect(function () { decorators_1.Class({ constructor: [] }); })
                        .toThrowError('Last position of Class method array must be Function in key constructor was \'undefined\'');
                });
                testing_internal_1.it('should ensure that annotation count matches parameters count', function () {
                    testing_internal_1.expect(function () {
                        decorators_1.Class({ constructor: [String, function MyType() { }] });
                    })
                        .toThrowError('Number of annotations (1) does not match number of arguments (0) in the function: MyType');
                });
                testing_internal_1.it('should ensure that only Function|Arrays are supported', function () {
                    testing_internal_1.expect(function () { decorators_1.Class({ constructor: function () { }, method: 'non_function' }); })
                        .toThrowError('Only Function or Array is supported in Class definition for key \'method\' is \'non_function\'');
                });
                testing_internal_1.it('should ensure that extends is a Function', function () {
                    testing_internal_1.expect(function () { decorators_1.Class({ extends: 'non_type', constructor: function () { } }); })
                        .toThrowError('Class definition \'extends\' property must be a constructor function was: non_type');
                });
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9yc19zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvdXRpbC9kZWNvcmF0b3JzX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsaUNBQTZFLHdDQUF3QyxDQUFDLENBQUE7QUFFdEgsMkJBQXVELG1DQUFtQyxDQUFDLENBQUE7QUFDM0YscUJBQXFCLHVCQUF1QixDQUFDLENBQUE7QUFDN0MscUJBQXFCLGVBQWUsQ0FBQyxDQUFBO0FBQ3JDLDJCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBRWxFO0lBQ0Usd0JBQW1CLEdBQVE7UUFBUixRQUFHLEdBQUgsR0FBRyxDQUFLO0lBQUcsQ0FBQztJQUNqQyxxQkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRUQ7SUFBQTtRQUNFLGFBQVEsR0FBRyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUFELHlCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFFRDtJQUFBO0lBQXVCLENBQUM7SUFBRCxzQkFBQztBQUFELENBQUMsQUFBeEIsSUFBd0I7QUFDeEI7SUFBNkIsa0NBQWU7SUFBNUM7UUFBNkIsOEJBQWU7SUFBRSxDQUFDO0lBQUQscUJBQUM7QUFBRCxDQUFDLEFBQS9DLENBQTZCLGVBQWUsR0FBRztBQUUvQztJQUNFLElBQUksT0FBTyxHQUFHLGFBQU0sQ0FBQyxPQUFPLENBQUM7SUFFN0IsSUFBSSxpQkFBaUIsR0FBRywwQkFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDMUQsSUFBSSxhQUFhLEdBQUcsMEJBQWEsQ0FBQyxjQUFjLEVBQUUsVUFBQyxFQUFPLElBQUssT0FBQSxFQUFFLENBQUMsUUFBUSxHQUFHLGlCQUFpQixFQUEvQixDQUErQixDQUFDLENBQUM7SUFFaEcsMkJBQVEsQ0FBQyxZQUFZLEVBQUU7UUFDckIscUJBQUUsQ0FBQyw0QkFBNEIs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