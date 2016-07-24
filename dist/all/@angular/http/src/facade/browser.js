/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
/**
 * JS version of browser APIs. This library can only run in the browser.
 */
var win = typeof window !== 'undefined' && window || {};
exports.window = win;
exports.document = win.document;
exports.location = win.location;
exports.gc = win['gc'] ? function () { return win['gc'](); } : function () { return null; };
exports.performance = win['performance'] ? win['performance'] : null;
exports.Event = win['Event'];
exports.MouseEvent = win['MouseEvent'];
exports.KeyboardEvent = win['KeyboardEvent'];
exports.EventTarget = win['EventTarget'];
exports.History = win['History'];
exports.Location = win['Location'];
exports.EventListener = win['EventListener'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvaHR0cC9zcmMvZmFjYWRlL2Jyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVIOztHQUVHO0FBQ0gsSUFBSSxHQUFHLEdBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLE1BQU0sSUFBUyxFQUFFO0FBRTdDLGNBQU0sT0FGd0M7QUFHbEQsZ0JBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO0FBQ3hCLGdCQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztBQUN4QixVQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLGNBQU0sT0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBWCxDQUFXLEdBQUcsY0FBVyxPQUFBLElBQUksRUFBSixDQUFJLENBQUM7QUFDckQsbUJBQVcsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUMzRCxhQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3JCLGtCQUFVLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQy9CLHFCQUFhLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3JDLG1CQUFXLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2pDLGVBQU8sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDekIsZ0JBQVEsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDM0IscUJBQWEsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMifQ==