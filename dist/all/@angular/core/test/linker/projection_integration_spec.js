/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var testing_1 = require('@angular/core/testing');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var core_1 = require('@angular/core');
var by_1 = require('@angular/platform-browser/src/dom/debug/by');
var debug_node_1 = require('@angular/core/src/debug/debug_node');
function main() {
    testing_internal_1.describe('projection', function () {
        testing_internal_1.it('should support simple components', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<simple>' +
                    '<div>A</div>' +
                    '</simple>',
                directives: [Simple]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('SIMPLE(A)');
                async.done();
            });
        }));
        testing_internal_1.it('should support simple components with text interpolation as direct children', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '{{\'START(\'}}<simple>' +
                    '{{text}}' +
                    '</simple>{{\')END\'}}',
                directives: [Simple]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                main.debugElement.componentInstance.text = 'A';
                main.detectChanges();
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('START(SIMPLE(A))END');
                async.done();
            });
        }));
        testing_internal_1.it('should support projecting text interpolation to a non bound element', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(Simple, new core_1.ViewMetadata({ template: 'SIMPLE(<div><ng-content></ng-content></div>)', directives: [] }))
                .overrideView(MainComp, new core_1.ViewMetadata({ template: '<simple>{{text}}</simple>', directives: [Simple] }))
                .createAsync(MainComp)
                .then(function (main) {
                main.debugElement.componentInstance.text = 'A';
                main.detectChanges();
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('SIMPLE(A)');
                async.done();
            });
        }));
        testing_internal_1.it('should support projecting text interpolation to a non bound element with other bound elements after it', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(Simple, new core_1.ViewMetadata({
                template: 'SIMPLE(<div><ng-content></ng-content></div><div [tabIndex]="0">EL</div>)',
                directives: []
            }))
                .overrideView(MainComp, new core_1.ViewMetadata({ template: '<simple>{{text}}</simple>', directives: [Simple] }))
                .createAsync(MainComp)
                .then(function (main) {
                main.debugElement.componentInstance.text = 'A';
                main.detectChanges();
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('SIMPLE(AEL)');
                async.done();
            });
        }));
        testing_internal_1.it('should project content components', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(Simple, new core_1.ViewMetadata({
                template: 'SIMPLE({{0}}|<ng-content></ng-content>|{{2}})',
                directives: []
            }))
                .overrideView(OtherComp, new core_1.ViewMetadata({ template: '{{1}}', directives: [] }))
                .overrideView(MainComp, new core_1.ViewMetadata({
                template: '<simple><other></other></simple>',
                directives: [Simple, OtherComp]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                main.detectChanges();
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('SIMPLE(0|1|2)');
                async.done();
            });
        }));
        testing_internal_1.it('should not show the light dom even if there is no content tag', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({ template: '<empty>A</empty>', directives: [Empty] }))
                .createAsync(MainComp)
                .then(function (main) {
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('');
                async.done();
            });
        }));
        testing_internal_1.it('should support multiple content tags', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<multiple-content-tags>' +
                    '<div>B</div>' +
                    '<div>C</div>' +
                    '<div class="left">A</div>' +
                    '</multiple-content-tags>',
                directives: [MultipleContentTagsComponent]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('(A, BC)');
                async.done();
            });
        }));
        testing_internal_1.it('should redistribute only direct children', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<multiple-content-tags>' +
                    '<div>B<div class="left">A</div></div>' +
                    '<div>C</div>' +
                    '</multiple-content-tags>',
                directives: [MultipleContentTagsComponent]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('(, BAC)');
                async.done();
            });
        }));
        testing_internal_1.it('should redistribute direct child viewcontainers when the light dom changes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<multiple-content-tags>' +
                    '<template manual class="left"><div>A1</div></template>' +
                    '<div>B</div>' +
                    '</multiple-content-tags>',
                directives: [MultipleContentTagsComponent, ManualViewportDirective]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                var viewportDirectives = main.debugElement.children[0]
                    .childNodes.filter(by_1.By.directive(ManualViewportDirective))
                    .map(function (de) { return de.injector.get(ManualViewportDirective); });
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('(, B)');
                viewportDirectives.forEach(function (d) { return d.show(); });
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('(A1, B)');
                viewportDirectives.forEach(function (d) { return d.hide(); });
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('(, B)');
                async.done();
            });
        }));
        testing_internal_1.it('should support nested components', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<outer-with-indirect-nested>' +
                    '<div>A</div>' +
                    '<div>B</div>' +
                    '</outer-with-indirect-nested>',
                directives: [OuterWithIndirectNestedComponent]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('OUTER(SIMPLE(AB))');
                async.done();
            });
        }));
        testing_internal_1.it('should support nesting with content being direct child of a nested component', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<outer>' +
                    '<template manual class="left"><div>A</div></template>' +
                    '<div>B</div>' +
                    '<div>C</div>' +
                    '</outer>',
                directives: [OuterComponent, ManualViewportDirective],
            }))
                .createAsync(MainComp)
                .then(function (main) {
                var viewportDirective = main.debugElement.queryAllNodes(by_1.By.directive(ManualViewportDirective))[0]
                    .injector.get(ManualViewportDirective);
                matchers_1.expect(main.debugElement.nativeElement)
                    .toHaveText('OUTER(INNER(INNERINNER(,BC)))');
                viewportDirective.show();
                matchers_1.expect(main.debugElement.nativeElement)
                    .toHaveText('OUTER(INNER(INNERINNER(A,BC)))');
                async.done();
            });
        }));
        testing_internal_1.it('should redistribute when the shadow dom changes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<conditional-content>' +
                    '<div class="left">A</div>' +
                    '<div>B</div>' +
                    '<div>C</div>' +
                    '</conditional-content>',
                directives: [ConditionalContentComponent]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                var viewportDirective = main.debugElement.queryAllNodes(by_1.By.directive(ManualViewportDirective))[0]
                    .injector.get(ManualViewportDirective);
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('(, BC)');
                viewportDirective.show();
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('(A, BC)');
                viewportDirective.hide();
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('(, BC)');
                async.done();
            });
        }));
        // GH-2095 - https://github.com/angular/angular/issues/2095
        // important as we are removing the ng-content element during compilation,
        // which could skrew up text node indices.
        testing_internal_1.it('should support text nodes after content tags', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({ template: '<simple stringProp="text"></simple>', directives: [Simple] }))
                .overrideTemplate(Simple, '<ng-content></ng-content><p>P,</p>{{stringProp}}')
                .createAsync(MainComp)
                .then(function (main) {
                main.detectChanges();
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('P,text');
                async.done();
            });
        }));
        // important as we are moving style tags around during compilation,
        // which could skrew up text node indices.
        testing_internal_1.it('should support text nodes after style tags', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({ template: '<simple stringProp="text"></simple>', directives: [Simple] }))
                .overrideTemplate(Simple, '<style></style><p>P,</p>{{stringProp}}')
                .createAsync(MainComp)
                .then(function (main) {
                main.detectChanges();
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('P,text');
                async.done();
            });
        }));
        testing_internal_1.it('should support moving non projected light dom around', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<empty>' +
                    '  <template manual><div>A</div></template>' +
                    '</empty>' +
                    'START(<div project></div>)END',
                directives: [Empty, ProjectDirective, ManualViewportDirective],
            }))
                .createAsync(MainComp)
                .then(function (main) {
                var sourceDirective;
                // We can't use the child nodes to get a hold of this because it's not in the dom
                // at
                // all.
                debug_node_1.getAllDebugNodes().forEach(function (debug) {
                    if (debug.providerTokens.indexOf(ManualViewportDirective) !== -1) {
                        sourceDirective = debug.injector.get(ManualViewportDirective);
                    }
                });
                var projectDirective = main.debugElement.queryAllNodes(by_1.By.directive(ProjectDirective))[0]
                    .injector.get(ProjectDirective);
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('START()END');
                projectDirective.show(sourceDirective.templateRef);
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('START(A)END');
                async.done();
            });
        }));
        testing_internal_1.it('should support moving projected light dom around', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<simple><template manual><div>A</div></template></simple>' +
                    'START(<div project></div>)END',
                directives: [Simple, ProjectDirective, ManualViewportDirective],
            }))
                .createAsync(MainComp)
                .then(function (main) {
                var sourceDirective = main.debugElement.queryAllNodes(by_1.By.directive(ManualViewportDirective))[0]
                    .injector.get(ManualViewportDirective);
                var projectDirective = main.debugElement.queryAllNodes(by_1.By.directive(ProjectDirective))[0]
                    .injector.get(ProjectDirective);
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('SIMPLE()START()END');
                projectDirective.show(sourceDirective.templateRef);
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('SIMPLE()START(A)END');
                async.done();
            });
        }));
        testing_internal_1.it('should support moving ng-content around', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<conditional-content>' +
                    '<div class="left">A</div>' +
                    '<div>B</div>' +
                    '</conditional-content>' +
                    'START(<div project></div>)END',
                directives: [
                    ConditionalContentComponent, ProjectDirective, ManualViewportDirective
                ]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                var sourceDirective = main.debugElement.queryAllNodes(by_1.By.directive(ManualViewportDirective))[0]
                    .injector.get(ManualViewportDirective);
                var projectDirective = main.debugElement.queryAllNodes(by_1.By.directive(ProjectDirective))[0]
                    .injector.get(ProjectDirective);
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('(, B)START()END');
                projectDirective.show(sourceDirective.templateRef);
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('(, B)START(A)END');
                // Stamping ng-content multiple times should not produce the content multiple
                // times...
                projectDirective.show(sourceDirective.templateRef);
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('(, B)START(A)END');
                async.done();
            });
        }));
        // Note: This does not use a ng-content element, but
        // is still important as we are merging proto views independent of
        // the presence of ng-content elements!
        testing_internal_1.it('should still allow to implement a recursive trees', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({ template: '<tree></tree>', directives: [Tree] }))
                .createAsync(MainComp)
                .then(function (main) {
                main.detectChanges();
                var manualDirective = main.debugElement.queryAllNodes(by_1.By.directive(ManualViewportDirective))[0]
                    .injector.get(ManualViewportDirective);
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('TREE(0:)');
                manualDirective.show();
                main.detectChanges();
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('TREE(0:TREE(1:))');
                async.done();
            });
        }));
        // Note: This does not use a ng-content element, but
        // is still important as we are merging proto views independent of
        // the presence of ng-content elements!
        testing_internal_1.it('should still allow to implement a recursive trees via multiple components', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({ template: '<tree></tree>', directives: [Tree] }))
                .overrideView(Tree, new core_1.ViewMetadata({
                template: 'TREE({{depth}}:<tree2 *manual [depth]="depth+1"></tree2>)',
                directives: [Tree2, ManualViewportDirective]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                main.detectChanges();
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('TREE(0:)');
                var tree = main.debugElement.query(by_1.By.directive(Tree));
                var manualDirective = tree.queryAllNodes(by_1.By.directive(ManualViewportDirective))[0].injector.get(ManualViewportDirective);
                manualDirective.show();
                main.detectChanges();
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('TREE(0:TREE2(1:))');
                var tree2 = main.debugElement.query(by_1.By.directive(Tree2));
                manualDirective =
                    tree2.queryAllNodes(by_1.By.directive(ManualViewportDirective))[0].injector.get(ManualViewportDirective);
                manualDirective.show();
                main.detectChanges();
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('TREE(0:TREE2(1:TREE(2:)))');
                async.done();
            });
        }));
        if (dom_adapter_1.getDOM().supportsNativeShadowDOM()) {
            testing_internal_1.it('should support native content projection and isolate styles per component', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MainComp, new core_1.ViewMetadata({
                    template: '<simple-native1><div>A</div></simple-native1>' +
                        '<simple-native2><div>B</div></simple-native2>',
                    directives: [SimpleNative1, SimpleNative2]
                }))
                    .createAsync(MainComp)
                    .then(function (main) {
                    var childNodes = dom_adapter_1.getDOM().childNodes(main.debugElement.nativeElement);
                    matchers_1.expect(childNodes[0]).toHaveText('div {color: red}SIMPLE1(A)');
                    matchers_1.expect(childNodes[1]).toHaveText('div {color: blue}SIMPLE2(B)');
                    main.destroy();
                    async.done();
                });
            }));
        }
        if (dom_adapter_1.getDOM().supportsDOMEvents()) {
            testing_internal_1.it('should support non emulated styles', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MainComp, new core_1.ViewMetadata({
                    template: '<div class="redStyle"></div>',
                    styles: ['.redStyle { color: red}'],
                    encapsulation: core_1.ViewEncapsulation.None,
                    directives: [OtherComp]
                }))
                    .createAsync(MainComp)
                    .then(function (main) {
                    var mainEl = main.debugElement.nativeElement;
                    var div1 = dom_adapter_1.getDOM().firstChild(mainEl);
                    var div2 = dom_adapter_1.getDOM().createElement('div');
                    dom_adapter_1.getDOM().setAttribute(div2, 'class', 'redStyle');
                    dom_adapter_1.getDOM().appendChild(mainEl, div2);
                    matchers_1.expect(dom_adapter_1.getDOM().getComputedStyle(div1).color).toEqual('rgb(255, 0, 0)');
                    matchers_1.expect(dom_adapter_1.getDOM().getComputedStyle(div2).color).toEqual('rgb(255, 0, 0)');
                    async.done();
                });
            }));
            testing_internal_1.it('should support emulated style encapsulation', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MainComp, new core_1.ViewMetadata({
                    template: '<div></div>',
                    styles: ['div { color: red}'],
                    encapsulation: core_1.ViewEncapsulation.Emulated
                }))
                    .createAsync(MainComp)
                    .then(function (main) {
                    var mainEl = main.debugElement.nativeElement;
                    var div1 = dom_adapter_1.getDOM().firstChild(mainEl);
                    var div2 = dom_adapter_1.getDOM().createElement('div');
                    dom_adapter_1.getDOM().appendChild(mainEl, div2);
                    matchers_1.expect(dom_adapter_1.getDOM().getComputedStyle(div1).color).toEqual('rgb(255, 0, 0)');
                    matchers_1.expect(dom_adapter_1.getDOM().getComputedStyle(div2).color).toEqual('rgb(0, 0, 0)');
                    async.done();
                });
            }));
        }
        testing_internal_1.it('should support nested conditionals that contain ng-contents', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: "<conditional-text>a</conditional-text>",
                directives: [ConditionalTextComponent]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('MAIN()');
                var viewportElement = main.debugElement.queryAllNodes(by_1.By.directive(ManualViewportDirective))[0];
                viewportElement.injector.get(ManualViewportDirective).show();
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('MAIN(FIRST())');
                viewportElement =
                    main.debugElement.queryAllNodes(by_1.By.directive(ManualViewportDirective))[1];
                viewportElement.injector.get(ManualViewportDirective).show();
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('MAIN(FIRST(SECOND(a)))');
                async.done();
            });
        }));
        testing_internal_1.it('should allow to switch the order of nested components via ng-content', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: "<cmp-a><cmp-b></cmp-b></cmp-a>",
                directives: [CmpA, CmpB],
            }))
                .createAsync(MainComp)
                .then(function (main) {
                main.detectChanges();
                matchers_1.expect(dom_adapter_1.getDOM().getInnerHTML(main.debugElement.nativeElement))
                    .toEqual('<cmp-a><cmp-b><cmp-d><d>cmp-d</d></cmp-d></cmp-b>' +
                    '<cmp-c><c>cmp-c</c></cmp-c></cmp-a>');
                async.done();
            });
        }));
        testing_internal_1.it('should create nested components in the right order', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: "<cmp-a1></cmp-a1><cmp-a2></cmp-a2>",
                directives: [CmpA1, CmpA2],
            }))
                .createAsync(MainComp)
                .then(function (main) {
                main.detectChanges();
                matchers_1.expect(dom_adapter_1.getDOM().getInnerHTML(main.debugElement.nativeElement))
                    .toEqual('<cmp-a1>a1<cmp-b11>b11</cmp-b11><cmp-b12>b12</cmp-b12></cmp-a1>' +
                    '<cmp-a2>a2<cmp-b21>b21</cmp-b21><cmp-b22>b22</cmp-b22></cmp-a2>');
                async.done();
            });
        }));
        testing_internal_1.it('should project filled view containers into a view container', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<conditional-content>' +
                    '<div class="left">A</div>' +
                    '<template manual class="left">B</template>' +
                    '<div class="left">C</div>' +
                    '<div>D</div>' +
                    '</conditional-content>',
                directives: [ConditionalContentComponent, ManualViewportDirective]
            }))
                .createAsync(MainComp)
                .then(function (main) {
                var conditionalComp = main.debugElement.query(by_1.By.directive(ConditionalContentComponent));
                var viewViewportDir = conditionalComp.queryAllNodes(by_1.By.directive(ManualViewportDirective))[0]
                    .injector.get(ManualViewportDirective);
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('(, D)');
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('(, D)');
                viewViewportDir.show();
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('(AC, D)');
                var contentViewportDir = conditionalComp.queryAllNodes(by_1.By.directive(ManualViewportDirective))[1]
                    .inject(ManualViewportDirective);
                contentViewportDir.show();
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('(ABC, D)');
                // hide view viewport, and test that it also hides
                // the content viewport's views
                viewViewportDir.hide();
                matchers_1.expect(main.debugElement.nativeElement).toHaveText('(, D)');
                async.done();
            });
        }));
    });
}
exports.main = main;
var MainComp = (function () {
    function MainComp() {
        this.text = '';
    }
    /** @nocollapse */
    MainComp.decorators = [
        { type: core_1.Component, args: [{ selector: 'main', template: '', directives: [] },] },
    ];
    return MainComp;
}());
var OtherComp = (function () {
    function OtherComp() {
        this.text = '';
    }
    /** @nocollapse */
    OtherComp.decorators = [
        { type: core_1.Component, args: [{ selector: 'other', template: '', directives: [] },] },
    ];
    return OtherComp;
}());
var Simple = (function () {
    function Simple() {
        this.stringProp = '';
    }
    /** @nocollapse */
    Simple.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'simple',
                    inputs: ['stringProp'],
                    template: 'SIMPLE(<ng-content></ng-content>)',
                    directives: []
                },] },
    ];
    return Simple;
}());
var SimpleNative1 = (function () {
    function SimpleNative1() {
    }
    /** @nocollapse */
    SimpleNative1.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'simple-native1',
                    template: 'SIMPLE1(<content></content>)',
                    directives: [],
                    encapsulation: core_1.ViewEncapsulation.Native,
                    styles: ['div {color: red}']
                },] },
    ];
    return SimpleNative1;
}());
var SimpleNative2 = (function () {
    function SimpleNative2() {
    }
    /** @nocollapse */
    SimpleNative2.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'simple-native2',
                    template: 'SIMPLE2(<content></content>)',
                    directives: [],
                    encapsulation: core_1.ViewEncapsulation.Native,
                    styles: ['div {color: blue}']
                },] },
    ];
    return SimpleNative2;
}());
var Empty = (function () {
    function Empty() {
    }
    /** @nocollapse */
    Empty.decorators = [
        { type: core_1.Component, args: [{ selector: 'empty', template: '', directives: [] },] },
    ];
    return Empty;
}());
var MultipleContentTagsComponent = (function () {
    function MultipleContentTagsComponent() {
    }
    /** @nocollapse */
    MultipleContentTagsComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'multiple-content-tags',
                    template: '(<ng-content SELECT=".left"></ng-content>, <ng-content></ng-content>)',
                    directives: []
                },] },
    ];
    return MultipleContentTagsComponent;
}());
var ManualViewportDirective = (function () {
    function ManualViewportDirective(vc, templateRef) {
        this.vc = vc;
        this.templateRef = templateRef;
    }
    ManualViewportDirective.prototype.show = function () { this.vc.createEmbeddedView(this.templateRef); };
    ManualViewportDirective.prototype.hide = function () { this.vc.clear(); };
    /** @nocollapse */
    ManualViewportDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[manual]' },] },
    ];
    /** @nocollapse */
    ManualViewportDirective.ctorParameters = [
        { type: core_1.ViewContainerRef, },
        { type: core_1.TemplateRef, },
    ];
    return ManualViewportDirective;
}());
var ProjectDirective = (function () {
    function ProjectDirective(vc) {
        this.vc = vc;
    }
    ProjectDirective.prototype.show = function (templateRef) { this.vc.createEmbeddedView(templateRef); };
    ProjectDirective.prototype.hide = function () { this.vc.clear(); };
    /** @nocollapse */
    ProjectDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[project]' },] },
    ];
    /** @nocollapse */
    ProjectDirective.ctorParameters = [
        { type: core_1.ViewContainerRef, },
    ];
    return ProjectDirective;
}());
var OuterWithIndirectNestedComponent = (function () {
    function OuterWithIndirectNestedComponent() {
    }
    /** @nocollapse */
    OuterWithIndirectNestedComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'outer-with-indirect-nested',
                    template: 'OUTER(<simple><div><ng-content></ng-content></div></simple>)',
                    directives: [Simple]
                },] },
    ];
    return OuterWithIndirectNestedComponent;
}());
var OuterComponent = (function () {
    function OuterComponent() {
    }
    /** @nocollapse */
    OuterComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'outer',
                    template: 'OUTER(<inner><ng-content select=".left" class="left"></ng-content><ng-content></ng-content></inner>)',
                    directives: [core_1.forwardRef(function () { return InnerComponent; })]
                },] },
    ];
    return OuterComponent;
}());
var InnerComponent = (function () {
    function InnerComponent() {
    }
    /** @nocollapse */
    InnerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'inner',
                    template: 'INNER(<innerinner><ng-content select=".left" class="left"></ng-content><ng-content></ng-content></innerinner>)',
                    directives: [core_1.forwardRef(function () { return InnerInnerComponent; })]
                },] },
    ];
    return InnerComponent;
}());
var InnerInnerComponent = (function () {
    function InnerInnerComponent() {
    }
    /** @nocollapse */
    InnerInnerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'innerinner',
                    template: 'INNERINNER(<ng-content select=".left"></ng-content>,<ng-content></ng-content>)',
                    directives: []
                },] },
    ];
    return InnerInnerComponent;
}());
var ConditionalContentComponent = (function () {
    function ConditionalContentComponent() {
    }
    /** @nocollapse */
    ConditionalContentComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'conditional-content',
                    template: '<div>(<div *manual><ng-content select=".left"></ng-content></div>, <ng-content></ng-content>)</div>',
                    directives: [ManualViewportDirective]
                },] },
    ];
    return ConditionalContentComponent;
}());
var ConditionalTextComponent = (function () {
    function ConditionalTextComponent() {
    }
    /** @nocollapse */
    ConditionalTextComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'conditional-text',
                    template: 'MAIN(<template manual>FIRST(<template manual>SECOND(<ng-content></ng-content>)</template>)</template>)',
                    directives: [ManualViewportDirective]
                },] },
    ];
    return ConditionalTextComponent;
}());
var Tab = (function () {
    function Tab() {
    }
    /** @nocollapse */
    Tab.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tab',
                    template: '<div><div *manual>TAB(<ng-content></ng-content>)</div></div>',
                    directives: [ManualViewportDirective]
                },] },
    ];
    return Tab;
}());
var Tree2 = (function () {
    function Tree2() {
        this.depth = 0;
    }
    /** @nocollapse */
    Tree2.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tree2',
                    inputs: ['depth'],
                    template: 'TREE2({{depth}}:<tree *manual [depth]="depth+1"></tree>)',
                    directives: [ManualViewportDirective, core_1.forwardRef(function () { return Tree; })]
                },] },
    ];
    return Tree2;
}());
var Tree = (function () {
    function Tree() {
        this.depth = 0;
    }
    /** @nocollapse */
    Tree.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tree',
                    inputs: ['depth'],
                    template: 'TREE({{depth}}:<tree *manual [depth]="depth+1"></tree>)',
                    directives: [ManualViewportDirective, Tree, core_1.forwardRef(function () { return Tree; })]
                },] },
    ];
    return Tree;
}());
var CmpD = (function () {
    function CmpD(elementRef) {
        this.tagName = dom_adapter_1.getDOM().tagName(elementRef.nativeElement).toLowerCase();
    }
    /** @nocollapse */
    CmpD.decorators = [
        { type: core_1.Component, args: [{ selector: 'cmp-d', template: "<d>{{tagName}}</d>" },] },
    ];
    /** @nocollapse */
    CmpD.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    return CmpD;
}());
var CmpC = (function () {
    function CmpC(elementRef) {
        this.tagName = dom_adapter_1.getDOM().tagName(elementRef.nativeElement).toLowerCase();
    }
    /** @nocollapse */
    CmpC.decorators = [
        { type: core_1.Component, args: [{ selector: 'cmp-c', template: "<c>{{tagName}}</c>" },] },
    ];
    /** @nocollapse */
    CmpC.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    return CmpC;
}());
var CmpB = (function () {
    function CmpB() {
    }
    /** @nocollapse */
    CmpB.decorators = [
        { type: core_1.Component, args: [{ selector: 'cmp-b', template: "<ng-content></ng-content><cmp-d></cmp-d>", directives: [CmpD] },] },
    ];
    return CmpB;
}());
var CmpA = (function () {
    function CmpA() {
    }
    /** @nocollapse */
    CmpA.decorators = [
        { type: core_1.Component, args: [{ selector: 'cmp-a', template: "<ng-content></ng-content><cmp-c></cmp-c>", directives: [CmpC] },] },
    ];
    return CmpA;
}());
var CmpB11 = (function () {
    function CmpB11() {
    }
    /** @nocollapse */
    CmpB11.decorators = [
        { type: core_1.Component, args: [{ selector: 'cmp-b11', template: "{{'b11'}}", directives: [] },] },
    ];
    return CmpB11;
}());
var CmpB12 = (function () {
    function CmpB12() {
    }
    /** @nocollapse */
    CmpB12.decorators = [
        { type: core_1.Component, args: [{ selector: 'cmp-b12', template: "{{'b12'}}", directives: [] },] },
    ];
    return CmpB12;
}());
var CmpB21 = (function () {
    function CmpB21() {
    }
    /** @nocollapse */
    CmpB21.decorators = [
        { type: core_1.Component, args: [{ selector: 'cmp-b21', template: "{{'b21'}}", directives: [] },] },
    ];
    return CmpB21;
}());
var CmpB22 = (function () {
    function CmpB22() {
    }
    /** @nocollapse */
    CmpB22.decorators = [
        { type: core_1.Component, args: [{ selector: 'cmp-b22', template: "{{'b22'}}", directives: [] },] },
    ];
    return CmpB22;
}());
var CmpA1 = (function () {
    function CmpA1() {
    }
    /** @nocollapse */
    CmpA1.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'cmp-a1',
                    template: "{{'a1'}}<cmp-b11></cmp-b11><cmp-b12></cmp-b12>",
                    directives: [CmpB11, CmpB12]
                },] },
    ];
    return CmpA1;
}());
var CmpA2 = (function () {
    function CmpA2() {
    }
    /** @nocollapse */
    CmpA2.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'cmp-a2',
                    template: "{{'a2'}}<cmp-b21></cmp-b21><cmp-b22></cmp-b22>",
                    directives: [CmpB21, CmpB22]
                },] },
    ];
    return CmpA2;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdGlvbl9pbnRlZ3JhdGlvbl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvbGlua2VyL3Byb2plY3Rpb25faW50ZWdyYXRpb25fc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQXlILHdDQUF3QyxDQUFDLENBQUE7QUFDbEsseUJBQXFCLDRDQUE0QyxDQUFDLENBQUE7QUFDbEUsd0JBQXFELHVCQUF1QixDQUFDLENBQUE7QUFFN0UsNEJBQXFCLCtDQUErQyxDQUFDLENBQUE7QUFFckUscUJBQTJILGVBQWUsQ0FBQyxDQUFBO0FBQzNJLG1CQUFrQiw0Q0FBNEMsQ0FBQyxDQUFBO0FBQy9ELDJCQUErQixvQ0FBb0MsQ0FBQyxDQUFBO0FBRXBFO0lBQ0UsMkJBQVEsQ0FBQyxZQUFZLEVBQUU7UUFDckIscUJBQUUsQ0FBQyxrQ0FBa0MsRUFDbEMseUJBQU0sQ0FDRixDQUFDLDhCQUFvQixFQUFFLHFDQUFrQixDQUFDLEVBQzFDLFVBQUMsR0FBeUIsRUFBRSxLQUF5QjtZQUNuRCxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLG1CQUFZLENBQUM7Z0JBQ3pCLFFBQVEsRUFBRSxVQUFVO29CQUNoQixjQUFjO29CQUNkLFdBQVc7Z0JBQ2YsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDO2FBQ3JCLENBQUMsQ0FBQztpQkFDZixXQUFXLENBQUMsUUFBUSxDQUFDO2lCQUNyQixJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUNULGlCQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2hFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVYLHFC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