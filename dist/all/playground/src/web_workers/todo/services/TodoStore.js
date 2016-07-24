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
        this.editTitle = title;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9kb1N0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9wbGF5Z3JvdW5kL3NyYy93ZWJfd29ya2Vycy90b2RvL3NlcnZpY2VzL1RvZG9TdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsMkJBQXFDLHFDQUFxQyxDQUFDLENBQUE7QUFFM0UsNkJBQTZCO0FBQzdCO0lBQ0Usa0JBQW1CLEdBQVc7UUFBWCxRQUFHLEdBQUgsR0FBRyxDQUFRO0lBQUcsQ0FBQztJQUNwQyxlQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSxnQkFBUSxXQUVwQixDQUFBO0FBRUQ7SUFBMEIsd0JBQVE7SUFFaEMsY0FBWSxHQUFXLEVBQVMsS0FBYSxFQUFTLFNBQWtCO1FBQ3RFLGtCQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRG1CLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFTO1FBRXRFLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FBQyxBQU5ELENBQTBCLFFBQVEsR0FNakM7QUFOWSxZQUFJLE9BTWhCLENBQUE7QUFDRDtJQUFBO1FBQ0UsU0FBSSxHQUFXLENBQUMsQ0FBQztJQVduQixDQUFDO0lBVEMsNkJBQU8sR0FBUCxjQUFvQixNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUV6Qyw0QkFBTSxHQUFOLFVBQU8sS0FBYSxFQUFFLFdBQW9CO1FBQ3hDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFDSCxrQkFBa0I7SUFDWCxzQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxpQkFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBQztBQUFELENBQUMsQUFaRCxJQVlDO0FBWlksbUJBQVcsY0FZdkIsQ0FBQTtBQUNEO0lBQUE7UUFDRSxTQUFJLEdBQWUsRUFBRSxDQUFDO0lBd0J4QixDQUFDO0lBdEJDLG1CQUFHLEdBQUgsVUFBSSxNQUFnQixJQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV2RCxzQkFBTSxHQUFOLFVBQU8sTUFBZ0IsSUFBVSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUzRCx3QkFBUSxHQUFSLFVBQVMsUUFBNkI7UUFDcEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsd0JBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU8sMEJBQVUsR0FBbEIsVUFBbUIsTUFBZ0I7UUFDakMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxDQUFDLHdCQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVPLHlCQUFTLEdBQWpCLFVBQWtCLE1BQWdCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRSxrQkFBa0I7SUFDWCxnQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxpQkFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixZQUFDO0FBQUQsQ0FBQyxBQXpCRCxJQXlCQztBQXpCWSxhQUFLLFFBeUJqQixDQUFBIn0=