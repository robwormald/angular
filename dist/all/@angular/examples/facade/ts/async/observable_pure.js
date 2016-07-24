/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
// #docregion Observable
var Rx_1 = require('rxjs/Rx');
var map_1 = require('rxjs/operator/map');
var obs = new Rx_1.Observable(function (sub) {
    var i = 0;
    setInterval(function () { return sub.next(++i); }, 1000);
});
map_1.map.call(obs, function (i) { return (i + " seconds elapsed"); }).subscribe(function (msg) { return console.log(msg); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZV9wdXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9leGFtcGxlcy9mYWNhZGUvdHMvYXN5bmMvb2JzZXJ2YWJsZV9wdXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx3QkFBd0I7QUFDeEIsbUJBQXFDLFNBQVMsQ0FBQyxDQUFBO0FBQy9DLG9CQUFrQixtQkFBbUIsQ0FBQyxDQUFBO0FBRXRDLElBQUksR0FBRyxHQUFHLElBQUksZUFBVSxDQUFTLFVBQUMsR0FBdUI7SUFDdkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsV0FBVyxDQUFDLGNBQU0sT0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQWIsQ0FBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3pDLENBQUMsQ0FBQyxDQUFDO0FBQ0gsU0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBQyxDQUFTLElBQUssT0FBQSxDQUFHLENBQUMsc0JBQWtCLEVBQXRCLENBQXNCLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFXLElBQUssT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUMifQ==