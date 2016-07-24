/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var lang_1 = require('../../facade/lang');
var route_path_1 = require('./route_path');
function computeNumberOfRegexGroups(regex) {
    // cleverly compute regex groups by appending an alternative empty matching
    // pattern and match against an empty string, the resulting match still
    // receives all the other groups
    var test_regex = lang_1.RegExpWrapper.create(regex + '|');
    var matcher = lang_1.RegExpWrapper.matcher(test_regex, '');
    var match = lang_1.RegExpMatcherWrapper.next(matcher);
    return match.length;
}
var RegexRoutePath = (function () {
    function RegexRoutePath(_reString, _serializer, _groupNames) {
        this._reString = _reString;
        this._serializer = _serializer;
        this._groupNames = _groupNames;
        this.terminal = true;
        this.specificity = '2';
        this.hash = this._reString;
        this._regex = lang_1.RegExpWrapper.create(this._reString);
        if (this._groupNames != null) {
            var groups = computeNumberOfRegexGroups(this._reString);
            if (groups != _groupNames.length) {
                throw new core_1.BaseException("Regex group names [" + this._groupNames.join(',') + "] must contain names for each matching group and a name for the complete match as its first element of regex '" + this._reString + "'. " + groups + " group names are expected.");
            }
        }
    }
    RegexRoutePath.prototype.matchUrl = function (url) {
        var urlPath = url.toString();
        var params = {};
        var matcher = lang_1.RegExpWrapper.matcher(this._regex, urlPath);
        var match = lang_1.RegExpMatcherWrapper.next(matcher);
        if (lang_1.isBlank(match)) {
            return null;
        }
        for (var i = 0; i < match.length; i += 1) {
            params[this._groupNames != null ? this._groupNames[i] : i.toString()] = match[i];
        }
        return new route_path_1.MatchedUrl(urlPath, [], params, [], null);
    };
    RegexRoutePath.prototype.generateUrl = function (params) { return this._serializer(params); };
    RegexRoutePath.prototype.toString = function () { return this._reString; };
    return RegexRoutePath;
}());
exports.RegexRoutePath = RegexRoutePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnZXhfcm91dGVfcGF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyLWRlcHJlY2F0ZWQvc3JjL3J1bGVzL3JvdXRlX3BhdGhzL3JlZ2V4X3JvdXRlX3BhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUE0QixlQUFlLENBQUMsQ0FBQTtBQUU1QyxxQkFBMkQsbUJBQW1CLENBQUMsQ0FBQTtBQUcvRSwyQkFBa0QsY0FBYyxDQUFDLENBQUE7QUFLakUsb0NBQW9DLEtBQWE7SUFDL0MsMkVBQTJFO0lBQzNFLHVFQUF1RTtJQUN2RSxnQ0FBZ0M7SUFDaEMsSUFBSSxVQUFVLEdBQUcsb0JBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ25ELElBQUksT0FBTyxHQUFHLG9CQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwRCxJQUFJLEtBQUssR0FBRywyQkFBb0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDdEIsQ0FBQztBQUVEO0lBT0Usd0JBQ1ksU0FBaUIsRUFBVSxXQUE0QixFQUN2RCxXQUEyQjtRQUQzQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQ3ZELGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQVBoQyxhQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLGdCQUFXLEdBQVcsR0FBRyxDQUFDO1FBTy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLG9CQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxNQUFNLEdBQUcsMEJBQTBCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTSxJQUFJLG9CQUFhLENBQ25CLHdCQUFzQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsc0hBRXpELElBQUksQ0FBQyxTQUFTLFdBQU0sTUFBTSwrQkFBNEIsQ0FBQyxDQUFDO1lBQ3JELENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVELGlDQUFRLEdBQVIsVUFBUyxHQUFRO1FBQ2YsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdCLElBQUksTUFBTSxHQUE0QixFQUFFLENBQUM7UUFDekMsSUFBSSxPQUFPLEdBQUcsb0JBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxRCxJQUFJLEtBQUssR0FBRywyQkFBb0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFL0MsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25GLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSx1QkFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsb0NBQVcsR0FBWCxVQUFZLE1BQTRCLElBQWtCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU1RixpQ0FBUSxHQUFSLGNBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMvQyxxQkFBQztBQUFELENBQUMsQUEzQ0QsSUEyQ0M7QUEzQ1ksc0JBQWMsaUJBMkMxQixDQUFBIn0=