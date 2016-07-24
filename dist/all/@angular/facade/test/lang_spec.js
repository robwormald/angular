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
var lang_1 = require('../src/lang');
var UsefulEnum;
(function (UsefulEnum) {
    UsefulEnum[UsefulEnum["MyToken"] = 0] = "MyToken";
    UsefulEnum[UsefulEnum["MyOtherToken"] = 1] = "MyOtherToken";
})(UsefulEnum || (UsefulEnum = {}));
var MySuperclass = (function () {
    function MySuperclass() {
    }
    return MySuperclass;
}());
var MySubclass = (function (_super) {
    __extends(MySubclass, _super);
    function MySubclass() {
        _super.apply(this, arguments);
    }
    return MySubclass;
}(MySuperclass));
function main() {
    describe('RegExp', function () {
        it('should expose the index for each match', function () {
            var re = /(!)/g;
            var matcher = lang_1.RegExpWrapper.matcher(re, '0!23!567!!');
            var indexes = [];
            var m;
            while (lang_1.isPresent(m = lang_1.RegExpMatcherWrapper.next(matcher))) {
                indexes.push(m.index);
                expect(m[0]).toEqual('!');
                expect(m[1]).toEqual('!');
                expect(m.length).toBe(2);
            }
            expect(indexes).toEqual([1, 4, 8, 9]);
        });
        it('should reset before it is reused', function () {
            var re = /^['"]/g;
            var str = '\'';
            expect(lang_1.RegExpWrapper.test(re, str)).toEqual(true);
            // If not reset, the second attempt to test results in false
            expect(lang_1.RegExpWrapper.test(re, str)).toEqual(true);
        });
        it('should implement replace all', function () {
            var re = /(\d)+/g;
            var m = lang_1.RegExpWrapper.replaceAll(re, 'a1b2c', function (match /** TODO #9100 */) { return ("!" + match[1] + "!"); });
            expect(m).toEqual('a!1!b!2!c');
        });
        it('should escape regexp', function () {
            expect(lang_1.RegExpWrapper.firstMatch(new RegExp(lang_1.escapeRegExp('b')), 'abc')).toBeTruthy();
            expect(lang_1.RegExpWrapper.firstMatch(new RegExp(lang_1.escapeRegExp('b')), 'adc')).toBeFalsy();
            expect(lang_1.RegExpWrapper.firstMatch(new RegExp(lang_1.escapeRegExp('a.b')), 'a.b')).toBeTruthy();
            expect(lang_1.RegExpWrapper.firstMatch(new RegExp(lang_1.escapeRegExp('axb')), 'a.b')).toBeFalsy();
        });
    });
    describe('const', function () {
        it('should support const expressions both in TS and Dart', function () {
            var numbers = [1, 2, 3];
            expect(numbers).toEqual([1, 2, 3]);
        });
    });
    describe('Number', function () {
        describe('isNumeric', function () {
            it('should return true when passing correct numeric string', function () { expect(lang_1.NumberWrapper.isNumeric('2')).toBe(true); });
            it('should return true when passing correct double string', function () { expect(lang_1.NumberWrapper.isNumeric('1.123')).toBe(true); });
            it('should return true when passing correct negative string', function () { expect(lang_1.NumberWrapper.isNumeric('-2')).toBe(true); });
            it('should return true when passing correct scientific notation string', function () { expect(lang_1.NumberWrapper.isNumeric('1e5')).toBe(true); });
            it('should return false when passing incorrect numeric', function () { expect(lang_1.NumberWrapper.isNumeric('a')).toBe(false); });
            it('should return false when passing parseable but non numeric', function () { expect(lang_1.NumberWrapper.isNumeric('2a')).toBe(false); });
        });
    });
    describe('String', function () {
        var s;
        describe('slice', function () {
            beforeEach(function () { s = 'abcdefghij'; });
            it('should return the whole string if neither start nor end are specified', function () { expect(lang_1.StringWrapper.slice(s)).toEqual('abcdefghij'); });
            it('should return up to the end if end is not specified', function () { expect(lang_1.StringWrapper.slice(s, 1)).toEqual('bcdefghij'); });
            it('should support negative start', function () { expect(lang_1.StringWrapper.slice(s, -1)).toEqual('j'); });
            it('should support negative end', function () { expect(lang_1.StringWrapper.slice(s, -3, -1)).toEqual('hi'); });
            it('should return empty string if start is greater than end', function () {
                expect(lang_1.StringWrapper.slice(s, 4, 2)).toEqual('');
                expect(lang_1.StringWrapper.slice(s, -2, -4)).toEqual('');
            });
        });
        describe('stripLeft', function () {
            it('should strip the first character of the string if it matches the provided input', function () {
                var input = '~angular2 is amazing';
                var expectedOutput = 'angular2 is amazing';
                expect(lang_1.StringWrapper.stripLeft(input, '~')).toEqual(expectedOutput);
            });
            it('should keep stripping characters from the start until the first unmatched character', function () {
                var input = '#####hello';
                var expectedOutput = 'hello';
                expect(lang_1.StringWrapper.stripLeft(input, '#')).toEqual(expectedOutput);
            });
            it('should not alter the provided input if the first character does not match the provided input', function () {
                var input = '+angular2 is amazing';
                expect(lang_1.StringWrapper.stripLeft(input, '*')).toEqual(input);
            });
            it('should not do any alterations when an empty string or null value is passed in', function () {
                expect(lang_1.StringWrapper.stripLeft('', 'S')).toEqual('');
                expect(lang_1.StringWrapper.stripLeft(null, 'S')).toEqual(null);
            });
        });
        describe('stripRight', function () {
            it('should strip the first character of the string if it matches the provided input', function () {
                var input = 'angular2 is amazing!';
                var expectedOutput = 'angular2 is amazing';
                expect(lang_1.StringWrapper.stripRight(input, '!')).toEqual(expectedOutput);
            });
            it('should not alter the provided input if the first character does not match the provided input', function () {
                var input = 'angular2 is amazing+';
                expect(lang_1.StringWrapper.stripRight(input, '*')).toEqual(input);
            });
            it('should keep stripping characters from the end until the first unmatched character', function () {
                var input = 'hi&!&&&&&';
                var expectedOutput = 'hi&!';
                expect(lang_1.StringWrapper.stripRight(input, '&')).toEqual(expectedOutput);
            });
            it('should not do any alterations when an empty string or null value is passed in', function () {
                expect(lang_1.StringWrapper.stripRight('', 'S')).toEqual('');
                expect(lang_1.StringWrapper.stripRight(null, 'S')).toEqual(null);
            });
        });
        describe('resolveEnumToken', function () {
            it('should resolve a token given an enum and index values', function () {
                var token = UsefulEnum.MyToken;
                expect(lang_1.resolveEnumToken(UsefulEnum, token)).toEqual('MyToken');
                token = UsefulEnum.MyOtherToken;
                expect(lang_1.resolveEnumToken(UsefulEnum, token)).toEqual('MyOtherToken');
            });
        });
        describe('hasConstructor', function () {
            it('should be true when the type matches', function () { expect(lang_1.hasConstructor(new MySuperclass(), MySuperclass)).toEqual(true); });
            it('should be false for subtypes', function () { expect(lang_1.hasConstructor(new MySubclass(), MySuperclass)).toEqual(false); });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ19zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9mYWNhZGUvdGVzdC9sYW5nX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgscUJBQTJJLGFBQWEsQ0FBQyxDQUFBO0FBRXpKLElBQUssVUFHSjtBQUhELFdBQUssVUFBVTtJQUNiLGlEQUFPLENBQUE7SUFDUCwyREFBWSxDQUFBO0FBQ2QsQ0FBQyxFQUhJLFVBQVUsS0FBVixVQUFVLFFBR2Q7QUFFRDtJQUFBO0lBQW9CLENBQUM7SUFBRCxtQkFBQztBQUFELENBQUMsQUFBckIsSUFBcUI7QUFDckI7SUFBeUIsOEJBQVk7SUFBckM7UUFBeUIsOEJBQVk7SUFBRSxDQUFDO0lBQUQsaUJBQUM7QUFBRCxDQUFDLEFBQXhDLENBQXlCLFlBQVksR0FBRztBQUV4QztJQUNFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7UUFDakIsRUFBRSxDQUFDLHdDQUF3QyxFQUFFO1lBQzNDLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQztZQUNoQixJQUFJLE9BQU8sR0FBRyxvQkFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDdEQsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBTSxDQUFtQjtZQUU3QixPQUFPLGdCQUFTLENBQUMsQ0FBQyxHQUFHLDJCQUFvQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3pELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0QixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxD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