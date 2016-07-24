/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var platform_browser_1 = require('@angular/platform-browser');
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var ECHO_CHANNEL = "ECHO";
function main() {
    platform_browser_dynamic_1.bootstrapWorkerUi("loader.js").then(afterBootstrap);
}
exports.main = main;
function afterBootstrap(ref) {
    var brokerFactory = ref.injector.get(platform_browser_1.ClientMessageBrokerFactory);
    var broker = brokerFactory.createMessageBroker(ECHO_CHANNEL, false);
    document.getElementById("send_echo")
        .addEventListener("click", function (e) {
        var val = document.getElementById("echo_input").value;
        // TODO(jteplitz602): Replace default constructors with real constructors
        // once they're in the .d.ts file (#3926)
        var args = new platform_browser_1.UiArguments("echo");
        args.method = "echo";
        var fnArg = new platform_browser_1.FnArg(val, platform_browser_1.PRIMITIVE);
        fnArg.value = val;
        fnArg.type = platform_browser_1.PRIMITIVE;
        args.args = [fnArg];
        broker.runOnService(args, platform_browser_1.PRIMITIVE)
            .then(function (echo_result) {
            document.getElementById("echo_result").innerHTML =
                "<span class='response'>" + echo_result + "</span>";
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL3dlYl93b3JrZXJzL21lc3NhZ2VfYnJva2VyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFHSCxpQ0FBd0UsMkJBQTJCLENBQUMsQ0FBQTtBQUNwRyx5Q0FBZ0MsbUNBQW1DLENBQUMsQ0FBQTtBQUVwRSxJQUFNLFlBQVksR0FBRyxNQUFNLENBQUM7QUFFNUI7SUFDRSw0Q0FBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDdEQsQ0FBQztBQUZlLFlBQUksT0FFbkIsQ0FBQTtBQUVELHdCQUF3QixHQUFnQjtJQUN0QyxJQUFJLGFBQWEsR0FBK0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsNkNBQTBCLENBQUMsQ0FBQztJQUM3RixJQUFJLE1BQU0sR0FBRyxhQUFhLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRXBFLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDO1NBQy9CLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLENBQUM7UUFDM0IsSUFBSSxHQUFHLEdBQXNCLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFFLENBQUMsS0FBSyxDQUFDO1FBQzFFLHlFQUF5RTtRQUN6RSx5Q0FBeUM7UUFDekMsSUFBSSxJQUFJLEdBQUcsSUFBSSw4QkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksS0FBSyxHQUFHLElBQUksd0JBQUssQ0FBQyxHQUFHLEVBQUUsNEJBQVMsQ0FBQyxDQUFDO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLEtBQUssQ0FBQyxJQUFJLEdBQUcsNEJBQVMsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFcEIsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsNEJBQVMsQ0FBQzthQUMvQixJQUFJLENBQUMsVUFBQyxXQUFtQjtZQUN4QixRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVM7Z0JBQzVDLDRCQUEwQixXQUFXLFlBQVMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFDO0FBQ1QsQ0FBQyJ9