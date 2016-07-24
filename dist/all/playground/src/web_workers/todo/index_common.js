/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var TodoStore_1 = require('./services/TodoStore');
var TodoApp = (function () {
    function TodoApp(todoStore, factory) {
        this.todoStore = todoStore;
        this.factory = factory;
        this.todoEdit = null;
        this.hideActive = false;
        this.hideCompleted = false;
        this.isComplete = false;
    }
    TodoApp.prototype.enterTodo = function () {
        this.addTodo(this.inputValue);
        this.inputValue = "";
    };
    TodoApp.prototype.doneEditing = function ($event /** TODO #9100 */, todo) {
        var which = $event.keyCode;
        if (which === 13) {
            todo.title = todo.editTitle;
            this.todoEdit = null;
        }
        else if (which === 27) {
            this.todoEdit = null;
            todo.editTitle = todo.title;
        }
    };
    TodoApp.prototype.editTodo = function (todo) { this.todoEdit = todo; };
    TodoApp.prototype.addTodo = function (newTitle) { this.todoStore.add(this.factory.create(newTitle, false)); };
    TodoApp.prototype.completeMe = function (todo) { todo.completed = !todo.completed; };
    TodoApp.prototype.toggleCompleted = function () {
        this.hideActive = !this.hideActive;
        this.hideCompleted = false;
    };
    TodoApp.prototype.toggleActive = function () {
        this.hideCompleted = !this.hideCompleted;
        this.hideActive = false;
    };
    TodoApp.prototype.showAll = function () {
        this.hideCompleted = false;
        this.hideActive = false;
    };
    TodoApp.prototype.deleteMe = function (todo) { this.todoStore.remove(todo); };
    TodoApp.prototype.toggleAll = function ($event /** TODO #9100 */) {
        var _this = this;
        this.isComplete = !this.isComplete;
        this.todoStore.list.forEach(function (todo) { todo.completed = _this.isComplete; });
    };
    TodoApp.prototype.clearCompleted = function () { this.todoStore.removeBy(function (todo) { return todo.completed; }); };
    /** @nocollapse */
    TodoApp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'todo-app',
                    viewProviders: [TodoStore_1.Store, TodoStore_1.TodoFactory],
                    templateUrl: 'todo.html',
                    directives: [common_1.NgFor, common_1.FORM_DIRECTIVES]
                },] },
    ];
    /** @nocollapse */
    TodoApp.ctorParameters = [
        { type: TodoStore_1.Store, },
        { type: TodoStore_1.TodoFactory, },
    ];
    return TodoApp;
}());
exports.TodoApp = TodoApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhfY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9wbGF5Z3JvdW5kL3NyYy93ZWJfd29ya2Vycy90b2RvL2luZGV4X2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLHVCQUFxQyxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3ZELDBCQUF1QyxzQkFBc0IsQ0FBQyxDQUFBO0FBQzlEO0lBT0UsaUJBQW1CLFNBQWdCLEVBQVMsT0FBb0I7UUFBN0MsY0FBUyxHQUFULFNBQVMsQ0FBTztRQUFTLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFOaEUsYUFBUSxHQUFTLElBQUksQ0FBQztRQUV0QixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGVBQVUsR0FBWSxLQUFLLENBQUM7SUFFdUMsQ0FBQztJQUVwRSwyQkFBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELDZCQUFXLEdBQVgsVUFBWSxNQUFXLENBQUMsaUJBQWlCLEVBQUUsSUFBVTtRQUNuRCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdB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