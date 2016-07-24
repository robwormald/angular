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
var obs = new Rx_1.Observable(function (obs) {
    var i = 0;
    setInterval(function () { obs.next(++i); }, 1000);
});
obs.subscribe(function (i) { return console.log(i + " seconds elapsed"); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvZXhhbXBsZXMvZmFjYWRlL3RzL2FzeW5jL29ic2VydmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHdCQUF3QjtBQUN4QixtQkFBcUMsU0FBUyxDQUFDLENBQUE7QUFDL0MsSUFBSSxHQUFHLEdBQUcsSUFBSSxlQUFVLENBQVMsVUFBQyxHQUF1QjtJQUN2RCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDVixXQUFXLENBQUMsY0FBUSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFDLENBQUM7QUFDSCxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBSSxDQUFDLHFCQUFrQixDQUFDLEVBQW5DLENBQW1DLENBQUMsQ0FBQyJ9