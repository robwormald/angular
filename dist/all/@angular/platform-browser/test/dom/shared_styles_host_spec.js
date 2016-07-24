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
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var shared_styles_host_1 = require('@angular/platform-browser/src/dom/shared_styles_host');
function main() {
    testing_internal_1.describe('DomSharedStylesHost', function () {
        var doc;
        var ssh;
        var someHost;
        testing_internal_1.beforeEach(function () {
            doc = dom_adapter_1.getDOM().createHtmlDocument();
            doc.title = '';
            ssh = new shared_styles_host_1.DomSharedStylesHost(doc);
            someHost = dom_adapter_1.getDOM().createElement('div');
        });
        testing_internal_1.it('should add existing styles to new hosts', function () {
            ssh.addStyles(['a {};']);
            ssh.addHost(someHost);
            matchers_1.expect(dom_adapter_1.getDOM().getInnerHTML(someHost)).toEqual('<style>a {};</style>');
        });
        testing_internal_1.it('should add new styles to hosts', function () {
            ssh.addHost(someHost);
            ssh.addStyles(['a {};']);
            matchers_1.expect(dom_adapter_1.getDOM().getInnerHTML(someHost)).toEqual('<style>a {};</style>');
        });
        testing_internal_1.it('should add styles only once to hosts', function () {
            ssh.addStyles(['a {};']);
            ssh.addHost(someHost);
            ssh.addStyles(['a {};']);
            matchers_1.expect(dom_adapter_1.getDOM().getInnerHTML(someHost)).toEqual('<style>a {};</style>');
        });
        testing_internal_1.it('should use the document head as default host', function () {
            ssh.addStyles(['a {};', 'b {};']);
            matchers_1.expect(doc.head).toHaveText('a {};b {};');
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3N0eWxlc19ob3N0X3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvdGVzdC9kb20vc2hhcmVkX3N0eWxlc19ob3N0X3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUFxRyx3Q0FBd0MsQ0FBQyxDQUFBO0FBQzlJLHlCQUFxQiw0Q0FBNEMsQ0FBQyxDQUFBO0FBQ2xFLDRCQUFxQiwrQ0FBK0MsQ0FBQyxDQUFBO0FBQ3JFLG1DQUFrQyxzREFBc0QsQ0FBQyxDQUFBO0FBRXpGO0lBQ0UsMkJBQVEsQ0FBQyxxQkFBcUIsRUFBRTtRQUM5QixJQUFJLEdBQVEsQ0FBbUI7UUFDL0IsSUFBSSxHQUF3QixDQUFDO1FBQzdCLElBQUksUUFBaUIsQ0FBQztRQUN0Qiw2QkFBVSxDQUFDO1lBQ1QsR0FBRyxHQUFHLG9CQUFNLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQ3BDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2YsR0FBRyxHQUFHLElBQUksd0NBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkMsUUFBUSxHQUFHLG9CQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLHlDQUF5QyxFQUFFO1lBQzVDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEIsaUJBQU0sQ0FBQyxvQkFBTSxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDMUUsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLGdDQUFnQyxFQUFFO1lBQ25DLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDekIsaUJBQU0sQ0FBQyxvQkFBTSxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDMUUsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLHNDQUFzQyxFQUFFO1lBQ3pDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDekIsaUJBQU0sQ0FBQyxvQkFBTSxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDMUUsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLDhDQUE4QyxFQUFFO1lBQ2pELEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNsQyxpQkFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFwQ2UsWUFBSSxPQW9DbkIsQ0FBQSJ9