/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var lang_1 = require('../facade/lang');
/**
 * A message extracted from a template.
 *
 * The identity of a message is comprised of `content` and `meaning`.
 *
 * `description` is additional information provided to the translator.
 */
var Message = (function () {
    function Message(content, meaning, description) {
        if (description === void 0) { description = null; }
        this.content = content;
        this.meaning = meaning;
        this.description = description;
    }
    return Message;
}());
exports.Message = Message;
/**
 * Computes the id of a message
 */
function id(m) {
    var meaning = lang_1.isPresent(m.meaning) ? m.meaning : '';
    var content = lang_1.isPresent(m.content) ? m.content : '';
    return lang_1.escape("$ng|" + meaning + "|" + content);
}
exports.id = id;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvc3JjL2kxOG4vbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQWdDLGdCQUFnQixDQUFDLENBQUE7QUFHakQ7Ozs7OztHQU1HO0FBQ0g7SUFDRSxpQkFBbUIsT0FBZSxFQUFTLE9BQWUsRUFBUyxXQUEwQjtRQUFqQywyQkFBaUMsR0FBakMsa0JBQWlDO1FBQTFFLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWU7SUFBRyxDQUFDO0lBQ25HLGNBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLGVBQU8sVUFFbkIsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsWUFBbUIsQ0FBVTtJQUMzQixJQUFJLE9BQU8sR0FBRyxnQkFBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNwRCxJQUFJLE9BQU8sR0FBRyxnQkFBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNwRCxNQUFNLENBQUMsYUFBTSxDQUFDLFNBQU8sT0FBTyxTQUFJLE9BQVMsQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFKZSxVQUFFLEtBSWpCLENBQUEifQ==