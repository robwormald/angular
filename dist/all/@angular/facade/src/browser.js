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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvZmFjYWRlL3NyYy9icm93c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSDs7R0FFRztBQUNILElBQUksR0FBRyxHQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLElBQVMsRUFBRTtBQUU3QyxjQUFNLE9BRndDO0FBR2xELGdCQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztBQUN4QixnQkFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7QUFDeEIsVUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxjQUFNLE9BQUEsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQVgsQ0FBVyxHQUFHLGNBQVcsT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDO0FBQ3JELG1CQUFXLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDM0QsYUFBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyQixrQkFBVSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMvQixxQkFBYSxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNyQyxtQkFBVyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNqQyxlQUFPLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3pCLGdCQUFRLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzNCLHFCQUFhLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDIn0=