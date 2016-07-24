/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var collection_1 = require('@angular/core/src/facade/collection');
// base model for RecordStore
var KeyModel = (function () {
    function KeyModel(key) {
        this.key = key;
    }
    return KeyModel;
}());
exports.KeyModel = KeyModel;
var Todo = (function (_super) {
    __extends(Todo, _super);
    function Todo(key, title, completed) {
        _super.call(this, key);
        this.title = title;
        this.completed = completed;
    }
    return Todo;
}(KeyModel));
exports.Todo = Todo;
var TodoFactory = (function () {
    function TodoFactory() {
        this._uid = 0;
    }
    TodoFactory.prototype.nextUid = function () { return ++this._uid; };
    TodoFactory.prototype.create = function (title, isCompleted) {
        return new Todo(this.nextUid(), title, isCompleted);
    };
    /** @nocollapse */
    TodoFactory.decorators = [
        { type: core_1.Injectable },
    ];
    return TodoFactory;
}());
exports.TodoFactory = TodoFactory;
var Store = (function () {
    function Store() {
        this.list = [];
    }
    Store.prototype.add = function (record) { this.list.push(record); };
    Store.prototype.remove = function (record) { this._spliceOut(record); };
    Store.prototype.removeBy = function (callback) {
        var records = this.list.filter(callback);
        collection_1.ListWrapper.removeAll(this.list, records);
    };
    Store.prototype._spliceOut = function (record) {
        var i = this._indexFor(record);
        if (i > -1) {
            return collection_1.ListWrapper.splice(this.list, i, 1)[0];
        }
        return null;
    };
    Store.prototype._indexFor = function (record) { return this.list.indexOf(record); };
    /** @nocollapse */
    Store.decorators = [
        { type: core_1.Injectable },
    ];
    return Store;
}());
exports.Store = Store;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9kb1N0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9wbGF5Z3JvdW5kL3NyYy90b2RvL2FwcC9Ub2RvU3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgscUJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBQ3pDLDJCQUFxQyxxQ0FBcUMsQ0FBQyxDQUFBO0FBRTNFLDZCQUE2QjtBQUM3QjtJQUNFLGtCQUFtQixHQUFXO1FBQVgsUUFBRyxHQUFILEdBQUcsQ0FBUTtJQUFHLENBQUM7SUFDcEMsZUFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRnFCLGdCQUFRLFdBRTdCLENBQUE7QUFFRDtJQUEwQix3QkFBUTtJQUNoQyxjQUFZLEdBQVcsRUFBUyxLQUFhLEVBQVMsU0FBa0I7UUFBSSxrQkFBTSxHQUFHLENBQUMsQ0FBQztRQUF2RCxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUztJQUFnQixDQUFDO0lBQzNGLFdBQUM7QUFBRCxDQUFDLEFBRkQsQ0FBMEIsUUFBUSxHQUVqQztBQUZZLFlBQUksT0FFaEIsQ0FBQTtBQUNEO0lBQUE7UUFDRSxTQUFJLEdBQVcsQ0FBQyxDQUFDO0lBV25CLENBQUM7SUFUQyw2QkFBTyxHQUFQLGNBQW9CLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXpDLDRCQUFNLEdBQU4sVUFBTyxLQUFhLEVBQUUsV0FBb0I7UUFDeEMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNILGtCQUFrQjtJQUNYLHNCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGlCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7QUFaWSxtQkFBVyxjQVl2QixDQUFBO0FBQ0Q7SUFBQTtRQUNFLFNBQUksR0FBUSxFQUFFLENBQUM7SUF3QmpCLENBQUM7SUF0QkMsbUJBQUcsR0FBSCxVQUFJLE1BQVMsSUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFaEQsc0JBQU0sR0FBTixVQUFPLE1BQVMsSUFBVSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVwRCx3QkFBUSxHQUFSLFVBQVMsUUFBc0I7UUFDN0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsd0JBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU8sMEJBQVUsR0FBbEIsVUFBbUIsTUFBUztRQUMxQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWCxNQUFNLENBQUMsd0JBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU8seUJBQVMsR0FBakIsVUFBa0IsTUFBUyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEUsa0JBQWtCO0lBQ1gsZ0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsaUJBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0YsWUFBQztBQUFELENBQUMsQUF6QkQsSUF5QkM7QUF6QlksYUFBSyxRQXlCakIsQ0FBQSJ9