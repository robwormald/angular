/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var lang_1 = require('../../src/facade/lang');
function iterableChangesAsString(_a) {
    var _b = _a.collection, collection = _b === void 0 ? [] : _b, _c = _a.previous, previous = _c === void 0 ? [] : _c, _d = _a.additions, additions = _d === void 0 ? [] : _d, _e = _a.moves, moves = _e === void 0 ? [] : _e, _f = _a.removals, removals = _f === void 0 ? [] : _f, _g = _a.identityChanges, identityChanges = _g === void 0 ? [] : _g;
    return 'collection: ' + collection.join(', ') + '\n' +
        'previous: ' + previous.join(', ') + '\n' +
        'additions: ' + additions.join(', ') + '\n' +
        'moves: ' + moves.join(', ') + '\n' +
        'removals: ' + removals.join(', ') + '\n' +
        'identityChanges: ' + identityChanges.join(', ') + '\n';
}
exports.iterableChangesAsString = iterableChangesAsString;
function kvChangesAsString(_a) {
    var map = _a.map, previous = _a.previous, additions = _a.additions, changes = _a.changes, removals = _a.removals;
    if (lang_1.isBlank(map))
        map = [];
    if (lang_1.isBlank(previous))
        previous = [];
    if (lang_1.isBlank(additions))
        additions = [];
    if (lang_1.isBlank(changes))
        changes = [];
    if (lang_1.isBlank(removals))
        removals = [];
    return 'map: ' + map.join(', ') + '\n' +
        'previous: ' + previous.join(', ') + '\n' +
        'additions: ' + additions.join(', ') + '\n' +
        'changes: ' + changes.join(', ') + '\n' +
        'removals: ' + removals.join(', ') + '\n';
}
exports.kvChangesAsString = kvChangesAsString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0L2NoYW5nZV9kZXRlY3Rpb24vdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQXNCLHVCQUF1QixDQUFDLENBQUE7QUFFOUMsaUNBQ0ksRUFHK0M7UUFIOUMsa0JBQXdDLEVBQXhDLG9DQUF3QyxFQUFFLGdCQUFzQyxFQUF0QyxrQ0FBc0MsRUFDaEYsaUJBQXVDLEVBQXZDLG1DQUF1QyxFQUFFLGFBQW1DLEVBQW5DLCtCQUFtQyxFQUM1RSxnQkFBc0MsRUFBdEMsa0NBQXNDLEVBQ3RDLHVCQUE2QyxFQUE3Qyx5Q0FBNkM7SUFDaEQsTUFBTSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUk7UUFDaEQsWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSTtRQUN6QyxhQUFhLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJO1FBQzNDLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUk7UUFDbkMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSTtRQUN6QyxtQkFBbUIsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztBQUM5RCxDQUFDO0FBWGUsK0JBQXVCLDBCQVd0QyxDQUFBO0FBRUQsMkJBQ0ksRUFDeUY7UUFEeEYsWUFBRyxFQUFFLHNCQUFRLEVBQUUsd0JBQVMsRUFBRSxvQkFBTyxFQUFFLHNCQUFRO0lBRzlDLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDM0IsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDbkMsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUVyQyxNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSTtRQUNsQyxZQUFZLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJO1FBQ3pDLGFBQWEsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUk7UUFDM0MsV0FBVyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSTtRQUN2QyxZQUFZLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDaEQsQ0FBQztBQWZlLHlCQUFpQixvQkFlaEMsQ0FBQSJ9