/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
// #docregion Observable
require('rxjs/add/operator/map');
var Rx_1 = require('rxjs/Rx');
var obs = new Rx_1.Observable(function (obs) {
    var i = 0;
    setInterval(function () { return obs.next(++i); }, 1000);
});
obs.map(function (i) { return (i + " seconds elapsed"); }).subscribe(function (msg) { return console.log(msg); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZV9wYXRjaGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9leGFtcGxlcy9mYWNhZGUvdHMvYXN5bmMvb2JzZXJ2YWJsZV9wYXRjaGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx3QkFBd0I7QUFDeEIsUUFBTyx1QkFBdUIsQ0FBQyxDQUFBO0FBRS9CLG1CQUFxQyxTQUFTLENBQUMsQ0FBQTtBQUUvQyxJQUFJLEdBQUcsR0FBRyxJQUFJLGVBQVUsQ0FBUyxVQUFDLEdBQW9CO0lBQ3BELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNWLFdBQVcsQ0FBQyxjQUFNLE9BQUEsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFiLENBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN6QyxDQUFDLENBQUMsQ0FBQztBQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFTLElBQUssT0FBQSxDQUFHLENBQUMsc0JBQWtCLEVBQXRCLENBQXNCLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUMifQ==