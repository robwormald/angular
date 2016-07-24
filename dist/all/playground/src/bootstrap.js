/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global /** TODO #9100 */) {
    writeScriptTag('/all/playground/vendor/es6-shim.js');
    writeScriptTag('/all/playground/vendor/zone.js');
    writeScriptTag('/all/playground/vendor/long-stack-trace-zone.js');
    writeScriptTag('/all/playground/vendor/system.src.js');
    writeScriptTag('/all/playground/vendor/Reflect.js');
    writeScriptTag('/all/playground/vendor/rxjs/bundles/Rx.js', 'playgroundBootstrap()');
    global.playgroundBootstrap = playgroundBootstrap;
    function playgroundBootstrap() {
        // check query param
        var useBundles = location.search.indexOf('bundles=false') == -1;
        if (useBundles) {
            System.config({
                map: {
                    'index': 'index.js',
                    '@angular/core': '/packages-dist/core/bundles/core.umd.js',
                    '@angular/common': '/packages-dist/common/bundles/common.umd.js',
                    '@angular/compiler': '/packages-dist/compiler/bundles/compiler.umd.js',
                    '@angular/platform-browser': '/packages-dist/platform-browser/bundles/platform-browser.umd.js',
                    '@angular/platform-browser-dynamic': '/packages-dist/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
                    '@angular/http': '/packages-dist/http/bundles/http.umd.js',
                    '@angular/upgrade': '/packages-dist/upgrade/bundles/upgrade.umd.js',
                    '@angular/router-deprecated': '/packages-dist/router-deprecated/bundles/router-deprecated.umd.js',
                    '@angular/router': '/packages-dist/router/bundles/router.umd.js',
                    '@angular/core/src/facade': '/all/@angular/core/src/facade',
                    'rxjs': location.pathname.replace(/\w+\.html$/i, '') + 'rxjs'
                },
                packages: {
                    'app': { defaultExtension: 'js' },
                    '@angular/core/src/facade': { defaultExtension: 'js' }
                }
            });
        }
        else {
            console.warn("Not using the Angular bundles. Don't use this configuration for e2e/performance tests!");
            System.config({
                map: { 'index': 'index.js', '@angular': '/all/@angular' },
                packages: {
                    'app': { defaultExtension: 'js' },
                    '@angular/core': { main: 'index.js', defaultExtension: 'js' },
                    '@angular/compiler': { main: 'index.js', defaultExtension: 'js' },
                    '@angular/router': { main: 'index.js', defaultExtension: 'js' },
                    '@angular/common': { main: 'index.js', defaultExtension: 'js' },
                    '@angular/platform-browser': { main: 'index.js', defaultExtension: 'js' },
                    '@angular/platform-browser-dynamic': { main: 'index.js', defaultExtension: 'js' }
                }
            });
        }
        // BOOTSTRAP the app!
        System.import('index').then(function (m /** TODO #9100 */) { m.main(); }, console.error.bind(console));
    }
    function writeScriptTag(scriptUrl /** TODO #9100 */, onload /** TODO #9100 */) {
        document.write("<script src=\"" + scriptUrl + "\" onload=\"" + onload + "\"></script>");
    }
}(window));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbW9kdWxlcy9wbGF5Z3JvdW5kL3NyYy9ib290c3RyYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBS0gsQ0FBQyxVQUFTLE1BQVcsQ0FBQyxpQkFBaUI7SUFFckMsY0FBYyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7SUFDckQsY0FBYyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFDakQsY0FBYyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7SUFDbEUsY0FBYyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7SUFDdkQsY0FBYyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7SUFDcEQsY0FBYyxDQUFDLDJDQUEyQyxFQUFFLHVCQUF1QixDQUFDLENBQUM7SUFDL0UsTUFBTyxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO0lBRXhEO1FBQ0Usb0JBQW9CO1FBQ3BCLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNaLEdBQUcsRUFBRTtvQkFDSCxPQUFPLEVBQUUsVUFBVTtvQkFDbkIsZUFBZSxFQUFFLHlDQUF5QztvQkFDMUQsaUJBQWlCLEVBQUUsNkNBQTZDO29CQUNoRSxtQkFBbUIsRUFBRSxpREFBaUQ7b0JBQ3RFLDJCQUEyQixFQUFFLGlFQUFpRTtvQkFDOUYsbUNBQW1DLEVBQUUsaUZBQWlGO29CQUN0SCxlQUFlLEVBQUUseUNBQXlDO29CQUMxRCxrQkFBa0IsRUFBRSwrQ0FBK0M7b0JBQ25FLDRCQUE0QixFQUFFLG1FQUFtRTtvQkFDakcsaUJBQWlCLEVBQUUsNkNBQTZDO29CQUNoRSwwQkFBMEIsRUFBRSwrQkFBK0I7b0JBQzNELE1BQU0sRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLEdBQUcsTUFBTTtpQkFDOUQ7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLEtBQUssRUFBRSxFQUFDLGdCQUFnQixFQUFFLElBQUksRUFBQztvQkFDL0IsMEJBQTBCLEVBQUUsRUFBQyxnQkFBZ0IsRUFBRSxJQUFJLEVBQUM7aUJBQ3JEO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sT0FBTyxDQUFDLElBQUksQ0FDUix3RkFBd0YsQ0FBQyxDQUFDO1lBRTlGLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ1osR0FBRyxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFDO2dCQUN2RCxRQUFRLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFO29CQUNqQyxlQUFlLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBQztvQkFDM0QsbUJBQW1CLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBQztvQkFDL0QsaUJBQWlCLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBQztvQkFDN0QsaUJBQWlCLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBQztvQkFDN0QsMkJBQTJCLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBQztvQkFDdkUsbUNBQW1DLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBQztpQkFJaEY7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDO1FBR0QscUJBQXFCO1FBQ3JCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVMsQ0FBTSxDQUFDLGlCQUFpQixJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzdHLENBQUM7SUFHRCx3QkFBd0IsU0FBYyxDQUFDLGlCQUFpQixFQUFFLE1BQVksQ0FBQyxpQkFBaUI7UUFDdEYsUUFBUSxDQUFDLEtBQUssQ0FBQyxtQkFBZ0IsU0FBUyxvQkFBYSxNQUFNLGlCQUFhLENBQUMsQ0FBQztJQUM1RSxDQUFDO0FBQ0gsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMifQ==