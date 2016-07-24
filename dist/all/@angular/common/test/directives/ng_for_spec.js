/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var testing_1 = require('@angular/core/testing');
var collection_1 = require('../../src/facade/collection');
var lang_1 = require('../../src/facade/lang');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var by_1 = require('@angular/platform-browser/src/dom/debug/by');
function main() {
    testing_internal_1.describe('ngFor', function () {
        var TEMPLATE = '<div><copy-me template="ngFor let item of items">{{item.toString()}};</copy-me></div>';
        testing_internal_1.it('should reflect initial elements', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(TestComponent, TEMPLATE)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('1;2;');
                async.done();
            });
        }));
        testing_internal_1.it('should reflect added elements', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(TestComponent, TEMPLATE)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                fixture.debugElement.componentInstance.items.push(3);
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('1;2;3;');
                async.done();
            });
        }));
        testing_internal_1.it('should reflect removed elements', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(TestComponent, TEMPLATE)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                collection_1.ListWrapper.removeAt(fixture.debugElement.componentInstance.items, 1);
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('1;');
                async.done();
            });
        }));
        testing_internal_1.it('should reflect moved elements', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(TestComponent, TEMPLATE)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                collection_1.ListWrapper.removeAt(fixture.debugElement.componentInstance.items, 0);
                fixture.debugElement.componentInstance.items.push(1);
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('2;1;');
                async.done();
            });
        }));
        testing_internal_1.it('should reflect a mix of all changes (additions/removals/moves)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(TestComponent, TEMPLATE)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.items = [0, 1, 2, 3, 4, 5];
                fixture.detectChanges();
                fixture.debugElement.componentInstance.items = [6, 2, 7, 0, 4, 8];
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('6;2;7;0;4;8;');
                async.done();
            });
        }));
        testing_internal_1.it('should iterate over an array of objects', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<ul><li template="ngFor let item of items">{{item["name"]}};</li></ul>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                // INIT
                fixture.debugElement.componentInstance.items =
                    [{ 'name': 'misko' }, { 'name': 'shyam' }];
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('misko;shyam;');
                // GROW
                fixture.debugElement.componentInstance.items.push({ 'name': 'adam' });
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('misko;shyam;adam;');
                // SHRINK
                collection_1.ListWrapper.removeAt(fixture.debugElement.componentInstance.items, 2);
                collection_1.ListWrapper.removeAt(fixture.debugElement.componentInstance.items, 0);
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('shyam;');
                async.done();
            });
        }));
        testing_internal_1.it('should gracefully handle nulls', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<ul><li template="ngFor let item of null">{{item}};</li></ul>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('');
                async.done();
            });
        }));
        testing_internal_1.it('should gracefully handle ref changing to null and back', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(TestComponent, TEMPLATE)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('1;2;');
                fixture.debugElement.componentInstance.items = null;
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('');
                fixture.debugElement.componentInstance.items = [1, 2, 3];
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('1;2;3;');
                async.done();
            });
        }));
        if (!lang_1.IS_DART) {
            testing_internal_1.it('should throw on non-iterable ref and suggest using an array', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideTemplate(TestComponent, TEMPLATE)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.items = 'whaaa';
                    try {
                        fixture.detectChanges();
                    }
                    catch (e) {
                        matchers_1.expect(e.message).toContain("Cannot find a differ supporting object 'whaaa' of type 'string'. NgFor only supports binding to Iterables such as Arrays.");
                        async.done();
                    }
                });
            }));
        }
        testing_internal_1.it('should throw on ref changing to string', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(TestComponent, TEMPLATE)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('1;2;');
                fixture.debugElement.componentInstance.items = 'whaaa';
                matchers_1.expect(function () { return fixture.detectChanges(); }).toThrowError();
                async.done();
            });
        }));
        testing_internal_1.it('should works with duplicates', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(TestComponent, TEMPLATE)
                .createAsync(TestComponent)
                .then(function (fixture) {
                var a = new Foo();
                fixture.debugElement.componentInstance.items = [a, a];
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('foo;foo;');
                async.done();
            });
        }));
        testing_internal_1.it('should repeat over nested arrays', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div>' +
                '<div template="ngFor let item of items">' +
                '<div template="ngFor let subitem of item">' +
                '{{subitem}}-{{item.length}};' +
                '</div>|' +
                '</div>' +
                '</div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.items = [['a', 'b'], ['c']];
                fixture.detectChanges();
                fixture.detectChanges();
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('a-2;b-2;|c-1;|');
                fixture.debugElement.componentInstance.items = [['e'], ['f', 'g']];
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('e-1;|f-2;g-2;|');
                async.done();
            });
        }));
        testing_internal_1.it('should repeat over nested arrays with no intermediate element', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div><template ngFor let-item [ngForOf]="items">' +
                '<div template="ngFor let subitem of item">' +
                '{{subitem}}-{{item.length}};' +
                '</div></template></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.items = [['a', 'b'], ['c']];
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('a-2;b-2;c-1;');
                fixture.debugElement.componentInstance.items = [['e'], ['f', 'g']];
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('e-1;f-2;g-2;');
                async.done();
            });
        }));
        testing_internal_1.it('should repeat over nested ngIf that are the last node in the ngFor temlate', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<div><template ngFor let-item [ngForOf]=\"items\" let-i=\"index\"><div>{{i}}|</div>" +
                "<div *ngIf=\"i % 2 == 0\">even|</div></template></div>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                var el = fixture.debugElement.nativeElement;
                var items = [1];
                fixture.debugElement.componentInstance.items = items;
                fixture.detectChanges();
                matchers_1.expect(el).toHaveText('0|even|');
                items.push(1);
                fixture.detectChanges();
                matchers_1.expect(el).toHaveText('0|even|1|');
                items.push(1);
                fixture.detectChanges();
                matchers_1.expect(el).toHaveText('0|even|1|2|even|');
                async.done();
            });
        }));
        testing_internal_1.it('should display indices correctly', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div><copy-me template="ngFor: let item of items; let i=index">{{i.toString()}}</copy-me></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('0123456789');
                fixture.debugElement.componentInstance.items = [1, 2, 6, 7, 4, 3, 5, 8, 9, 0];
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('0123456789');
                async.done();
            });
        }));
        testing_internal_1.it('should display first item correctly', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div><copy-me template="ngFor: let item of items; let isFirst=first">{{isFirst.toString()}}</copy-me></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.items = [0, 1, 2];
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('truefalsefalse');
                fixture.debugElement.componentInstance.items = [2, 1];
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('truefalse');
                async.done();
            });
        }));
        testing_internal_1.it('should display last item correctly', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div><copy-me template="ngFor: let item of items; let isLast=last">{{isLast.toString()}}</copy-me></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.items = [0, 1, 2];
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('falsefalsetrue');
                fixture.debugElement.componentInstance.items = [2, 1];
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('falsetrue');
                async.done();
            });
        }));
        testing_internal_1.it('should display even items correctly', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div><copy-me template="ngFor: let item of items; let isEven=even">{{isEven.toString()}}</copy-me></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.items = [0, 1, 2];
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('truefalsetrue');
                fixture.debugElement.componentInstance.items = [2, 1];
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('truefalse');
                async.done();
            });
        }));
        testing_internal_1.it('should display odd items correctly', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div><copy-me template="ngFor: let item of items; let isOdd=odd">{{isOdd.toString()}}</copy-me></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.items = [0, 1, 2, 3];
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('falsetruefalsetrue');
                fixture.debugElement.componentInstance.items = [2, 1];
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('falsetrue');
                async.done();
            });
        }));
        testing_internal_1.it('should allow to use a custom template', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(TestComponent, '<ul><template ngFor [ngForOf]="items" [ngForTemplate]="contentTpl"></template></ul>')
                .overrideTemplate(ComponentUsingTestComponent, '<test-cmp><li template="let item; let i=index">{{i}}: {{item}};</li></test-cmp>')
                .createAsync(ComponentUsingTestComponent)
                .then(function (fixture) {
                var testComponent = fixture.debugElement.children[0];
                testComponent.componentInstance.items = ['a', 'b', 'c'];
                fixture.detectChanges();
                matchers_1.expect(testComponent.nativeElement).toHaveText('0: a;1: b;2: c;');
                async.done();
            });
        }));
        testing_internal_1.it('should use a default template if a custom one is null', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(TestComponent, "<ul><template ngFor let-item [ngForOf]=\"items\"\n         [ngForTemplate]=\"contentTpl\" let-i=\"index\">{{i}}: {{item}};</template></ul>")
                .overrideTemplate(ComponentUsingTestComponent, '<test-cmp></test-cmp>')
                .createAsync(ComponentUsingTestComponent)
                .then(function (fixture) {
                var testComponent = fixture.debugElement.children[0];
                testComponent.componentInstance.items = ['a', 'b', 'c'];
                fixture.detectChanges();
                matchers_1.expect(testComponent.nativeElement).toHaveText('0: a;1: b;2: c;');
                async.done();
            });
        }));
        testing_internal_1.it('should use a custom template when both default and a custom one are present', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(TestComponent, "<ul><template ngFor let-item [ngForOf]=\"items\"\n         [ngForTemplate]=\"contentTpl\" let-i=\"index\">{{i}}=> {{item}};</template></ul>")
                .overrideTemplate(ComponentUsingTestComponent, '<test-cmp><li template="let item; let i=index">{{i}}: {{item}};</li></test-cmp>')
                .createAsync(ComponentUsingTestComponent)
                .then(function (fixture) {
                var testComponent = fixture.debugElement.children[0];
                testComponent.componentInstance.items = ['a', 'b', 'c'];
                fixture.detectChanges();
                matchers_1.expect(testComponent.nativeElement).toHaveText('0: a;1: b;2: c;');
                async.done();
            });
        }));
        testing_internal_1.describe('track by', function () {
            testing_internal_1.it('should not replace tracked items', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<template ngFor let-item [ngForOf]=\"items\" [ngForTrackBy]=\"trackById\" let-i=\"index\">\n               <p>{{items[i]}}</p>\n              </template>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    var buildItemList = function () {
                        fixture.debugElement.componentInstance.items = [{ 'id': 'a' }];
                        fixture.detectChanges();
                        return fixture.debugElement.queryAll(by_1.By.css('p'))[0];
                    };
                    var firstP = buildItemList();
                    var finalP = buildItemList();
                    matchers_1.expect(finalP.nativeElement).toBe(firstP.nativeElement);
                    async.done();
                });
            }));
            testing_internal_1.it('should update implicit local variable on view', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div><template ngFor let-item [ngForOf]=\"items\" [ngForTrackBy]=\"trackById\">{{item['color']}}</template></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.items = [{ 'id': 'a', 'color': 'blue' }];
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('blue');
                    fixture.debugElement.componentInstance.items = [{ 'id': 'a', 'color': 'red' }];
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('red');
                    async.done();
                });
            }));
            testing_internal_1.it('should move items around and keep them updated ', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div><template ngFor let-item [ngForOf]=\"items\" [ngForTrackBy]=\"trackById\">{{item['color']}}</template></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.items =
                        [{ 'id': 'a', 'color': 'blue' }, { 'id': 'b', 'color': 'yellow' }];
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('blueyellow');
                    fixture.debugElement.componentInstance.items =
                        [{ 'id': 'b', 'color': 'orange' }, { 'id': 'a', 'color': 'red' }];
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('orangered');
                    async.done();
                });
            }));
            testing_internal_1.it('should handle added and removed items properly when tracking by index', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div><template ngFor let-item [ngForOf]=\"items\" [ngForTrackBy]=\"trackByIndex\">{{item}}</template></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.items = ['a', 'b', 'c', 'd'];
                    fixture.detectChanges();
                    fixture.debugElement.componentInstance.items = ['e', 'f', 'g', 'h'];
                    fixture.detectChanges();
                    fixture.debugElement.componentInstance.items = ['e', 'f', 'h'];
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('efh');
                    async.done();
                });
            }));
        });
    });
}
exports.main = main;
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.toString = function () { return 'foo'; };
    return Foo;
}());
var TestComponent = (function () {
    function TestComponent() {
        this.items = [1, 2];
    }
    TestComponent.prototype.trackById = function (index, item) { return item['id']; };
    TestComponent.prototype.trackByIndex = function (index, item) { return index; };
    /** @nocollapse */
    TestComponent.decorators = [
        { type: core_1.Component, args: [{ selector: 'test-cmp', directives: [common_1.NgFor, common_1.NgIf], template: '' },] },
    ];
    /** @nocollapse */
    TestComponent.ctorParameters = [];
    /** @nocollapse */
    TestComponent.propDecorators = {
        'contentTpl': [{ type: core_1.ContentChild, args: [core_1.TemplateRef,] },],
    };
    return TestComponent;
}());
var ComponentUsingTestComponent = (function () {
    function ComponentUsingTestComponent() {
        this.items = [1, 2];
    }
    /** @nocollapse */
    ComponentUsingTestComponent.decorators = [
        { type: core_1.Component, args: [{ selector: 'outer-cmp', directives: [TestComponent], template: '' },] },
    ];
    /** @nocollapse */
    ComponentUsingTestComponent.ctorParameters = [];
    return ComponentUsingTestComponent;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfZm9yX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbW1vbi90ZXN0L2RpcmVjdGl2ZXMvbmdfZm9yX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUE4Ryx3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3ZKLHdCQUFtQyx1QkFBdUIsQ0FBQyxDQUFBO0FBQzNELDJCQUEwQiw2QkFBNkIsQ0FBQyxDQUFBO0FBQ3hELHFCQUFzQix1QkFBdUIsQ0FBQyxDQUFBO0FBQzlDLHFCQUFtRCxlQUFlLENBQUMsQ0FBQTtBQUNuRSx1QkFBMEIsaUJBQWlCLENBQUMsQ0FBQTtBQUM1Qyx5QkFBcUIsNENBQTRDLENBQUMsQ0FBQTtBQUNsRSxtQkFBaUIsNENBQTRDLENBQUMsQ0FBQTtBQUU5RDtJQUNFLDJCQUFRLENBQUMsT0FBTyxFQUFFO1FBQ2hCLElBQUksUUFBUSxHQUNSLHVGQUF1RixDQUFDO1FBRTVGLHFCQUFFLENBQUMsaUNBQWlDLEVBQ2pDLHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMxQyxVQUFDLEdBQXlCLEVBQUUsS0FBeUI7WUFDbkQsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7aUJBQ3hDLFdBQVcsQ0FBQyxhQUFhLENBQUM7aUJBQzFCLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBQ1osT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4QixpQkFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM5RCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFWCxxQkFBRSxDQUFDLCtCQUErQixFQUMvQix5QkFB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