/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var async_1 = require('../../src/facade/async');
function main() {
    testing_internal_1.describe('Observable', function () {
        testing_internal_1.describe('#core', function () {
            testing_internal_1.it('should call next with values', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var o = new async_1.Observable(function (sink /** TODO #9100 */) { sink.next(1); });
                o.subscribe(function (v) {
                    testing_internal_1.expect(v).toEqual(1);
                    async.done();
                });
            }));
            testing_internal_1.it('should call next and then complete', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var o = new async_1.Observable(function (sink /** TODO #9100 */) {
                    sink.next(1);
                    sink.complete();
                });
                var nexted = false;
                o.subscribe(function (v) { nexted = true; }, null, function () {
                    testing_internal_1.expect(nexted).toBe(true);
                    async.done();
                });
            }));
            testing_internal_1.it('should call error with errors', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var o = new async_1.Observable(function (sink /** TODO #9100 */) { sink.error('oh noes!'); });
                o.subscribe(function (v) {
                }, function (err) {
                    testing_internal_1.expect(err).toEqual('oh noes!');
                    async.done();
                });
            }));
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YWJsZV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvZmFjYWRlL29ic2VydmFibGVfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQWdHLHdDQUF3QyxDQUFDLENBQUE7QUFFekksc0JBQXlCLHdCQUF3QixDQUFDLENBQUE7QUFFbEQ7SUFDRSwyQkFBUSxDQUFDLFlBQVksRUFBRTtRQUNyQiwyQkFBUSxDQUFDLE9BQU8sRUFBRTtZQUVoQixxQkFBRSxDQUFDLDhCQUE4QixFQUM5Qix5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO2dCQUVyRCxJQUFJLENBQUMsR0FBRyxJQUFJLGtCQUFVLENBQUMsVUFBQyxJQUFTLENBQUMsaUJBQWlCLElBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUzRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQztvQkFDWCx5QkFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckIsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNmLENBQUMsQ0FBQyxDQUFDO1lBRUwsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVQLHFCQUFFLENBQUMsb0NBQW9DLEVBQ3BDLHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7Z0JBRXJELElBQUksQ0FBQyxHQUFHLElBQUksa0JBQVUsQ0FBQyxVQUFDLElBQVMsQ0FBQyxpQkFBaUI7b0JBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNsQixDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBRW5CLENBQUMsQ0FBQyxTQUFTLENBQ1AsVUFBQSxDQUFDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQzdCO29CQUNFLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMxQixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDLENBQUM7WUFFVCxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQywrQkFBK0IsRUFDL0IseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtnQkFFckQsSUFBSSxDQUFDLEdBQUcsSUFBSSxrQkFBVSxDQUFDLFVBQUMsSUFBUyxDQUFDLGlCQUFpQixJQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFckYsQ0FBQyxDQUFDLFNBQVMsQ0FDUCxVQUFBLENBQUM7Z0JBRUQsQ0FBQyxFQUNELFVBQUMsR0FBRztvQkFDRix5QkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDaEMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNmLENBQUMsQ0FBQyxDQUFDO1lBRVQsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBbkRlLFlBQUksT0FtRG5CLENBQUEifQ==