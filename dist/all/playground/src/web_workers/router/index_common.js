/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var start_1 = require('./components/start');
var about_1 = require('./components/about');
var contact_1 = require('./components/contact');
var router_1 = require('@angular/router');
var platform_browser_1 = require('@angular/platform-browser');
var common_1 = require('@angular/common');
var App = (function () {
    function App(router) {
        // this should not be required once web worker bootstrap method can use modules
        router.initialNavigation();
    }
    /** @nocollapse */
    App.decorators = [
        { type: core_1.Component, args: [{ selector: 'app', templateUrl: 'app.html' },] },
    ];
    /** @nocollapse */
    App.ctorParameters = [
        { type: router_1.Router, },
    ];
    return App;
}());
exports.App = App;
exports.ROUTES = [
    { path: '', component: start_1.Start },
    { path: 'contact', component: contact_1.Contact },
    { path: 'about', component: about_1.About }
];
var AppModule = (function () {
    function AppModule(appRef) {
        appRef.waitForAsyncInitializers().then(function () {
            appRef.bootstrap(App);
        });
    }
    /** @nocollapse */
    AppModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [platform_browser_1.WorkerAppModule, router_1.RouterModule],
                    providers: [router_1.provideRoutes(exports.ROUTES), platform_browser_1.WORKER_APP_LOCATION_PROVIDERS, { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
                    precompile: [App],
                    declarations: [App, start_1.Start, contact_1.Contact, about_1.About]
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = [
        { type: core_1.ApplicationRef, },
    ];
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhfY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9wbGF5Z3JvdW5kL3NyYy93ZWJfd29ya2Vycy9yb3V0ZXIvaW5kZXhfY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBa0QsZUFBZSxDQUFDLENBQUE7QUFDbEUsc0JBQW9CLG9CQUFvQixDQUFDLENBQUE7QUFDekMsc0JBQW9CLG9CQUFvQixDQUFDLENBQUE7QUFDekMsd0JBQXNCLHNCQUFzQixDQUFDLENBQUE7QUFDN0MsdUJBQWtELGlCQUFpQixDQUFDLENBQUE7QUFDcEUsaUNBQTZELDJCQUEyQixDQUFDLENBQUE7QUFDekYsdUJBQXFELGlCQUFpQixDQUFDLENBQUE7QUFDdkU7SUFDRSxhQUFZLE1BQWM7UUFDeEIsK0VBQStFO1FBQy9FLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDSCxrQkFBa0I7SUFDWCxjQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUMsRUFBRyxFQUFFO0tBQ3hFLENBQUM7SUFDRixrQkFBa0I7SUFDWCxrQkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxlQUFNLEdBQUc7S0FDZixDQUFDO0lBQ0YsVUFBQztBQUFELENBQUMsQUFiRCxJQWFDO0FBYlksV0FBRyxNQWFmLENBQUE7QUFFWSxjQUFNLEdBQUc7SUFDcEIsRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxhQUFLLEVBQUM7SUFDNUIsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBTyxFQUFDO0lBQ3JDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsYUFBSyxFQUFDO0NBQ2xDLENBQUM7QUFDRjtJQUNFLG1CQUFZLE1BQXNCO1FBQ2hDLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLElBQUksQ0FBRTtZQUN0QyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILGtCQUFrQjtJQUNYLG9CQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGVBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsa0NBQWUsRUFBRSxxQkFBWSxDQUFDO29CQUN4QyxTQUFTLEVBQUUsQ0FBQyxzQkFBYSxDQUFDLGNBQU0sQ0FBQyxFQUFFLGdEQUE2QixFQUFFLEVBQUMsT0FBTyxFQUFFLHlCQUFnQixFQUFFLFFBQVEsRUFBRSw2QkFBb0IsRUFBQyxDQUFDO29CQUM5SCxVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7b0JBQ2pCLFlBQVksRUFBRSxDQUFDLEdBQUcsRUFBRSxhQUFLLEVBQUUsaUJBQU8sRUFBRSxhQUFLLENBQUM7aUJBQzNDLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCx3QkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxxQkFBYyxHQUFHO0tBQ3ZCLENBQUM7SUFDRixnQkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkM7QUFuQlksaUJBQVMsWUFtQnJCLENBQUEifQ==