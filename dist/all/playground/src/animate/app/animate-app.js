/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var AnimateApp = (function () {
    function AnimateApp() {
        this.items = [];
        this.bgStatus = 'focus';
    }
    Object.defineProperty(AnimateApp.prototype, "state", {
        get: function () { return this._state; },
        set: function (s) {
            this._state = s;
            if (s == 'void') {
                this.items = [];
            }
            else {
                this.items = [
                    1, 2, 3, 4, 5,
                    6, 7, 8, 9, 10,
                    11, 12, 13, 14, 15,
                    16, 17, 18, 19, 20
                ];
            }
        },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    AnimateApp.decorators = [
        { type: core_1.Component, args: [{
                    host: {
                        '[@backgroundAnimation]': "bgStatus"
                    },
                    selector: 'animate-app',
                    styleUrls: ['css/animate-app.css'],
                    template: "\n    <button (click)=\"state='start'\">Start State</button>\n    <button (click)=\"state='active'\">Active State</button>\n    |\n    <button (click)=\"state='void'\">Void State</button>\n    <button (click)=\"state='default'\">Unhandled (default) State</button>\n    <button style=\"float:right\" (click)=\"bgStatus='blur'\">Blur Page (Host)</button>\n    <hr />\n    <div *ngFor=\"let item of items\" class=\"box\" [@boxAnimation]=\"state\">\n      {{ item }}\n      <div *ngIf=\"true\">\n        something inside \n      </div>\n    </div>\n  ",
                    animations: [
                        core_1.trigger("backgroundAnimation", [
                            core_1.state("focus", core_1.style({ "background-color": "white" })),
                            core_1.state("blur", core_1.style({ "background-color": "grey" })),
                            core_1.transition("* => *", [
                                core_1.animate(500)
                            ])
                        ]),
                        core_1.trigger("boxAnimation", [
                            core_1.state("*", core_1.style({ "height": "*", "background-color": "#dddddd", "color": "black" })),
                            core_1.state("void, hidden", core_1.style({ "height": 0, "opacity": 0 })),
                            core_1.state("start", core_1.style({ "background-color": "red", "height": "*" })),
                            core_1.state("active", core_1.style({ "background-color": "orange", "color": "white", "font-size": "100px" })),
                            core_1.transition("active <=> start", [
                                core_1.animate(500, core_1.style({ "transform": "scale(2)" })),
                                core_1.animate(500)
                            ]),
                            core_1.transition("* => *", [
                                core_1.animate(1000, core_1.style({ "opacity": 1, "height": 300 })),
                                core_1.animate(1000, core_1.style({ "background-color": "blue" })),
                                core_1.animate(1000, core_1.keyframes([
                                    core_1.style({ "background-color": "blue", "color": "black", "offset": 0.2 }),
                                    core_1.style({ "background-color": "brown", "color": "black", "offset": 0.5 }),
                                    core_1.style({ "background-color": "black", "color": "white", "offset": 1 })
                                ])),
                                core_1.animate(2000)
                            ])
                        ])
                    ]
                },] },
    ];
    return AnimateApp;
}());
exports.AnimateApp = AnimateApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0ZS1hcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL2FuaW1hdGUvYXBwL2FuaW1hdGUtYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFVTyxlQUFlLENBQUMsQ0FBQTtBQUN2QjtJQUFBO1FBQ1MsVUFBSyxHQUE0QixFQUFFLENBQUM7UUFHcEMsYUFBUSxHQUFHLE9BQU8sQ0FBQztJQXdFNUIsQ0FBQztJQXRFQyxzQkFBSSw2QkFBSzthQUFULGNBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQ25DLFVBQVUsQ0FBQztZQUNULElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNsQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLEtBQUssR0FBRztvQkFDWCxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQztvQkFDVCxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRTtvQkFDVixFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRTtvQkFDZCxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRTtpQkFDZixDQUFDO1lBQ0osQ0FBQztRQUNILENBQUM7OztPQWJrQztJQWNyQyxrQkFBa0I7SUFDWCxxQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixJQUFJLEVBQUU7d0JBQ0osd0JBQXdCLEVBQUUsVUFBVTtxQkFDckM7b0JBQ0QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO29CQUNsQyxRQUFRLEVBQUUscWlCQWNUO29CQUNELFVBQVUsRUFBRTt3QkFDVixjQUFPLENBQUMscUJBQXFCLEVBQUU7NEJBQzdCLFlBQUssQ0FBQyxPQUFPLEVBQUUsWUFBSyxDQUFDLEVBQUUsa0JBQWtCLEVBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzs0QkFDckQsWUFBSyxDQUFDLE1BQU0sRUFBRSxZQUFLLENBQUMsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDOzRCQUNuRCxpQkFBVSxDQUFDLFFBQVEsRUFBRTtnQ0FDbkIsY0FBTyxDQUFDLEdBQUcsQ0FBQzs2QkFDYixDQUFDO3lCQUNILENBQUM7d0JBQ0YsY0FBTyxDQUFDLGNBQWMsRUFBRTs0QkFDdEIsWUFBSyxDQUFDLEdBQUcsRUFBRSxZQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzs0QkFDcEYsWUFBSyxDQUFDLGNBQWMsRUFBRSxZQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzRCQUMzRCxZQUFLLENBQUMsT0FBTyxFQUFFLFlBQUssQ0FBQyxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQzs0QkFDbkUsWUFBSyxDQUFDLFFBQVEsRUFBRSxZQUFLLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzs0QkFFL0YsaUJBQVUsQ0FBQyxrQkFBa0IsRUFBRTtnQ0FDN0IsY0FBTyxDQUFDLEdBQUcsRUFBRSxZQUFLLENBQUMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQ0FDaEQsY0FBTyxDQUFDLEdBQUcsQ0FBQzs2QkFDYixDQUFDOzRCQUVGLGlCQUFVLENBQUMsUUFBUSxFQUFFO2dDQUNuQixjQUFPLENBQUMsSUFBSSxFQUFFLFlBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0NBQ3JELGNBQU8sQ0FBQyxJQUFJLEVBQUUsWUFBSyxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztnQ0FDcEQsY0FBTyxDQUFDLElBQUksRUFBRSxnQkFBUyxDQUFDO29DQUN0QixZQUFLLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUM7b0NBQ3RFLFlBQUssQ0FBQyxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQztvQ0FDdkUsWUFBSyxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDO2lDQUN0RSxDQUFDLENBQUM7Z0NBQ0gsY0FBTyxDQUFDLElBQUksQ0FBQzs2QkFDZCxDQUFDO3lCQUNILENBQUM7cUJBQ0g7aUJBQ0YsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGlCQUFDO0FBQUQsQ0FBQyxBQTVFRCxJQTRFQztBQTVFWSxrQkFBVSxhQTRFdEIsQ0FBQSJ9