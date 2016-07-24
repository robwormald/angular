/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
// #docregion forward_ref_fn
var ref = core_1.forwardRef(function () { return Lock; });
// #enddocregion
// #docregion forward_ref
var Door = (function () {
    function Door(lock) {
        this.lock = lock;
    }
    /** @nocollapse */
    Door.ctorParameters = [
        { type: Lock, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return Lock; }),] },] },
    ];
    return Door;
}());
// Only at this point Lock is defined.
var Lock = (function () {
    function Lock() {
    }
    return Lock;
}());
var injector = core_1.ReflectiveInjector.resolveAndCreate([Door, Lock]);
var door = injector.get(Door);
expect(door instanceof Door).toBe(true);
expect(door.lock instanceof Lock).toBe(true);
// #enddocregion
// #docregion resolve_forward_ref
ref = core_1.forwardRef(function () { return 'refValue'; });
expect(core_1.resolveForwardRef(ref)).toEqual('refValue');
expect(core_1.resolveForwardRef('regularValue')).toEqual('regularValue');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yd2FyZF9yZWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2V4YW1wbGVzL2NvcmUvZGkvdHMvZm9yd2FyZF9yZWYvZm9yd2FyZF9yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUFzRixlQUFlLENBQUMsQ0FBQTtBQUd0Ryw0QkFBNEI7QUFDNUIsSUFBSSxHQUFHLEdBQUcsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQyxDQUFDO0FBQ2pDLGdCQUFnQjtBQUVoQix5QkFBeUI7QUFDekI7SUFFRSxjQUFhLElBQVU7UUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUFDLENBQUM7SUFDaEQsa0JBQWtCO0lBQ1gsbUJBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxpQkFBVSxDQUFDLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDLEVBQUcsRUFBRSxFQUFHLEVBQUM7S0FDL0UsQ0FBQztJQUNGLFdBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQUVELHNDQUFzQztBQUN0QztJQUFBO0lBQVksQ0FBQztJQUFELFdBQUM7QUFBRCxDQUFDLEFBQWIsSUFBYTtBQUViLElBQUksUUFBUSxHQUFHLHlCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDakUsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5QixNQUFNLENBQUMsSUFBSSxZQUFZLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksWUFBWSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0MsZ0JBQWdCO0FBRWhCLGlDQUFpQztBQUNqQyxHQUFHLEdBQUcsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsVUFBVSxFQUFWLENBQVUsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sQ0FBQyx3QkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuRCxNQUFNLENBQUMsd0JBQWlCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMifQ==