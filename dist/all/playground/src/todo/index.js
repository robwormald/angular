/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var TodoStore_1 = require('./app/TodoStore');
var TodoApp = (function () {
    function TodoApp(todoStore, factory) {
        this.todoStore = todoStore;
        this.factory = factory;
        this.todoEdit = null;
    }
    TodoApp.prototype.enterTodo = function (inputElement /** TODO #9100 */) {
        this.addTodo(inputElement.value);
        inputElement.value = '';
    };
    TodoApp.prototype.editTodo = function (todo) { this.todoEdit = todo; };
    TodoApp.prototype.doneEditing = function ($event /** TODO #9100 */, todo) {
        var which = $event.which;
        var target = $event.target;
        if (which === 13) {
            todo.title = target.value;
            this.todoEdit = null;
        }
        else if (which === 27) {
            this.todoEdit = null;
            target.value = todo.title;
        }
    };
    TodoApp.prototype.addTodo = function (newTitle) { this.todoStore.add(this.factory.create(newTitle, false)); };
    TodoApp.prototype.completeMe = function (todo) { todo.completed = !todo.completed; };
    TodoApp.prototype.deleteMe = function (todo) { this.todoStore.remove(todo); };
    TodoApp.prototype.toggleAll = function ($event /** TODO #9100 */) {
        var isComplete = $event.target.checked;
        this.todoStore.list.forEach(function (todo) { todo.completed = isComplete; });
    };
    TodoApp.prototype.clearCompleted = function () { this.todoStore.removeBy(function (todo) { return todo.completed; }); };
    /** @nocollapse */
    TodoApp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'todo-app',
                    viewProviders: [TodoStore_1.Store, TodoStore_1.TodoFactory],
                    templateUrl: 'todo.html',
                    directives: [common_1.NgFor]
                },] },
    ];
    /** @nocollapse */
    TodoApp.ctorParameters = [
        { type: TodoStore_1.Store, },
        { type: TodoStore_1.TodoFactory, },
    ];
    return TodoApp;
}());
function main() {
    platform_browser_dynamic_1.bootstrap(TodoApp);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL3RvZG8vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHlDQUF3QixtQ0FBbUMsQ0FBQyxDQUFBO0FBQzVELHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4Qyx1QkFBb0IsaUJBQWlCLENBQUMsQ0FBQTtBQUN0QywwQkFBdUMsaUJBQWlCLENBQUMsQ0FBQTtBQUN6RDtJQUdFLGlCQUFtQixTQUFzQixFQUFTLE9BQW9CO1FBQW5ELGNBQVMsR0FBVCxTQUFTLENBQWE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFhO1FBRnRFLGFBQVEsR0FBUyxJQUFJLENBQUM7SUFFbUQsQ0FBQztJQUUxRSwyQkFBUyxHQUFULFVBQVUsWUFBaUIsQ0FBQyxpQkFBaUI7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsWUFBWSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELDBCQUFRLEdBQVIsVUFBUyxJQUFVLElBQVUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXBELDZCQUFXLEdBQVgsVUFBWSxNQUFXLENBQUMsaUJBQWlCLEVBQUUsSUFBVTtRQUNuRCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzVCLENBQUM7SUFDSCxDQUFDO0lBRUQseUJBQU8sR0FBUCxVQUFRLFFBQWdCLElBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTdGLDRCQUFVLEdBQVYsVUFBVyxJQUFVLElBQVUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRWxFLDBCQUFRLEdBQVIsVUFBUyxJQUFVLElBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTNELDJCQUFTLEdBQVQsVUFBVSxNQUFXLENBQUMsaUJBQWlCO1FBQ3JDLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQVUsSUFBTyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRCxnQ0FBYyxHQUFkLGNBQXlCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQUMsSUFBVSxJQUFLLE9BQUEsSUFBSSxDQUFDLFNBQVMsRUFBZCxDQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckYsa0JBQWtCO0lBQ1gsa0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLGFBQWEsRUFBRSxDQUFDLGlCQUFLLEVBQUUsdUJBQVcsQ0FBQztvQkFDbkMsV0FBVyxFQUFFLFdBQVc7b0JBQ3hCLFVBQVUsRUFBRSxDQUFDLGNBQUssQ0FBQztpQkFDcEIsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHNCQUFjLEdBQTJEO1FBQ2hGLEVBQUMsSUFBSSxFQUFFLGlCQUFLLEdBQUc7UUFDZixFQUFDLElBQUksRUFBRSx1QkFBVyxHQUFHO0tBQ3BCLENBQUM7SUFDRixjQUFDO0FBQUQsQ0FBQyxBQWxERCxJQWtEQztBQUVEO0lBQ0Usb0NBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyQixDQUFDO0FBRmUsWUFBSSxPQUVuQixDQUFBIn0=