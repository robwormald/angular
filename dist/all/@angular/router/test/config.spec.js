/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var config_1 = require('../src/config');
describe('config', function () {
    describe('validateConfig', function () {
        it('should not throw when no errors', function () {
            config_1.validateConfig([{ path: 'a', redirectTo: 'b' }, { path: 'b', component: ComponentA }]);
        });
        it('should throw when Array is passed', function () {
            expect(function () {
                config_1.validateConfig([
                    { path: 'a', component: ComponentA },
                    [{ path: 'b', component: ComponentB }, { path: 'c', component: ComponentC }]
                ]);
            }).toThrowError("Invalid route configuration: Array cannot be specified");
        });
        it('should throw when redirectTo and children are used together', function () {
            expect(function () {
                config_1.validateConfig([{ path: 'a', redirectTo: 'b', children: [{ path: 'b', component: ComponentA }] }]);
            })
                .toThrowError("Invalid configuration of route 'a': redirectTo and children cannot be used together");
        });
        it('should throw when redirectTo and loadChildren are used together', function () {
            expect(function () { config_1.validateConfig([{ path: 'a', redirectTo: 'b', loadChildren: 'value' }]); })
                .toThrowError("Invalid configuration of route 'a': redirectTo and loadChildren cannot be used together");
        });
        it('should throw when children and loadChildren are used together', function () {
            expect(function () { config_1.validateConfig([{ path: 'a', children: [], loadChildren: 'value' }]); })
                .toThrowError("Invalid configuration of route 'a': children and loadChildren cannot be used together");
        });
        it('should throw when component and redirectTo are used together', function () {
            expect(function () { config_1.validateConfig([{ path: 'a', component: ComponentA, redirectTo: 'b' }]); })
                .toThrowError("Invalid configuration of route 'a': redirectTo and component cannot be used together");
        });
        it('should throw when path is missing', function () {
            expect(function () {
                config_1.validateConfig([{ component: '', redirectTo: 'b' }]);
            }).toThrowError("Invalid route configuration: routes must have path specified");
        });
        it('should throw when none of component and children or direct are missing', function () {
            expect(function () { config_1.validateConfig([{ path: 'a' }]); })
                .toThrowError("Invalid configuration of route 'a': one of the following must be provided (component or redirectTo or children or loadChildren)");
        });
        it('should throw when path starts with a slash', function () {
            expect(function () {
                config_1.validateConfig([{ path: '/a', redirectTo: 'b' }]);
            }).toThrowError("Invalid route configuration of route '/a': path cannot start with a slash");
        });
        it('should throw when emptyPath is used with redirectTo without explicitly providing matching', function () {
            expect(function () {
                config_1.validateConfig([{ path: '', redirectTo: 'b' }]);
            }).toThrowError(/Invalid route configuration of route '{path: "", redirectTo: "b"}'/);
        });
    });
});
var ComponentA = (function () {
    function ComponentA() {
    }
    return ComponentA;
}());
var ComponentB = (function () {
    function ComponentB() {
    }
    return ComponentB;
}());
var ComponentC = (function () {
    function ComponentC() {
    }
    return ComponentC;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3JvdXRlci90ZXN0L2NvbmZpZy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx1QkFBNkIsZUFBZSxDQUFDLENBQUE7QUFFN0MsUUFBUSxDQUFDLFFBQVEsRUFBRTtJQUNqQixRQUFRLENBQUMsZ0JBQWdCLEVBQUU7UUFDekIsRUFBRSxDQUFDLGlDQUFpQyxFQUFFO1lBQ3BDLHVCQUFjLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JGLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLG1DQUFtQyxFQUFFO1lBQ3RDLE1BQU0sQ0FBQztnQkFDTCx1QkFBYyxDQUFDO29CQUNiLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFDO29CQUNsQyxDQUFDLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUMsQ0FBQztpQkFDekUsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLHdEQUF3RCxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsNkRBQTZELEVBQUU7WUFDaEUsTUFBTSxDQUFDO2dCQUNMLHVCQUFjLENBQ1YsQ0FBQyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEYsQ0FBQyxDQUFDO2lCQUNHLFlBQVksQ0FDVCxxRkFBcUYsQ0FBQyxDQUFDO1FBQ2pHLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLGlFQUFpRSxFQUFFO1lBQ3BFLE1BQU0sQ0FBQyxjQUFRLHVCQUFjLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNuRixZQUFZLENBQ1QseUZBQXlGLENBQUMsQ0FBQztRQUNyRyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywrREFBK0QsRUFBRTtZQUNsRSxNQUFNLENBQUMsY0FBUSx1QkFBYyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDaEYsWUFBWSxDQUNULHVGQUF1RixDQUFDLENBQUM7UUFDbkcsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsOERBQThELEVBQUU7WUFDakUsTUFBTSxDQUFDLGNBQVEsdUJBQWMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ25GLFlBQVksQ0FDVCxzRkFBc0YsQ0FBQyxDQUFDO1FBQ2xHLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLG1DQUFtQyxFQUFFO1lBQ3RDLE1BQU0sQ0FBQztnQkFDTCx1QkFBYyxDQUFDLENBQUMsRUFBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLDhEQUE4RCxDQUFDLENBQUM7UUFDbEYsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsd0VBQXdFLEVBQUU7WUFDM0UsTUFBTSxDQUFDLGNBQVEsdUJBQWMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDM0MsWUFBWSxDQUNULGlJQUFpSSxDQUFDLENBQUM7UUFDN0ksQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsNENBQTRDLEVBQUU7WUFDL0MsTUFBTSxDQUFDO2dCQUNMLHVCQUFjLENBQUMsQ0FBTSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsMkVBQTJFLENBQUMsQ0FBQztRQUMvRixDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywyRkFBMkYsRUFDM0Y7WUFDRSxNQUFNLENBQUM7Z0JBQ0wsdUJBQWMsQ0FBQyxDQUFNLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxvRUFBb0UsQ0FBQyxDQUFDO1FBQ3hGLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVIO0lBQUE7SUFBa0IsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FBQyxBQUFuQixJQUFtQjtBQUNuQjtJQUFBO0lBQWtCLENBQUM7SUFBRCxpQkFBQztBQUFELENBQUMsQUFBbkIsSUFBbUI7QUFDbkI7SUFBQTtJQUFrQixDQUFDO0lBQUQsaUJBQUM7QUFBRCxDQUFDLEFBQW5CLElBQW1CIn0=