/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var route_path_1 = require('../../../src/rules/route_paths/route_path');
var regex_route_path_1 = require('../../../src/rules/route_paths/regex_route_path');
var url_parser_1 = require('../../../src/url_parser');
function emptySerializer(params /** TODO #9100 */) {
    return new route_path_1.GeneratedUrl('', {});
}
function main() {
    testing_internal_1.describe('RegexRoutePath', function () {
        testing_internal_1.it('should throw when given an invalid regex', function () { testing_internal_1.expect(function () { return new regex_route_path_1.RegexRoutePath('[abc', emptySerializer); }).toThrowError(); });
        testing_internal_1.it('should parse a single param using capture groups', function () {
            var rec = new regex_route_path_1.RegexRoutePath('^(.+)$', emptySerializer);
            var url = url_parser_1.parser.parse('hello');
            var match = rec.matchUrl(url);
            testing_internal_1.expect(match.allParams).toEqual({ '0': 'hello', '1': 'hello' });
        });
        testing_internal_1.it('should parse multiple params using capture groups', function () {
            var rec = new regex_route_path_1.RegexRoutePath('^(.+)\\.(.+)$', emptySerializer);
            var url = url_parser_1.parser.parse('hello.goodbye');
            var match = rec.matchUrl(url);
            testing_internal_1.expect(match.allParams).toEqual({ '0': 'hello.goodbye', '1': 'hello', '2': 'goodbye' });
        });
        testing_internal_1.it('should generate a url by calling the provided serializer', function () {
            function serializer(params /** TODO #9100 */) {
                return new route_path_1.GeneratedUrl("/a/" + params['a'] + "/b/" + params['b'], {});
            }
            var rec = new regex_route_path_1.RegexRoutePath('/a/(.+)/b/(.+)$', serializer);
            var params = { a: 'one', b: 'two' };
            var url = rec.generateUrl(params);
            testing_internal_1.expect(url.urlPath).toEqual('/a/one/b/two');
        });
        testing_internal_1.it('should raise an error when the number of parameters doesnt match', function () {
            testing_internal_1.expect(function () {
                new regex_route_path_1.RegexRoutePath('^a-([0-9]+)-b-([0-9]+)$', emptySerializer, ['complete_match', 'a']);
            }).toThrowError("Regex group names [complete_match,a] must contain names for each matching group and a name for the complete match as its first element of regex '^a-([0-9]+)-b-([0-9]+)$'. 3 group names are expected.");
        });
        testing_internal_1.it('should take group naming into account when passing params', function () {
            var rec = new regex_route_path_1.RegexRoutePath('^a-([0-9]+)-b-([0-9]+)$', emptySerializer, ['complete_match', 'a', 'b']);
            var url = url_parser_1.parser.parse('a-123-b-345');
            var match = rec.matchUrl(url);
            testing_internal_1.expect(match.allParams).toEqual({ 'complete_match': 'a-123-b-345', 'a': '123', 'b': '345' });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnZXhfcm91dGVfcGFyYW1fc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyLWRlcHJlY2F0ZWQvdGVzdC9ydWxlcy9yb3V0ZV9wYXRocy9yZWdleF9yb3V0ZV9wYXJhbV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBd0Usd0NBQXdDLENBQUMsQ0FBQTtBQUVqSCwyQkFBMkIsMkNBQTJDLENBQUMsQ0FBQTtBQUN2RSxpQ0FBNkIsaURBQWlELENBQUMsQ0FBQTtBQUMvRSwyQkFBcUIseUJBQXlCLENBQUMsQ0FBQTtBQUUvQyx5QkFBeUIsTUFBVyxDQUFDLGlCQUFpQjtJQUNwRCxNQUFNLENBQUMsSUFBSSx5QkFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBRUQ7SUFDRSwyQkFBUSxDQUFDLGdCQUFnQixFQUFFO1FBRXpCLHFCQUFFLENBQUMsMENBQTBDLEVBQzFDLGNBQVEseUJBQU0sQ0FBQyxjQUFNLE9BQUEsSUFBSSxpQ0FBYyxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsRUFBM0MsQ0FBMkMsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFeEYscUJBQUUsQ0FBQyxrREFBa0QsRUFBRTtZQUNyRCxJQUFJLEdBQUcsR0FBRyxJQUFJLGlDQUFjLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQ3hELElBQUksR0FBRyxHQUFHLG1CQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hDLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIseUJBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFB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