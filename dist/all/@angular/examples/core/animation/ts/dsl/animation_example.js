/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
// #docregion Component
var core_1 = require('@angular/core');
var MyExpandoCmp = (function () {
    function MyExpandoCmp() {
        this.collapse();
    }
    MyExpandoCmp.prototype.expand = function () { this.stateExpression = 'expanded'; };
    MyExpandoCmp.prototype.collapse = function () { this.stateExpression = 'collapsed'; };
    /** @nocollapse */
    MyExpandoCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'my-expando',
                    styles: ["\n    .toggle-container {\n      background-color:white;\n      border:10px solid black;\n      width:200px;\n      text-align:center;\n      line-height:100px;\n      font-size:50px;\n      box-sizing:border-box;\n      overflow:hidden;\n    }\n  "],
                    animations: [core_1.trigger('openClose', [
                            core_1.state('collapsed, void', core_1.style({ height: '0px', color: 'maroon', borderColor: 'maroon' })),
                            core_1.state('expanded', core_1.style({ height: '*', borderColor: 'green', color: 'green' })),
                            core_1.transition('collapsed <=> expanded', [core_1.animate(500, core_1.style({ height: '250px' })), core_1.animate(500)])
                        ])],
                    template: "\n    <button (click)=\"expand()\">Open</button>\n    <button (click)=\"collapse()\">Closed</button>\n    <hr />\n    <div class=\"toggle-container\" [@openClose]=\"stateExpression\">\n      Look at this box\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    MyExpandoCmp.ctorParameters = [];
    return MyExpandoCmp;
}());
exports.MyExpandoCmp = MyExpandoCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2V4YW1wbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2V4YW1wbGVzL2NvcmUvYW5pbWF0aW9uL3RzL2RzbC9hbmltYXRpb25fZXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsdUJBQXVCO0FBQ3ZCLHFCQUFvRSxlQUFlLENBQUMsQ0FBQTtBQUNwRjtJQUVFO1FBQWdCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUFDLENBQUM7SUFDbEMsNkJBQU0sR0FBTixjQUFXLElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUMvQywrQkFBUSxHQUFSLGNBQWEsSUFBSSxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3BELGtCQUFrQjtJQUNYLHVCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxZQUFZO29CQUN0QixNQUFNLEVBQUUsQ0FBQywwUEFXUixDQUFDO29CQUNGLFVBQVUsRUFBRSxDQUFDLGNBQU8sQ0FDaEIsV0FBVyxFQUNYOzRCQUNFLFlBQUssQ0FBQyxpQkFBaUIsRUFBRSxZQUFLLENBQUMsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7NEJBQ3hGLFlBQUssQ0FBQyxVQUFVLEVBQUUsWUFBSyxDQUFDLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDOzRCQUM3RSxpQkFBVSxDQUNOLHdCQUF3QixFQUFFLENBQUMsY0FBTyxDQUFDLEdBQUcsRUFBRSxZQUFLLENBQUMsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQyxFQUFFLGNBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3lCQUN0RixDQUFDLENBQUM7b0JBQ1AsUUFBUSxFQUFFLGlPQU9UO2lCQUNGLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCwyQkFBYyxHQUEyRCxFQUMvRSxDQUFDO0lBQ0YsbUJBQUM7QUFBRCxDQUFDLEFBMUNELElBMENDO0FBMUNZLG9CQUFZLGVBMEN4QixDQUFBIn0=