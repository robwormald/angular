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
var reflection_1 = require('@angular/core/src/reflection/reflection');
var reflection_capabilities_1 = require('@angular/core/src/reflection/reflection_capabilities');
var reflector_common_1 = require('./reflector_common');
var lang_1 = require('../../src/facade/lang');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
var AType = (function () {
    function AType(value /** TODO #9100 */) {
        this.value = value;
    }
    return AType;
}());
var ClassWithDecorators = (function () {
    function ClassWithDecorators(a, b) {
        this.a = a;
        this.b = b;
    }
    Object.defineProperty(ClassWithDecorators.prototype, "c", {
        set: function (value /** TODO #9100 */) { },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    ClassWithDecorators.decorators = [
        { type: reflector_common_1.ClassDecorator, args: ['class',] },
    ];
    /** @nocollapse */
    ClassWithDecorators.ctorParameters = [
        { type: AType, decorators: [{ type: reflector_common_1.ParamDecorator, args: ['a',] },] },
        { type: AType, decorators: [{ type: reflector_common_1.ParamDecorator, args: ['b',] },] },
    ];
    /** @nocollapse */
    ClassWithDecorators.propDecorators = {
        'a': [{ type: reflector_common_1.PropDecorator, args: ['p1',] }, { type: reflector_common_1.PropDecorator, args: ['p2',] },],
        'c': [{ type: reflector_common_1.PropDecorator, args: ['p3',] },],
    };
    return ClassWithDecorators;
}());
var ClassWithoutDecorators = (function () {
    function ClassWithoutDecorators(a /** TODO #9100 */, b /** TODO #9100 */) {
    }
    return ClassWithoutDecorators;
}());
var TestObj = (function () {
    function TestObj(a /** TODO #9100 */, b /** TODO #9100 */) {
        this.a = a;
        this.b = b;
    }
    TestObj.prototype.identity = function (arg /** TODO #9100 */) { return arg; };
    return TestObj;
}());
var Interface = (function () {
    function Interface() {
    }
    return Interface;
}());
var Interface2 = (function () {
    function Interface2() {
    }
    return Interface2;
}());
var SuperClassImplementingInterface = (function () {
    function SuperClassImplementingInterface() {
    }
    return SuperClassImplementingInterface;
}());
var ClassImplementingInterface = (function (_super) {
    __extends(ClassImplementingInterface, _super);
    function ClassImplementingInterface() {
        _super.apply(this, arguments);
    }
    return ClassImplementingInterface;
}(SuperClassImplementingInterface));
// Classes used to test our runtime check for classes that implement lifecycle interfaces but do not
// declare them.
// See https://github.com/angular/angular/pull/6879 and https://goo.gl/b07Kii for details.
var ClassDoesNotDeclareOnInit = (function () {
    function ClassDoesNotDeclareOnInit() {
    }
    ClassDoesNotDeclareOnInit.prototype.ngOnInit = function () { };
    return ClassDoesNotDeclareOnInit;
}());
var SuperClassImplementingOnInit = (function () {
    function SuperClassImplementingOnInit() {
    }
    SuperClassImplementingOnInit.prototype.ngOnInit = function () { };
    return SuperClassImplementingOnInit;
}());
var SubClassDoesNotDeclareOnInit = (function (_super) {
    __extends(SubClassDoesNotDeclareOnInit, _super);
    function SubClassDoesNotDeclareOnInit() {
        _super.apply(this, arguments);
    }
    return SubClassDoesNotDeclareOnInit;
}(SuperClassImplementingOnInit));
function main() {
    testing_internal_1.describe('Reflector', function () {
        var reflector;
        testing_internal_1.beforeEach(function () { reflector = new reflection_1.Reflector(new reflection_capabilities_1.ReflectionCapabilities()); });
        testing_internal_1.describe('usage tracking', function () {
            testing_internal_1.beforeEach(function () { reflector = new reflection_1.Reflector(null); });
            testing_internal_1.it('should be disabled by default', function () {
                testing_internal_1.expect(function () { return reflector.listUnusedKeys(); }).toThrowError('Usage tracking is disabled');
            });
            testing_internal_1.it('should report unused keys', function () {
                reflector.trackUsage();
                testing_internal_1.expect(reflector.listUnusedKeys()).toEqual([]);
                reflector.registerType(AType, new reflection_1.ReflectionInfo(null, null, function () { return 'AType'; }));
                reflector.registerType(TestObj, new reflection_1.ReflectionInfo(null, null, function () { return 'TestObj'; }));
                testing_internal_1.expect(reflector.listUnusedKeys()).toEqual([AType, TestObj]);
                reflector.factory(AType);
                testing_internal_1.expect(reflector.listUnusedKeys()).toEqual([TestObj]);
                reflector.factory(TestObj);
                testing_internal_1.expect(reflector.listUnusedKeys()).toEqual([]);
            });
        });
        testing_internal_1.describe('factory', function () {
            testing_internal_1.it('should create a factory for the given type', function () {
                var obj = reflector.factory(TestObj)(1, 2);
                testing_internal_1.expect(obj.a).toEqual(1);
                testing_internal_1.expect(obj.b).toEqual(2);
            });
            // Makes Edge to disconnect when running the full unit test campaign
            // TODO: remove when issue is solved: https://github.com/angular/angular/issues/4756
            if (!browser_util_1.browserDetection.isEdge) {
                testing_internal_1.it('should check args from no to max', function () {
                    var f = function (t /** TODO #9100 */) { return reflector.factory(t); };
                    var checkArgs = function (obj /** TODO #9100 */, args /** TODO #9100 */) {
                        return testing_internal_1.expect(obj.args).toEqual(args);
                    };
                    // clang-format off
                    checkArgs(f(TestObjWith00Args)(), []);
                    checkArgs(f(TestObjWith01Args)(1), [1]);
                    checkArgs(f(TestObjWith02Args)(1, 2), [1, 2]);
                    checkArgs(f(TestObjWith03Args)(1, 2, 3), [1, 2, 3]);
                    checkArgs(f(TestObjWith04Args)(1, 2, 3, 4), [1, 2, 3, 4]);
                    checkArgs(f(TestObjWith05Args)(1, 2, 3, 4, 5), [1, 2, 3, 4, 5]);
                    checkArgs(f(TestObjWith06Args)(1, 2, 3, 4, 5, 6), [1, 2, 3, 4, 5, 6]);
                    checkArgs(f(TestObjWith07Args)(1, 2, 3, 4, 5, 6, 7), [1, 2, 3, 4, 5, 6, 7]);
                    checkArgs(f(TestObjWith08Args)(1, 2, 3, 4, 5, 6, 7, 8), [1, 2, 3, 4, 5, 6, 7, 8]);
                    checkArgs(f(TestObjWith09Args)(1, 2, 3, 4, 5, 6, 7, 8, 9), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
                    checkArgs(f(TestObjWith10Args)(1, 2, 3, 4, 5, 6, 7, 8, 9, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
                    checkArgs(f(TestObjWith11Args)(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
                    checkArgs(f(TestObjWith12Args)(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
                    checkArgs(f(TestObjWith13Args)(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
                    checkArgs(f(TestObjWith14Args)(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
                    checkArgs(f(TestObjWith15Args)(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
                    checkArgs(f(TestObjWith16Args)(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
                    checkArgs(f(TestObjWith17Args)(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
                    checkArgs(f(TestObjWith18Args)(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
                    checkArgs(f(TestObjWith19Args)(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
                    checkArgs(f(TestObjWith20Args)(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
                    // clang-format on
                });
            }
            testing_internal_1.it('should throw when more than 20 arguments', function () { testing_internal_1.expect(function () { return reflector.factory(TestObjWith21Args); }).toThrowError(); });
            testing_internal_1.it('should return a registered factory if available', function () {
                reflector.registerType(TestObj, new reflection_1.ReflectionInfo(null, null, function () { return 'fake'; }));
                testing_internal_1.expect(reflector.factory(TestObj)()).toEqual('fake');
            });
        });
        testing_internal_1.describe('parameters', function () {
            testing_internal_1.it('should return an array of parameters for a type', function () {
                var p = reflector.parameters(ClassWithDecorators);
                testing_internal_1.expect(p).toEqual([[AType, reflector_common_1.paramDecorator('a')], [AType, reflector_common_1.paramDecorator('b')]]);
            });
            testing_internal_1.it('should work for a class without annotations', function () {
                var p = reflector.parameters(ClassWithoutDecorators);
                testing_internal_1.expect(p.length).toEqual(2);
            });
            testing_internal_1.it('should return registered parameters if available', function () {
                reflector.registerType(TestObj, new reflection_1.ReflectionInfo(null, [[1], [2]]));
                testing_internal_1.expect(reflector.parameters(TestObj)).toEqual([[1], [2]]);
            });
            testing_internal_1.it('should return an empty list when no parameters field in the stored type info', function () {
                reflector.registerType(TestObj, new reflection_1.ReflectionInfo());
                testing_internal_1.expect(reflector.parameters(TestObj)).toEqual([]);
            });
        });
        testing_internal_1.describe('propMetadata', function () {
            testing_internal_1.it('should return a string map of prop metadata for the given class', function () {
                var p = reflector.propMetadata(ClassWithDecorators);
                testing_internal_1.expect(p['a']).toEqual([reflector_common_1.propDecorator('p1'), reflector_common_1.propDecorator('p2')]);
                testing_internal_1.expect(p['c']).toEqual([reflector_common_1.propDecorator('p3')]);
            });
            testing_internal_1.it('should return registered meta if available', function () {
                reflector.registerType(TestObj, new reflection_1.ReflectionInfo(null, null, null, null, { 'a': [1, 2] }));
                testing_internal_1.expect(reflector.propMetadata(TestObj)).toEqual({ 'a': [1, 2] });
            });
            if (lang_1.IS_DART) {
                testing_internal_1.it('should merge metadata from getters and setters', function () {
                    var p = reflector.propMetadata(reflector_common_1.HasGetterAndSetterDecorators);
                    testing_internal_1.expect(p['a']).toEqual([reflector_common_1.propDecorator('get'), reflector_common_1.propDecorator('set')]);
                });
            }
        });
        testing_internal_1.describe('annotations', function () {
            testing_internal_1.it('should return an array of annotations for a type', function () {
                var p = reflector.annotations(ClassWithDecorators);
                testing_internal_1.expect(p).toEqual([reflector_common_1.classDecorator('class')]);
            });
            testing_internal_1.it('should return registered annotations if available', function () {
                reflector.registerType(TestObj, new reflection_1.ReflectionInfo([1, 2]));
                testing_internal_1.expect(reflector.annotations(TestObj)).toEqual([1, 2]);
            });
            testing_internal_1.it('should work for a class without annotations', function () {
                var p = reflector.annotations(ClassWithoutDecorators);
                testing_internal_1.expect(p).toEqual([]);
            });
        });
        if (lang_1.IS_DART) {
            testing_internal_1.describe('interfaces', function () {
                testing_internal_1.it('should return an array of interfaces for a type', function () {
                    var p = reflector.interfaces(ClassImplementingInterface);
                    testing_internal_1.expect(p).toEqual([Interface, Interface2]);
                });
                testing_internal_1.it('should return an empty array otherwise', function () {
                    var p = reflector.interfaces(ClassWithDecorators);
                    testing_internal_1.expect(p).toEqual([]);
                });
                testing_internal_1.it('should throw for undeclared lifecycle interfaces', function () { testing_internal_1.expect(function () { return reflector.interfaces(ClassDoesNotDeclareOnInit); }).toThrowError(); });
                testing_internal_1.it('should throw for class inheriting a lifecycle impl and not declaring the interface', function () {
                    testing_internal_1.expect(function () { return reflector.interfaces(SubClassDoesNotDeclareOnInit); }).toThrowError();
                });
            });
        }
        testing_internal_1.describe('getter', function () {
            testing_internal_1.it('returns a function reading a property', function () {
                var getA = reflector.getter('a');
                testing_internal_1.expect(getA(new TestObj(1, 2))).toEqual(1);
            });
            testing_internal_1.it('should return a registered getter if available', function () {
                reflector.registerGetters({ 'abc': function (obj /** TODO #9100 */) { return 'fake'; } });
                testing_internal_1.expect(reflector.getter('abc')('anything')).toEqual('fake');
            });
        });
        testing_internal_1.describe('setter', function () {
            testing_internal_1.it('returns a function setting a property', function () {
                var setA = reflector.setter('a');
                var obj = new TestObj(1, 2);
                setA(obj, 100);
                testing_internal_1.expect(obj.a).toEqual(100);
            });
            testing_internal_1.it('should return a registered setter if available', function () {
                var updateMe;
                reflector.registerSetters({
                    'abc': function (obj /** TODO #9100 */, value /** TODO #9100 */) { updateMe = value; }
                });
                reflector.setter('abc')('anything', 'fake');
                testing_internal_1.expect(updateMe).toEqual('fake');
            });
        });
        testing_internal_1.describe('method', function () {
            testing_internal_1.it('returns a function invoking a method', function () {
                var func = reflector.method('identity');
                var obj = new TestObj(1, 2);
                testing_internal_1.expect(func(obj, ['value'])).toEqual('value');
            });
            testing_internal_1.it('should return a registered method if available', function () {
                reflector.registerMethods({ 'abc': function (obj /** TODO #9100 */, args /** TODO #9100 */) { return args; } });
                testing_internal_1.expect(reflector.method('abc')('anything', ['fake'])).toEqual(['fake']);
            });
        });
        if (lang_1.IS_DART) {
            testing_internal_1.describe('importUri', function () {
                testing_internal_1.it('should return the importUri for a type', function () {
                    testing_internal_1.expect(reflector.importUri(TestObjWith00Args)
                        .endsWith('test/core/reflection/reflector_spec.dart'))
                        .toBe(true);
                });
            });
        }
    });
}
exports.main = main;
var TestObjWith00Args = (function () {
    function TestObjWith00Args() {
        this.args = [];
    }
    return TestObjWith00Args;
}());
var TestObjWith01Args = (function () {
    function TestObjWith01Args(a1) {
        this.args = [a1];
    }
    return TestObjWith01Args;
}());
var TestObjWith02Args = (function () {
    function TestObjWith02Args(a1, a2) {
        this.args = [a1, a2];
    }
    return TestObjWith02Args;
}());
var TestObjWith03Args = (function () {
    function TestObjWith03Args(a1, a2, a3) {
        this.args = [a1, a2, a3];
    }
    return TestObjWith03Args;
}());
var TestObjWith04Args = (function () {
    function TestObjWith04Args(a1, a2, a3, a4) {
        this.args = [a1, a2, a3, a4];
    }
    return TestObjWith04Args;
}());
var TestObjWith05Args = (function () {
    function TestObjWith05Args(a1, a2, a3, a4, a5) {
        this.args = [a1, a2, a3, a4, a5];
    }
    return TestObjWith05Args;
}());
var TestObjWith06Args = (function () {
    function TestObjWith06Args(a1, a2, a3, a4, a5, a6) {
        this.args = [a1, a2, a3, a4, a5, a6];
    }
    return TestObjWith06Args;
}());
var TestObjWith07Args = (function () {
    function TestObjWith07Args(a1, a2, a3, a4, a5, a6, a7) {
        this.args = [a1, a2, a3, a4, a5, a6, a7];
    }
    return TestObjWith07Args;
}());
var TestObjWith08Args = (function () {
    function TestObjWith08Args(a1, a2, a3, a4, a5, a6, a7, a8) {
        this.args = [a1, a2, a3, a4, a5, a6, a7, a8];
    }
    return TestObjWith08Args;
}());
var TestObjWith09Args = (function () {
    function TestObjWith09Args(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        this.args = [a1, a2, a3, a4, a5, a6, a7, a8, a9];
    }
    return TestObjWith09Args;
}());
var TestObjWith10Args = (function () {
    function TestObjWith10Args(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
        this.args = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10];
    }
    return TestObjWith10Args;
}());
var TestObjWith11Args = (function () {
    function TestObjWith11Args(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
        this.args = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11];
    }
    return TestObjWith11Args;
}());
var TestObjWith12Args = (function () {
    function TestObjWith12Args(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
        this.args = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12];
    }
    return TestObjWith12Args;
}());
var TestObjWith13Args = (function () {
    function TestObjWith13Args(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
        this.args = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13];
    }
    return TestObjWith13Args;
}());
var TestObjWith14Args = (function () {
    function TestObjWith14Args(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
        this.args = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14];
    }
    return TestObjWith14Args;
}());
var TestObjWith15Args = (function () {
    function TestObjWith15Args(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
        this.args = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15];
    }
    return TestObjWith15Args;
}());
var TestObjWith16Args = (function () {
    function TestObjWith16Args(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
        this.args = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16];
    }
    return TestObjWith16Args;
}());
var TestObjWith17Args = (function () {
    function TestObjWith17Args(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17) {
        this.args = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17];
    }
    return TestObjWith17Args;
}());
var TestObjWith18Args = (function () {
    function TestObjWith18Args(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18) {
        this.args = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18];
    }
    return TestObjWith18Args;
}());
var TestObjWith19Args = (function () {
    function TestObjWith19Args(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19) {
        this.args =
            [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19];
    }
    return TestObjWith19Args;
}());
var TestObjWith20Args = (function () {
    function TestObjWith20Args(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20) {
        this.args =
            [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20];
    }
    return TestObjWith20Args;
}());
var TestObjWith21Args = (function () {
    function TestObjWith21Args(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21) {
        this.args = [
            a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11,
            a12, a13, a14, a15, a16, a17, a18, a19, a20, a21
        ];
    }
    return TestObjWith21Args;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdG9yX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvdGVzdC9yZWZsZWN0aW9uL3JlZmxlY3Rvcl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILGlDQUFnRSx3Q0FBd0MsQ0FBQyxDQUFBO0FBRXpHLDJCQUF3Qyx5Q0FBeUMsQ0FBQyxDQUFBO0FBQ2xGLHdDQUFxQyxzREFBc0QsQ0FBQyxDQUFBO0FBQzVGLGlDQUF5SSxvQkFBb0IsQ0FBQyxDQUFBO0FBQzlKLHFCQUFzQix1QkFBdUIsQ0FBQyxDQUFBO0FBQzlDLDZCQUErQixnREFBZ0QsQ0FBQyxDQUFBO0FBRWhGO0lBR0UsZUFBWSxLQUFVLENBQUMsaUJBQWlCO1FBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFBQyxDQUFDO0lBQ25FLFlBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUNEO0lBSUUsNkJBQWEsQ0FBUSxFQUFFLENBQVE7UUFDN0IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNiLENBQUM7SUFMRCxzQkFBSSxrQ0FBQzthQUFMLFVBQU0sS0FBVSxDQUFDLGlCQUFpQixJQUFHLENBQUM7OztPQUFBO0lBTXhDLGtCQUFrQjtJQUNYLDhCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGlDQUFjLEVBQUUsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFHLEVBQUU7S0FDMUMsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGtDQUFjLEdBQTJEO1FBQ2hGLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxpQ0FBYyxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRyxFQUFFLEVBQUcsRUFBQztRQUN0RSxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsaUNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUcsRUFBRSxFQUFHLEVBQUM7S0FDckUsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGtDQUFjLEdBQTJDO1FBQ2hFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGdDQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFHLEVBQUUsRUFBQyxFQUFFLElBQUksRUFBRSxnQ0FBYSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRyxFQUFFLEVBQUU7UUFDdkYsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0NBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUcsRUFBRSxFQUFFO0tBQzlDLENBQUM7SUFDRiwwQkFBQztBQUFELENBQUMsQUF0QkQsSUFzQkM7QUFFRDtJQUNFLGdDQUFZLENBQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFNLENBQUMsaUJBQWlCO0lBQUcsQ0FBQztJQUNwRSw2QkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRUQ7SUFJRSxpQkFBWSxDQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBTSxDQUFDLGlCQUFpQjtRQUM1RCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELDBCQUFRLEdBQVIsVUFBUyxHQUFRLENBQUMsaUJBQWlCLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdEQsY0FBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBRUQ7SUFBQTtJQUFpQixDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBQWxCLElBQWtCO0FBRWxCO0lBQUE7SUFBa0IsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FBQyxBQUFuQixJQUFtQjtBQUVuQjtJQUFBO0lBQTZELENBQUM7SUFBRCxzQ0FBQztBQUFELENBQUMsQUFBOUQsSUFBOEQ7QUFFOUQ7SUFBeUMsOENBQStCO0lBQXhFO1FBQXlDLDhCQUErQjtJQUF1QixDQUFDO0lBQUQsaUNBQUM7QUFBRCxDQUFDLEFBQWhHLENBQXlDLCtCQUErQixHQUF3QjtBQUVoRyxvR0FBb0c7QUFDcEcsZ0JBQWdCO0FBQ2hCLDBGQUEwRjtBQUMxRjtJQUFBO0lBRUEsQ0FBQztJQURDLDRDQUFRLEdBQVIsY0FBWSxDQUFDO0lBQ2YsZ0NBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUVEO0lBQUE7SUFFQSxDQUFDO0lBREMsK0NBQVEsR0FBUixjQUFZLENBQUM7SUFDZixtQ0FBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRUQ7SUFBMkMsZ0RBQTRCO0lBQXZFO1FBQTJDLDhCQUE0QjtJQUFFLENBQUM7SUFBRCxtQ0FBQztBQUFELENBQUMsQUFBMUUsQ0FBMkMsNEJBQTRCLEdBQUc7QUFFMUU7SUFDRSwyQkFBUSxDQUFDLFdBQVcsRUFBRTtRQUNwQixJQUFJLFNBQWMsQ0FBbUI7UUFFckMsNkJBQVUsQ0FBQyxjQUFRLFNBQVMsR0FBRyxJQUFJLHNCQUFTLENBQUMsSUFBSSxnREFBc0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUvRSwyQkFBUSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLDZCQUFVLENBQUMsY0FBUSxTQUFTLEdBQUcsSUFBSSxzQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdkQscUJBQUUsQ0FBQywrQkFBK0IsRUFBRTtnQkFDbEMseUJBQU0sQ0FBQyxjQUFNLE9BQUEsU0FBUyxDQUFDLGNBQWMsRUFBRSxFQUExQixDQUEwQixDQUFDLENBQUMsWUFBWSxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDdEYsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBRSxDQUFDLDJCQUEyQixFQUFFO2dCQUM5QixTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3ZCLHlCQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUUvQyxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLDJCQUFjLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxjQUFNLE9BQUEsT0FBTyxFQUFQLENBQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzdFLFNBQVMsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksMkJBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQU0sT0FBQSxTQUFTLEVBQVQsQ0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDakYseUJBQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFFN0QsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIseUJBQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUV0RCxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqRCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsMkJBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDbEIscUJBQUUsQ0FBQyw0Q0FBNEMsRUFBRTtnQkFDL0MsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRTNDLHlCQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIseUJBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1lBRUgsb0VBQW9FO1lBQ3BFLG9GQUFvRjtZQUNwRixFQUFFLENBQUMsQ0FBQyxDQUFDLCtCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLHFCQUFFLENBQUMsa0NBQWtDLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxHQUFHLFVBQUMsQ0FBTSxDQUFDLGlCQUFpQixJQUFLLE9BQUEsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQztvQkFDM0QsSUFBSSxTQUFTLEdBQUcsVUFBQyxHQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBUyxDQUFDLGlCQUFpQjt3QkFDcEUsT0FBQSx5QkFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUE5QixDQUE4QixDQUFDO29CQUVuQyxtQkFBbUI7b0JBQ25CLFNBQVMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUN0QyxTQUFTLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxTQUFTLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlDLFNBQVMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwRCxTQUFTLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxRCxTQUFTLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hFLFNBQVMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0RSxTQUFTLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1RSxTQUFTLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xGLFNBQVMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4RixTQUFTLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNoRyxTQUFTLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3hHLFNBQVMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNoSCxTQUFTLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN4SCxTQUFTLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2hJLFNBQVMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN4SSxTQUFTLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNoSixTQUFTLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3hKLFNBQVMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNoSyxTQUFTLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFF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RUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQUMsQ0FBQztJQUNoRyx3QkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBRUQ7SUFFRSwyQkFBWSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU87UUFDOUQsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFFRDtJQUVFLDJCQUFZLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU87UUFDdkUsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBRUQ7SUFFRSwyQkFBWSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTztRQUNoRixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBRUQ7SUFFRSwyQkFBWSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU87UUFDekYsSUFBSSxDQUFD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O0FBRUQ7SUFFRSwyQkFDSSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxHQUFRLEVBQ3pGLEdBQVEsRUFBRSxHQUFRLEVBQUUsR0FBUSxFQUFFLEdBQVEsRUFBRSxHQUFRO1FBQ2xELElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBRUQ7SUFFRSwyQkFDSSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxHQUFRLEVBQ3pGLEdBQVEsRUFBRSxHQUFRLEVBQUUsR0FBUSxFQUFFLEdBQVEsRUFBRSxHQUFRLEVBQUUsR0FBUTtRQUM1RCxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFFRDtJQUVFLDJCQUNJLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFB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