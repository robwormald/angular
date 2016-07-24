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
var directive_resolver_1 = require('@angular/compiler/src/directive_resolver');
var metadata_1 = require('@angular/core/src/metadata');
var SomeDirective = (function () {
    function SomeDirective() {
    }
    /** @nocollapse */
    SomeDirective.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'someDirective' },] },
    ];
    return SomeDirective;
}());
var SomeChildDirective = (function (_super) {
    __extends(SomeChildDirective, _super);
    function SomeChildDirective() {
        _super.apply(this, arguments);
    }
    /** @nocollapse */
    SomeChildDirective.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'someChildDirective' },] },
    ];
    return SomeChildDirective;
}(SomeDirective));
var SomeDirectiveWithInputs = (function () {
    function SomeDirectiveWithInputs() {
    }
    /** @nocollapse */
    SomeDirectiveWithInputs.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'someDirective', inputs: ['c'] },] },
    ];
    /** @nocollapse */
    SomeDirectiveWithInputs.propDecorators = {
        'a': [{ type: metadata_1.Input },],
        'b': [{ type: metadata_1.Input, args: ['renamed',] },],
    };
    return SomeDirectiveWithInputs;
}());
var SomeDirectiveWithOutputs = (function () {
    function SomeDirectiveWithOutputs() {
    }
    /** @nocollapse */
    SomeDirectiveWithOutputs.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'someDirective', outputs: ['c'] },] },
    ];
    /** @nocollapse */
    SomeDirectiveWithOutputs.propDecorators = {
        'a': [{ type: metadata_1.Output },],
        'b': [{ type: metadata_1.Output, args: ['renamed',] },],
    };
    return SomeDirectiveWithOutputs;
}());
var SomeDirectiveWithDuplicateOutputs = (function () {
    function SomeDirectiveWithDuplicateOutputs() {
    }
    /** @nocollapse */
    SomeDirectiveWithDuplicateOutputs.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'someDirective', outputs: ['a'] },] },
    ];
    /** @nocollapse */
    SomeDirectiveWithDuplicateOutputs.propDecorators = {
        'a': [{ type: metadata_1.Output },],
    };
    return SomeDirectiveWithDuplicateOutputs;
}());
var SomeDirectiveWithDuplicateRenamedOutputs = (function () {
    function SomeDirectiveWithDuplicateRenamedOutputs() {
    }
    /** @nocollapse */
    SomeDirectiveWithDuplicateRenamedOutputs.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'someDirective', outputs: ['localA: a'] },] },
    ];
    /** @nocollapse */
    SomeDirectiveWithDuplicateRenamedOutputs.propDecorators = {
        'a': [{ type: metadata_1.Output },],
    };
    return SomeDirectiveWithDuplicateRenamedOutputs;
}());
var SomeDirectiveWithDuplicateInputs = (function () {
    function SomeDirectiveWithDuplicateInputs() {
    }
    /** @nocollapse */
    SomeDirectiveWithDuplicateInputs.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'someDirective', inputs: ['a'] },] },
    ];
    /** @nocollapse */
    SomeDirectiveWithDuplicateInputs.propDecorators = {
        'a': [{ type: metadata_1.Input },],
    };
    return SomeDirectiveWithDuplicateInputs;
}());
var SomeDirectiveWithDuplicateRenamedInputs = (function () {
    function SomeDirectiveWithDuplicateRenamedInputs() {
    }
    /** @nocollapse */
    SomeDirectiveWithDuplicateRenamedInputs.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'someDirective', inputs: ['localA: a'] },] },
    ];
    /** @nocollapse */
    SomeDirectiveWithDuplicateRenamedInputs.propDecorators = {
        'a': [{ type: metadata_1.Input },],
    };
    return SomeDirectiveWithDuplicateRenamedInputs;
}());
var SomeDirectiveWithSetterProps = (function () {
    function SomeDirectiveWithSetterProps() {
    }
    Object.defineProperty(SomeDirectiveWithSetterProps.prototype, "a", {
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    SomeDirectiveWithSetterProps.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'someDirective' },] },
    ];
    /** @nocollapse */
    SomeDirectiveWithSetterProps.propDecorators = {
        'a': [{ type: metadata_1.Input, args: ['renamed',] },],
    };
    return SomeDirectiveWithSetterProps;
}());
var SomeDirectiveWithGetterOutputs = (function () {
    function SomeDirectiveWithGetterOutputs() {
    }
    Object.defineProperty(SomeDirectiveWithGetterOutputs.prototype, "a", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    SomeDirectiveWithGetterOutputs.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'someDirective' },] },
    ];
    /** @nocollapse */
    SomeDirectiveWithGetterOutputs.propDecorators = {
        'a': [{ type: metadata_1.Output, args: ['renamed',] },],
    };
    return SomeDirectiveWithGetterOutputs;
}());
var SomeDirectiveWithHostBindings = (function () {
    function SomeDirectiveWithHostBindings() {
    }
    /** @nocollapse */
    SomeDirectiveWithHostBindings.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'someDirective', host: { '[c]': 'c' } },] },
    ];
    /** @nocollapse */
    SomeDirectiveWithHostBindings.propDecorators = {
        'a': [{ type: metadata_1.HostBinding },],
        'b': [{ type: metadata_1.HostBinding, args: ['renamed',] },],
    };
    return SomeDirectiveWithHostBindings;
}());
var SomeDirectiveWithHostListeners = (function () {
    function SomeDirectiveWithHostListeners() {
    }
    SomeDirectiveWithHostListeners.prototype.onA = function () { };
    SomeDirectiveWithHostListeners.prototype.onB = function (value) { };
    /** @nocollapse */
    SomeDirectiveWithHostListeners.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'someDirective', host: { '(c)': 'onC()' } },] },
    ];
    /** @nocollapse */
    SomeDirectiveWithHostListeners.propDecorators = {
        'onA': [{ type: metadata_1.HostListener, args: ['a',] },],
        'onB': [{ type: metadata_1.HostListener, args: ['b', ['$event.value'],] },],
    };
    return SomeDirectiveWithHostListeners;
}());
var SomeDirectiveWithContentChildren = (function () {
    function SomeDirectiveWithContentChildren() {
    }
    /** @nocollapse */
    SomeDirectiveWithContentChildren.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'someDirective', queries: { 'cs': new metadata_1.ContentChildren('c') } },] },
    ];
    /** @nocollapse */
    SomeDirectiveWithContentChildren.propDecorators = {
        'as': [{ type: metadata_1.ContentChildren, args: ['a',] },],
    };
    return SomeDirectiveWithContentChildren;
}());
var SomeDirectiveWithViewChildren = (function () {
    function SomeDirectiveWithViewChildren() {
    }
    /** @nocollapse */
    SomeDirectiveWithViewChildren.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'someDirective', queries: { 'cs': new metadata_1.ViewChildren('c') } },] },
    ];
    /** @nocollapse */
    SomeDirectiveWithViewChildren.propDecorators = {
        'as': [{ type: metadata_1.ViewChildren, args: ['a',] },],
    };
    return SomeDirectiveWithViewChildren;
}());
var SomeDirectiveWithContentChild = (function () {
    function SomeDirectiveWithContentChild() {
    }
    /** @nocollapse */
    SomeDirectiveWithContentChild.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'someDirective', queries: { 'c': new metadata_1.ContentChild('c') } },] },
    ];
    /** @nocollapse */
    SomeDirectiveWithContentChild.propDecorators = {
        'a': [{ type: metadata_1.ContentChild, args: ['a',] },],
    };
    return SomeDirectiveWithContentChild;
}());
var SomeDirectiveWithViewChild = (function () {
    function SomeDirectiveWithViewChild() {
    }
    /** @nocollapse */
    SomeDirectiveWithViewChild.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'someDirective', queries: { 'c': new metadata_1.ViewChild('c') } },] },
    ];
    /** @nocollapse */
    SomeDirectiveWithViewChild.propDecorators = {
        'a': [{ type: metadata_1.ViewChild, args: ['a',] },],
    };
    return SomeDirectiveWithViewChild;
}());
var SomeDirectiveWithoutMetadata = (function () {
    function SomeDirectiveWithoutMetadata() {
    }
    return SomeDirectiveWithoutMetadata;
}());
function main() {
    describe('DirectiveResolver', function () {
        var resolver;
        beforeEach(function () { resolver = new directive_resolver_1.DirectiveResolver(); });
        it('should read out the Directive metadata', function () {
            var directiveMetadata = resolver.resolve(SomeDirective);
            expect(directiveMetadata)
                .toEqual(new metadata_1.DirectiveMetadata({ selector: 'someDirective', inputs: [], outputs: [], host: {}, queries: {} }));
        });
        it('should throw if not matching metadata is found', function () {
            expect(function () {
                resolver.resolve(SomeDirectiveWithoutMetadata);
            }).toThrowError('No Directive annotation found on SomeDirectiveWithoutMetadata');
        });
        it('should not read parent class Directive metadata', function () {
            var directiveMetadata = resolver.resolve(SomeChildDirective);
            expect(directiveMetadata)
                .toEqual(new metadata_1.DirectiveMetadata({ selector: 'someChildDirective', inputs: [], outputs: [], host: {}, queries: {} }));
        });
        describe('inputs', function () {
            it('should append directive inputs', function () {
                var directiveMetadata = resolver.resolve(SomeDirectiveWithInputs);
                expect(directiveMetadata.inputs).toEqual(['c', 'a', 'b: renamed']);
            });
            it('should work with getters and setters', function () {
                var directiveMetadata = resolver.resolve(SomeDirectiveWithSetterProps);
                expect(directiveMetadata.inputs).toEqual(['a: renamed']);
            });
            it('should throw if duplicate inputs', function () {
                expect(function () {
                    resolver.resolve(SomeDirectiveWithDuplicateInputs);
                }).toThrowError("Input 'a' defined multiple times in 'SomeDirectiveWithDuplicateInputs'");
            });
            it('should throw if duplicate inputs (with rename)', function () {
                expect(function () { resolver.resolve(SomeDirectiveWithDuplicateRenamedInputs); })
                    .toThrowError("Input 'a' defined multiple times in 'SomeDirectiveWithDuplicateRenamedInputs'");
            });
        });
        describe('outputs', function () {
            it('should append directive outputs', function () {
                var directiveMetadata = resolver.resolve(SomeDirectiveWithOutputs);
                expect(directiveMetadata.outputs).toEqual(['c', 'a', 'b: renamed']);
            });
            it('should work with getters and setters', function () {
                var directiveMetadata = resolver.resolve(SomeDirectiveWithGetterOutputs);
                expect(directiveMetadata.outputs).toEqual(['a: renamed']);
            });
            it('should throw if duplicate outputs', function () {
                expect(function () { resolver.resolve(SomeDirectiveWithDuplicateOutputs); })
                    .toThrowError("Output event 'a' defined multiple times in 'SomeDirectiveWithDuplicateOutputs'");
            });
            it('should throw if duplicate outputs (with rename)', function () {
                expect(function () { resolver.resolve(SomeDirectiveWithDuplicateRenamedOutputs); })
                    .toThrowError("Output event 'a' defined multiple times in 'SomeDirectiveWithDuplicateRenamedOutputs'");
            });
        });
        describe('host', function () {
            it('should append host bindings', function () {
                var directiveMetadata = resolver.resolve(SomeDirectiveWithHostBindings);
                expect(directiveMetadata.host).toEqual({ '[c]': 'c', '[a]': 'a', '[renamed]': 'b' });
            });
            it('should append host listeners', function () {
                var directiveMetadata = resolver.resolve(SomeDirectiveWithHostListeners);
                expect(directiveMetadata.host)
                    .toEqual({ '(c)': 'onC()', '(a)': 'onA()', '(b)': 'onB($event.value)' });
            });
        });
        describe('queries', function () {
            it('should append ContentChildren', function () {
                var directiveMetadata = resolver.resolve(SomeDirectiveWithContentChildren);
                expect(directiveMetadata.queries)
                    .toEqual({ 'cs': new metadata_1.ContentChildren('c'), 'as': new metadata_1.ContentChildren('a') });
            });
            it('should append ViewChildren', function () {
                var directiveMetadata = resolver.resolve(SomeDirectiveWithViewChildren);
                expect(directiveMetadata.queries)
                    .toEqual({ 'cs': new metadata_1.ViewChildren('c'), 'as': new metadata_1.ViewChildren('a') });
            });
            it('should append ContentChild', function () {
                var directiveMetadata = resolver.resolve(SomeDirectiveWithContentChild);
                expect(directiveMetadata.queries)
                    .toEqual({ 'c': new metadata_1.ContentChild('c'), 'a': new metadata_1.ContentChild('a') });
            });
            it('should append ViewChild', function () {
                var directiveMetadata = resolver.resolve(SomeDirectiveWithViewChild);
                expect(directiveMetadata.queries)
                    .toEqual({ 'c': new metadata_1.ViewChild('c'), 'a': new metadata_1.ViewChild('a') });
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlX3Jlc29sdmVyX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3Rlc3QvZGlyZWN0aXZlX3Jlc29sdmVyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsbUNBQWdDLDBDQUEwQyxDQUFDLENBQUE7QUFDM0UseUJBQTZJLDRCQUE0QixDQUFDLENBQUE7QUFDMUs7SUFBQTtJQUtBLENBQUM7SUFKRCxrQkFBa0I7SUFDWCx3QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxvQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLGVBQWUsRUFBQyxFQUFHLEVBQUU7S0FDekQsQ0FBQztJQUNGLG9CQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFDRDtJQUFpQyxzQ0FBYTtJQUE5QztRQUFpQyw4QkFBYTtJQUs5QyxDQUFDO0lBSkQsa0JBQWtCO0lBQ1gsNkJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsb0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxvQkFBb0IsRUFBQyxFQUFHLEVBQUU7S0FDOUQsQ0FBQztJQUNGLHlCQUFDO0FBQUQsQ0FBQyxBQUxELENBQWlDLGFBQWEsR0FLN0M7QUFDRDtJQUFBO0lBV0EsQ0FBQztJQVRELGtCQUFrQjtJQUNYLGtDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLG9CQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFDLEVBQUcsRUFBRTtLQUN4RSxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsc0NBQWMsR0FBMkM7UUFDaEUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQUssRUFBRSxFQUFFO1FBQ3ZC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