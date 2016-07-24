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
var async_1 = require('../../src/facade/async');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var by_1 = require('@angular/platform-browser/src/dom/debug/by');
var metadata_1 = require('@angular/core/src/metadata');
var Logger = (function () {
    function Logger() {
        this.logs = [];
    }
    Logger.prototype.add = function (thing) { this.logs.push(thing); };
    /** @nocollapse */
    Logger.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    Logger.ctorParameters = [];
    return Logger;
}());
var MessageDir = (function () {
    function MessageDir(logger) {
        this.logger = logger;
    }
    Object.defineProperty(MessageDir.prototype, "message", {
        set: function (newMessage) { this.logger.add(newMessage); },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    MessageDir.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[message]', inputs: ['message'] },] },
    ];
    /** @nocollapse */
    MessageDir.ctorParameters = [
        { type: Logger, },
    ];
    return MessageDir;
}());
var ChildComp = (function () {
    function ChildComp() {
        this.childBinding = 'Original';
    }
    /** @nocollapse */
    ChildComp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'child-comp',
                    template: "<div class=\"child\" message=\"child\">\n               <span class=\"childnested\" message=\"nestedchild\">Child</span>\n             </div>\n             <span class=\"child\" [innerHtml]=\"childBinding\"></span>",
                    directives: [MessageDir],
                },] },
    ];
    /** @nocollapse */
    ChildComp.ctorParameters = [];
    return ChildComp;
}());
var ParentComp = (function () {
    function ParentComp() {
        this.parentBinding = 'OriginalParent';
    }
    /** @nocollapse */
    ParentComp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'parent-comp',
                    viewProviders: [Logger],
                    template: "<div class=\"parent\" message=\"parent\">\n               <span class=\"parentnested\" message=\"nestedparent\">Parent</span>\n             </div>\n             <span class=\"parent\" [innerHtml]=\"parentBinding\"></span>\n             <child-comp class=\"child-comp-class\"></child-comp>",
                    directives: [ChildComp, MessageDir],
                },] },
    ];
    /** @nocollapse */
    ParentComp.ctorParameters = [];
    return ParentComp;
}());
var CustomEmitter = (function () {
    function CustomEmitter() {
        this.myevent = new async_1.EventEmitter();
    }
    /** @nocollapse */
    CustomEmitter.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'custom-emitter', outputs: ['myevent'] },] },
    ];
    /** @nocollapse */
    CustomEmitter.ctorParameters = [];
    return CustomEmitter;
}());
var EventsComp = (function () {
    function EventsComp() {
        this.clicked = false;
        this.customed = false;
    }
    EventsComp.prototype.handleClick = function () { this.clicked = true; };
    EventsComp.prototype.handleCustom = function () { this.customed = true; };
    /** @nocollapse */
    EventsComp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'events-comp',
                    template: "<button (click)=\"handleClick()\"></button>\n             <custom-emitter (myevent)=\"handleCustom()\"></custom-emitter>",
                    directives: [CustomEmitter],
                },] },
    ];
    /** @nocollapse */
    EventsComp.ctorParameters = [];
    return EventsComp;
}());
var ConditionalContentComp = (function () {
    function ConditionalContentComp() {
        this.myBool = false;
    }
    /** @nocollapse */
    ConditionalContentComp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'cond-content-comp',
                    viewProviders: [Logger],
                    template: "<div class=\"child\" message=\"child\" *ngIf=\"myBool\"><ng-content></ng-content></div>",
                    directives: [common_1.NgIf, MessageDir],
                },] },
    ];
    return ConditionalContentComp;
}());
var ConditionalParentComp = (function () {
    function ConditionalParentComp() {
        this.parentBinding = 'OriginalParent';
    }
    /** @nocollapse */
    ConditionalParentComp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'conditional-parent-comp',
                    viewProviders: [Logger],
                    template: "<span class=\"parent\" [innerHtml]=\"parentBinding\"></span>\n            <cond-content-comp class=\"cond-content-comp-class\">\n              <span class=\"from-parent\"></span>\n            </cond-content-comp>",
                    directives: [ConditionalContentComp],
                },] },
    ];
    /** @nocollapse */
    ConditionalParentComp.ctorParameters = [];
    return ConditionalParentComp;
}());
var UsingFor = (function () {
    function UsingFor() {
        this.stuff = ['one', 'two', 'three'];
    }
    /** @nocollapse */
    UsingFor.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'using-for',
                    viewProviders: [Logger],
                    template: "<span *ngFor=\"let thing of stuff\" [innerHtml]=\"thing\"></span>\n            <ul message=\"list\">\n              <li *ngFor=\"let item of stuff\" [innerHtml]=\"item\"></li>\n            </ul>",
                    directives: [common_1.NgFor, MessageDir],
                },] },
    ];
    /** @nocollapse */
    UsingFor.ctorParameters = [];
    return UsingFor;
}());
var MyDir = (function () {
    function MyDir() {
    }
    /** @nocollapse */
    MyDir.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[mydir]', exportAs: 'mydir' },] },
    ];
    return MyDir;
}());
var LocalsComp = (function () {
    function LocalsComp() {
    }
    /** @nocollapse */
    LocalsComp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'locals-comp',
                    template: "\n   <div mydir #alice=\"mydir\"></div>\n ",
                    directives: [MyDir]
                },] },
    ];
    return LocalsComp;
}());
var BankAccount = (function () {
    function BankAccount() {
    }
    /** @nocollapse */
    BankAccount.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'bank-account',
                    template: "\n   Bank Name: {{bank}}\n   Account Id: {{id}}\n "
                },] },
    ];
    /** @nocollapse */
    BankAccount.propDecorators = {
        'bank': [{ type: metadata_1.Input },],
        'id': [{ type: metadata_1.Input, args: ['account',] },],
    };
    return BankAccount;
}());
var TestApp = (function () {
    function TestApp() {
        this.width = 200;
        this.color = 'red';
        this.isClosed = true;
    }
    /** @nocollapse */
    TestApp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'test-app',
                    template: "\n   <bank-account bank=\"RBC\"\n                 account=\"4747\"\n                 [style.width.px]=\"width\"\n                 [style.color]=\"color\"\n                 [class.closed]=\"isClosed\"\n                 [class.open]=\"!isClosed\"></bank-account>\n ",
                    directives: [BankAccount]
                },] },
    ];
    return TestApp;
}());
function main() {
    testing_internal_1.describe('debug element', function () {
        testing_internal_1.it('should list all child nodes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(ParentComp).then(function (fixture) {
                fixture.detectChanges();
                // The root component has 3 elements and 2 text node children.
                matchers_1.expect(fixture.debugElement.childNodes.length).toEqual(5);
                async.done();
            });
        }));
        testing_internal_1.it('should list all component child elements', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(ParentComp).then(function (fixture) {
                fixture.detectChanges();
                var childEls = fixture.debugElement.children;
                // The root component has 3 elements in its view.
                matchers_1.expect(childEls.length).toEqual(3);
                matchers_1.expect(dom_adapter_1.getDOM().hasClass(childEls[0].nativeElement, 'parent')).toBe(true);
                matchers_1.expect(dom_adapter_1.getDOM().hasClass(childEls[1].nativeElement, 'parent')).toBe(true);
                matchers_1.expect(dom_adapter_1.getDOM().hasClass(childEls[2].nativeElement, 'child-comp-class')).toBe(true);
                var nested = childEls[0].children;
                matchers_1.expect(nested.length).toEqual(1);
                matchers_1.expect(dom_adapter_1.getDOM().hasClass(nested[0].nativeElement, 'parentnested')).toBe(true);
                var childComponent = childEls[2];
                var childCompChildren = childComponent.children;
                matchers_1.expect(childCompChildren.length).toEqual(2);
                matchers_1.expect(dom_adapter_1.getDOM().hasClass(childCompChildren[0].nativeElement, 'child')).toBe(true);
                matchers_1.expect(dom_adapter_1.getDOM().hasClass(childCompChildren[1].nativeElement, 'child')).toBe(true);
                var childNested = childCompChildren[0].children;
                matchers_1.expect(childNested.length).toEqual(1);
                matchers_1.expect(dom_adapter_1.getDOM().hasClass(childNested[0].nativeElement, 'childnested')).toBe(true);
                async.done();
            });
        }));
        testing_internal_1.it('should list conditional component child elements', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(ConditionalParentComp).then(function (fixture) {
                fixture.detectChanges();
                var childEls = fixture.debugElement.children;
                // The root component has 2 elements in its view.
                matchers_1.expect(childEls.length).toEqual(2);
                matchers_1.expect(dom_adapter_1.getDOM().hasClass(childEls[0].nativeElement, 'parent')).toBe(true);
                matchers_1.expect(dom_adapter_1.getDOM().hasClass(childEls[1].nativeElement, 'cond-content-comp-class'))
                    .toBe(true);
                var conditionalContentComp = childEls[1];
                matchers_1.expect(conditionalContentComp.children.length).toEqual(0);
                conditionalContentComp.componentInstance.myBool = true;
                fixture.detectChanges();
                matchers_1.expect(conditionalContentComp.children.length).toEqual(1);
                async.done();
            });
        }));
        testing_internal_1.it('should list child elements within viewports', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(UsingFor).then(function (fixture) {
                fixture.detectChanges();
                var childEls = fixture.debugElement.children;
                matchers_1.expect(childEls.length).toEqual(4);
                // The 4th child is the <ul>
                var list = childEls[3];
                matchers_1.expect(list.children.length).toEqual(3);
                async.done();
            });
        }));
        testing_internal_1.it('should list element attributes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(TestApp).then(function (fixture) {
                fixture.detectChanges();
                var bankElem = fixture.debugElement.children[0];
                matchers_1.expect(bankElem.attributes['bank']).toEqual('RBC');
                matchers_1.expect(bankElem.attributes['account']).toEqual('4747');
                async.done();
            });
        }));
        testing_internal_1.it('should list element classes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(TestApp).then(function (fixture) {
                fixture.detectChanges();
                var bankElem = fixture.debugElement.children[0];
                matchers_1.expect(bankElem.classes['closed']).toBe(true);
                matchers_1.expect(bankElem.classes['open']).toBe(false);
                async.done();
            });
        }));
        testing_internal_1.it('should list element styles', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(TestApp).then(function (fixture) {
                fixture.detectChanges();
                var bankElem = fixture.debugElement.children[0];
                matchers_1.expect(bankElem.styles['width']).toEqual('200px');
                matchers_1.expect(bankElem.styles['color']).toEqual('red');
                async.done();
            });
        }));
        testing_internal_1.it('should query child elements by css', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(ParentComp).then(function (fixture) {
                fixture.detectChanges();
                var childTestEls = fixture.debugElement.queryAll(by_1.By.css('child-comp'));
                matchers_1.expect(childTestEls.length).toBe(1);
                matchers_1.expect(dom_adapter_1.getDOM().hasClass(childTestEls[0].nativeElement, 'child-comp-class'))
                    .toBe(true);
                async.done();
            });
        }));
        testing_internal_1.it('should query child elements by directive', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(ParentComp).then(function (fixture) {
                fixture.detectChanges();
                var childTestEls = fixture.debugElement.queryAll(by_1.By.directive(MessageDir));
                matchers_1.expect(childTestEls.length).toBe(4);
                matchers_1.expect(dom_adapter_1.getDOM().hasClass(childTestEls[0].nativeElement, 'parent')).toBe(true);
                matchers_1.expect(dom_adapter_1.getDOM().hasClass(childTestEls[1].nativeElement, 'parentnested')).toBe(true);
                matchers_1.expect(dom_adapter_1.getDOM().hasClass(childTestEls[2].nativeElement, 'child')).toBe(true);
                matchers_1.expect(dom_adapter_1.getDOM().hasClass(childTestEls[3].nativeElement, 'childnested')).toBe(true);
                async.done();
            });
        }));
        testing_internal_1.it('should list providerTokens', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(ParentComp).then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.providerTokens).toContain(Logger);
                async.done();
            });
        }));
        testing_internal_1.it('should list locals', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(LocalsComp).then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.children[0].references['alice']).toBeAnInstanceOf(MyDir);
                async.done();
            });
        }));
        testing_internal_1.it('should allow injecting from the element injector', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(ParentComp).then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect((fixture.debugElement.children[0].injector.get(Logger)).logs)
                    .toEqual(['parent', 'nestedparent', 'child', 'nestedchild']);
                async.done();
            });
        }));
        testing_internal_1.it('should list event listeners', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(EventsComp).then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.children[0].listeners.length).toEqual(1);
                matchers_1.expect(fixture.debugElement.children[1].listeners.length).toEqual(1);
                async.done();
            });
        }));
        testing_internal_1.it('should trigger event handlers', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(EventsComp).then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.componentInstance.clicked).toBe(false);
                matchers_1.expect(fixture.debugElement.componentInstance.customed).toBe(false);
                fixture.debugElement.children[0].triggerEventHandler('click', {});
                matchers_1.expect(fixture.debugElement.componentInstance.clicked).toBe(true);
                fixture.debugElement.children[1].triggerEventHandler('myevent', {});
                matchers_1.expect(fixture.debugElement.componentInstance.customed).toBe(true);
                async.done();
            });
        }));
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWdfbm9kZV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvZGVidWcvZGVidWdfbm9kZV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBeUgsd0NBQXdDLENBQUMsQ0FBQTtBQUNsSyx5QkFBcUIsNENBQTRDLENBQUMsQ0FBQTtBQUNsRSx3QkFBbUMsdUJBQXVCLENBQUMsQ0FBQTtBQUUzRCw0QkFBcUIsK0NBQStDLENBQUMsQ0FBQTtBQUVyRSxzQkFBMkIsd0JBQXdCLENBQUMsQ0FBQTtBQUVwRCxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsdUJBQTBCLGlCQUFpQixDQUFDLENBQUE7QUFDNUMsbUJBQWlCLDRDQUE0QyxDQUFDLENBQUE7QUFFOUQseUJBQTBDLDRCQUE0QixDQUFDLENBQUE7QUFDdkU7SUFHRTtRQUFnQixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUFDLENBQUM7SUFFakMsb0JBQUcsR0FBSCxVQUFJLEtBQWEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0Msa0JBQWtCO0lBQ1gsaUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsaUJBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gscUJBQWMsR0FBMkQsRUFDL0UsQ0FBQztJQUNGLGFBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQztBQUNEO0lBR0Usb0JBQVksTUFBYztRQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQUMsQ0FBQztJQUVyRCxzQkFBSSwrQkFBTzthQUFYLFVBQVksVUFBa0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ2xFLGtCQUFrQjtJQUNYLHFCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLG9CQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFDLEVBQUcsRUFBRTtLQUMxRSxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gseUJBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsTUFBTSxHQUFHO0tBQ2YsQ0FBQztJQUNGLGlCQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFDRDtJQUdFO1FBQWdCLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDO0lBQUMsQ0FBQztJQUNuRCxrQkFBa0I7SUFDWCxvQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxvQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFLHdOQUd3RDtvQkFDbEUsVUFBVSxFQUFFLENBQUMsVUFBVSxDQUFDO2lCQUN6QixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsd0JBQWMsR0FBMkQsRUFDL0UsQ0FBQztJQUNGLGdCQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQztBQUNEO0lBRUU7UUFBZ0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQztJQUFDLENBQUM7SUFDMUQsa0JBQWtCO0lBQ1gscUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsb0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLGFBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQztvQkFDdkIsUUFBUSxFQUFFLGtTQUlvRDtvQkFDOUQsVUFBVSxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQztpQkFDcEMsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHlCQUFjLEdBQTJELEVBQy9FLENBQUM7SUFDRixpQkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkM7QUFDRDtJQUdFO1FBQWdCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxvQkFBWSxFQUFFLENBQUM7SUFBQyxDQUFDO0lBQ3RELGtCQUFrQjtJQUNYLHdCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLG9CQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUMsRUFBRyxFQUFFO0tBQ2hGLENBQUM7SUFDRixrQkFBa0I7SUFDWCw0QkFBYyxHQUEyRCxFQUMvRSxDQUFDO0lBQ0Ysb0JBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQUNEO0lBSUU7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBRUQsZ0NBQVcsR0FBWCxjQUFnQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFdEMsaUNBQVksR0FBWixjQUFpQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDMUMsa0JBQWtCO0lBQ1gscUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsb0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSwwSEFDOEQ7b0JBQ3hFLFVBQVUsRUFBRSxDQUFDLGFBQWEsQ0FBQztpQkFDNUIsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHlCQUFjLEdBQTJELEVBQy9FLENBQUM7SUFDRixpQkFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7QUFDRDtJQUFBO1FBQ0UsV0FBTSxHQUFZLEtBQUssQ0FBQztJQVUxQixDQUFDO0lBVEQsa0JBQWtCO0lBQ1gsaUNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsb0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsYUFBYSxFQUFFLENBQUMsTUFBTSxDQUFDO29CQUN2QixRQUFRLEVBQUUseUZBQW1GO29CQUM3RixVQUFVLEVBQUUsQ0FBQyxhQUFJLEVBQUUsVUFBVSxDQUFDO2lCQUMvQixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0YsNkJBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQUNEO0lBRUU7UUFBZ0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQztJQUFDLENBQUM7SUFDMUQsa0JBQWtCO0lBQ1gsZ0NBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsb0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsYUFBYSxFQUFFLENBQUMsTUFBTSxDQUFDO29CQUN2QixRQUFRLEVBQUUsc05BR3FCO29CQUMvQixVQUFVLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztpQkFDckMsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLG9DQUFjLEdBQTJELEVBQy9FLENBQUM7SUFDRiw0QkFBQztBQUFELENBQUMsQUFsQkQsSUFrQkM7QUFDRDtJQUVFO1FBQWdCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQUMsQ0FBQztJQUN6RCxrQkFBa0I7SUFDWCxtQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxvQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsV0FBVztvQkFDckIsYUFBYSxFQUFFLENBQUMsTUFBTSxDQUFDO29CQUN2QixRQUFRLEVBQUUsb01BR007b0JBQ2hCLFVBQVUsRUFBRSxDQUFDLGNBQUssRUFBRSxVQUFVLENBQUM7aUJBQ2hDLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCx1QkFBYyxHQUEyRCxFQUMvRSxDQUFDO0lBQ0YsZUFBQztBQUFELENBQUMsQUFsQkQsSUFrQkM7QUFDRDtJQUFBO0lBS0EsQ0FBQztJQUpELGtCQUFrQjtJQUNYLGdCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLG9CQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUMsRUFBRyxFQUFFO0tBQ3RFLENBQUM7SUFDRixZQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFDRDtJQUFBO0lBV0EsQ0FBQztJQVZELGtCQUFrQjtJQUNYLHFCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLG9CQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsNENBRVY7b0JBQ0EsVUFBVSxFQUFFLENBQUMsS0FBSyxDQUFDO2lCQUNwQixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0YsaUJBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQUNEO0lBQUE7SUFrQkEsQ0FBQztJQWZELGtCQUFrQjtJQUNYLHNCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLG9CQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUUsb0RBR1Y7aUJBQ0QsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDBCQUFjLEdBQTJDO1FBQ2hFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGdCQUFLLEVBQUUsRUFBRTtRQUMxQixJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxnQkFBSyxFQUFFLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRyxFQUFFLEVBQUU7S0FDNUMsQ0FBQztJQUNGLGtCQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQztBQUNEO0lBQUE7UUFDRSxVQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ1osVUFBSyxHQUFHLEtBQUssQ0FBQztRQUNkLGFBQVEsR0FBRyxJQUFJLENBQUM7SUFnQmxCLENBQUM7SUFmRCxrQkFBa0I7SUFDWCxrQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxvQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsVUFBVTtvQkFDcEIsUUFBUSxFQUFFLHlRQU9WO29CQUNBLFVBQVUsRUFBRSxDQUFDLFdBQVcsQ0FBQztpQkFDMUIsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGNBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDO0FBRUQ7SUFDRSwyQkFBUSxDQUFDLGVBQWUsRUFBRTtRQUN4QixxQkFBRSxDQUFDLDZCQUE2QixFQUM3Qix5QkFBTSxDQUNGLENBQUMsOEJBQW9CLEVBQUUscUNBQWtCLENBQUMsRUFDMUMsVUFBQyxHQUF5QixFQUFFLEtBQXlCO1lBQ25ELEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsT0FBTztnQkFDdkMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUV4Qiw4REFBOEQ7Z0JBQzlELGlCQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFWCxxQkFBRSxDQUFDLDBDQUEwQyxFQUMxQyx5QkFBTSxDQUNGLENBQUMsOEJBQW9CLEVBQUUscUNBQWtCLENBQUMsRUFDMUMsVUFBQyxHQUF5QixFQUFFLEtBQXlCO1lBRW5ELEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsT0FBTztnQkFDdkMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUV4QixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztnQkFFN0MsaURBQWlEO2dCQUNqRCxpQkFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLGlCQUFNLENBQUMsb0JBQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMxRSxpQkFBTSxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUUsaUJBQU0sQ0FBQyxvQkFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFcEYsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFDbEMsaUJBQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxpQkFBTSxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFOUUsSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVqQyxJQUFJLGlCQUFpQixHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUM7Z0JBQ2hELGlCQUFNLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxpQkFBTSxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsRixpQkFBTSxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVsRixJQUFJLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7Z0JBQ2hELGlCQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsaUJBQU0sQ0FBQyxvQkFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRWxGLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVYLHFCQUFFLENBQUMsa0RBQWtELEVBQ2xELHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMxQyxVQUFDLEdBQXlCLEVBQUUsS0FBeUI7WUFDbkQsR0FBRyxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBQ2xELE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFFeEIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7Z0JBRTdDLGlEQUFpRDtnQkFDakQsaUJBQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxpQkFBTSxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUUsaUJBQU0sQ0FBQyxvQkFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUseUJBQXlCLENBQUMsQ0FBQztxQkFDMUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVoQixJQUFJLHNCQUFzQixHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFekMsaUJBQU0sQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUxRCxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUN2RCxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBRXhCLGlCQUFNLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRVgscUJBQUUsQ0FBQyw2Q0FBNkMsRUFDN0MseUJBQU0sQ0FDRixDQUFDLDhCQUFvQixFQUFFLHFDQUFrQixDQUFDLEVBQzFDLFVBQUMsR0FBeUIsRUFBRSxLQUF5QjtZQUNuRCxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBQ3JDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFFeEIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7Z0JBQzdDLGlCQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFbkMsNEJBQTRCO2dCQUM1QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXZCLGlCQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXhDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVYLHFCQUFFLENBQUMsZ0NBQWdDLEVBQ2hDLHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMxQyxVQUFDLEdBQXlCLEVBQUUsS0FBeUI7WUFDbkQsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPO2dCQUNwQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3hCLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVoRCxpQkFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25ELGlCQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkQsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRVgscUJBQUUsQ0FBQyw2QkFBNkIsRUFDN0IseUJBQU0sQ0FDRixDQUFDLDhCQUFvQixFQUFFLHFDQUFrQixDQUFDLEVBQzFDLFVBQUMsR0FBeUIsRUFBRSxLQUF5QjtZQUNuRCxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBQ3BDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRWhELGlCQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDOUMsaUJBQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFWCxxQkFBRSxDQUFDLDRCQUE0QixFQUFFLHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMxQyxVQUFDLEdBQXlCLEVBQUUsS0FBeUI7WUFDbkQsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPO2dCQUNwQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3hCLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVoRCxpQkFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xELGlCQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEQsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXpDLHFCQUFFLENBQUMsb0NBQW9DLEVBQ3BDLHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMxQyxVQUFDLEdBQXlCLEVBQUUsS0FBeUI7WUFDbkQsR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPO2dCQUN2QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBRXhCLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFFdkUsaUJBQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxpQkFBTSxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO3FCQUN2RSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRWhCLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVYLHFCQUFFLENBQUMsMENBQTBDLEVBQzFDLHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMxQyxVQUFDLEdBQXlCLEVBQUUsS0FBeUI7WUFDbkQsR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPO2dCQUN2QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBRXhCLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFFM0UsaUJBQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxpQkFBTSxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDOUUsaUJBQU0sQ0FBQyxvQkFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BGLGlCQUFNLENBQUMsb0JBQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3RSxpQkFBTSxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFbkYsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRVgscUJBQUUsQ0FBQyw0QkFBNEIsRUFDNUIseUJBQU0sQ0FDRixDQUFDLDhCQUFvQixFQUFFLHFDQUFrQixDQUFDLEVBQzFDLFVBQUMsR0FBeUIsRUFBRSxLQUF5QjtZQUVuRCxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBQ3ZDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFFeEIsaUJBQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFOUQsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRVgscUJBQUUsQ0FBQyxvQkFBb0IsRUFDcEIseUJBQU0sQ0FDRixDQUFDLDhCQUFvQixFQUFFLHFDQUFrQixDQUFDLEVBQzFDLFVBQUMsR0FBeUIsRUFBRSxLQUF5QjtZQUNuRCxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBQ3ZDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFFeEIsaUJBQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFckYsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRVgscUJBQUUsQ0FBQyxrREFBa0QsRUFDbEQseUJBQU0sQ0FDRixDQUFDLDhCQUFvQixFQUFFLHFDQUFrQixDQUFDLEVBQzFDLFVBQUMsR0FBeUIsRUFBRSxLQUF5QjtZQUVuRCxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBQ3ZDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFFeEIsaUJBQU0sQ0FBVSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUUsQ0FBQyxJQUFJLENBQUM7cUJBQ3pFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBRWpFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVYLHFCQUFFLENBQUMsNkJBQTZCLEVBQzdCLHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMxQyxVQUFDLEdBQXlCLEVBQUUsS0FBeUI7WUFFbkQsR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPO2dCQUN2QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBRXhCLGlCQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckUsaUJBQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVyRSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFHWCxxQkFBRSxDQUFDLCtCQUErQixFQUMvQix5QkFBTSxDQUNGLENBQUMsOEJBQW9CLEVBQUUscUNBQWtCLENBQUMsRUFDMUMsVUFBQyxHQUF5QixFQUFFLEtBQXlCO1lBRW5ELEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsT0FBTztnQkFDdkMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUV4QixpQkFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuRSxpQkFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUVwRSxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQVMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pFLGlCQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRWxFLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBUyxFQUFFLENBQUMsQ0FBQztnQkFDM0UsaUJBQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFbkUsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBNVBlLFlBQUksT0E0UG5CLENBQUEifQ==