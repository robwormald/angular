/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var lexer_1 = require('@angular/compiler/src/expression_parser/lexer');
var parser_1 = require('@angular/compiler/src/expression_parser/parser');
var html_parser_1 = require('@angular/compiler/src/html_parser');
var message_1 = require('@angular/compiler/src/i18n/message');
var message_extractor_1 = require('@angular/compiler/src/i18n/message_extractor');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
function main() {
    testing_internal_1.describe('MessageExtractor', function () {
        var extractor;
        testing_internal_1.beforeEach(function () {
            var expParser = new parser_1.Parser(new lexer_1.Lexer());
            var htmlParser = new html_parser_1.HtmlParser();
            // TODO: pass expression parser
            extractor = new message_extractor_1.MessageExtractor(htmlParser, expParser, ['i18n-tag'], { 'i18n-el': ['trans'] });
        });
        testing_internal_1.it('should extract from elements with the i18n attr', function () {
            var res = extractor.extract('<div i18n=\'meaning|desc\'>message</div>', 'someurl');
            testing_internal_1.expect(res.messages).toEqual([new message_1.Message('message', 'meaning', 'desc')]);
        });
        testing_internal_1.it('should extract from elements with the i18n attr without a desc', function () {
            var res = extractor.extract('<div i18n=\'meaning\'>message</div>', 'someurl');
            testing_internal_1.expect(res.messages).toEqual([new message_1.Message('message', 'meaning', null)]);
        });
        testing_internal_1.it('should extract from elements with the i18n attr without a meaning', function () {
            var res = extractor.extract('<div i18n>message</div>', 'someurl');
            testing_internal_1.expect(res.messages).toEqual([new message_1.Message('message', null, null)]);
        });
        testing_internal_1.it('should extract from attributes', function () {
            var res = extractor.extract("\n        <div\n          title1='message1' i18n-title1='meaning1|desc1'\n          title2='message2' i18n-title2='meaning2|desc2'>\n        </div>\n      ", 'someurl');
            testing_internal_1.expect(res.messages).toEqual([
                new message_1.Message('message1', 'meaning1', 'desc1'), new message_1.Message('message2', 'meaning2', 'desc2')
            ]);
        });
        testing_internal_1.it('should extract from partitions', function () {
            var res = extractor.extract("\n         <!-- i18n: meaning1|desc1 -->message1<!-- /i18n -->\n         <!-- i18n: meaning2 -->message2<!-- /i18n -->\n         <!-- i18n -->message3<!-- /i18n -->", 'someUrl');
            testing_internal_1.expect(res.messages).toEqual([
                new message_1.Message('message1', 'meaning1', 'desc1'),
                new message_1.Message('message2', 'meaning2'),
                new message_1.Message('message3', null),
            ]);
        });
        testing_internal_1.it('should ignore other comments', function () {
            var res = extractor.extract("\n         <!-- i18n: meaning1|desc1 --><!-- other -->message1<!-- /i18n -->", 'someUrl');
            testing_internal_1.expect(res.messages).toEqual([new message_1.Message('message1', 'meaning1', 'desc1')]);
        });
        testing_internal_1.it('should replace interpolation with placeholders (text nodes)', function () {
            var res = extractor.extract('<div i18n>Hi {{one}} and {{two}}</div>', 'someurl');
            testing_internal_1.expect(res.messages).toEqual([new message_1.Message('<ph name="t0">Hi <ph name="INTERPOLATION_0"/> and <ph name="INTERPOLATION_1"/></ph>', null, null)]);
        });
        testing_internal_1.it('should replace interpolation with placeholders (attributes)', function () {
            var res = extractor.extract('<div title=\'Hi {{one}} and {{two}}\' i18n-title></div>', 'someurl');
            testing_internal_1.expect(res.messages).toEqual([new message_1.Message('Hi <ph name="INTERPOLATION_0"/> and <ph name="INTERPOLATION_1"/>', null, null)]);
        });
        testing_internal_1.it('should replace interpolation with named placeholders if provided (text nodes)', function () {
            var res = extractor.extract("\n        <div i18n>Hi {{one //i18n(ph=\"FIRST\")}} and {{two //i18n(ph=\"SECOND\")}}</div>", 'someurl');
            testing_internal_1.expect(res.messages).toEqual([new message_1.Message('<ph name="t0">Hi <ph name="FIRST"/> and <ph name="SECOND"/></ph>', null, null)]);
        });
        testing_internal_1.it('should replace interpolation with named placeholders if provided (attributes)', function () {
            var res = extractor.extract("\n      <div title='Hi {{one //i18n(ph=\"FIRST\")}} and {{two //i18n(ph=\"SECOND\")}}'\n        i18n-title></div>", 'someurl');
            testing_internal_1.expect(res.messages).toEqual([new message_1.Message('Hi <ph name="FIRST"/> and <ph name="SECOND"/>', null, null)]);
        });
        testing_internal_1.it('should match named placeholders with extra spacing', function () {
            var res = extractor.extract("\n      <div title='Hi {{one // i18n ( ph = \"FIRST\" )}} and {{two // i18n ( ph = \"SECOND\" )}}'\n        i18n-title></div>", 'someurl');
            testing_internal_1.expect(res.messages).toEqual([new message_1.Message('Hi <ph name="FIRST"/> and <ph name="SECOND"/>', null, null)]);
        });
        testing_internal_1.it('should suffix duplicate placeholder names with numbers', function () {
            var res = extractor.extract("\n      <div title='Hi {{one //i18n(ph=\"FIRST\")}} and {{two //i18n(ph=\"FIRST\")}} and {{three //i18n(ph=\"FIRST\")}}'\n        i18n-title></div>", 'someurl');
            testing_internal_1.expect(res.messages).toEqual([new message_1.Message('Hi <ph name="FIRST"/> and <ph name="FIRST_1"/> and <ph name="FIRST_2"/>', null, null)]);
        });
        testing_internal_1.it('should handle html content', function () {
            var res = extractor.extract('<div i18n><div attr="value">zero<div>one</div></div><div>two</div></div>', 'someurl');
            testing_internal_1.expect(res.messages).toEqual([new message_1.Message('<ph name="e0">zero<ph name="e2">one</ph></ph><ph name="e4">two</ph>', null, null)]);
        });
        testing_internal_1.it('should handle html content with interpolation', function () {
            var res = extractor.extract('<div i18n><div>zero{{a}}<div>{{b}}</div></div></div>', 'someurl');
            testing_internal_1.expect(res.messages).toEqual([new message_1.Message('<ph name="e0"><ph name="t1">zero<ph name="INTERPOLATION_0"/></ph><ph name="e2"><ph name="t3"><ph name="INTERPOLATION_0"/></ph></ph></ph>', null, null)]);
        });
        testing_internal_1.it('should extract from nested elements', function () {
            var res = extractor.extract('<div title="message1" i18n-title="meaning1|desc1"><div i18n="meaning2|desc2">message2</div></div>', 'someurl');
            testing_internal_1.expect(res.messages).toEqual([
                new message_1.Message('message2', 'meaning2', 'desc2'), new message_1.Message('message1', 'meaning1', 'desc1')
            ]);
        });
        testing_internal_1.it('should extract messages from attributes in i18n blocks', function () {
            var res = extractor.extract('<div i18n><div attr="value" i18n-attr="meaning|desc">message</div></div>', 'someurl');
            testing_internal_1.expect(res.messages).toEqual([
                new message_1.Message('<ph name="e0">message</ph>', null, null),
                new message_1.Message('value', 'meaning', 'desc')
            ]);
        });
        testing_internal_1.it('should remove duplicate messages', function () {
            var res = extractor.extract("\n         <!-- i18n: meaning|desc1 -->message<!-- /i18n -->\n         <!-- i18n: meaning|desc2 -->message<!-- /i18n -->", 'someUrl');
            testing_internal_1.expect(message_extractor_1.removeDuplicates(res.messages)).toEqual([
                new message_1.Message('message', 'meaning', 'desc1'),
            ]);
        });
        testing_internal_1.describe('implicit translation', function () {
            testing_internal_1.it('should extract from elements', function () {
                var res = extractor.extract('<i18n-tag>message</i18n-tag>', 'someurl');
                testing_internal_1.expect(res.messages).toEqual([new message_1.Message('message', null, null)]);
            });
            testing_internal_1.it('should extract meaning and description from elements when present', function () {
                var res = extractor.extract('<i18n-tag i18n=\'meaning|description\'>message</i18n-tag>', 'someurl');
                testing_internal_1.expect(res.messages).toEqual([new message_1.Message('message', 'meaning', 'description')]);
            });
            testing_internal_1.it('should extract from attributes', function () {
                var res = extractor.extract("<i18n-el trans='message'></i18n-el>", 'someurl');
                testing_internal_1.expect(res.messages).toEqual([new message_1.Message('message', null, null)]);
            });
            testing_internal_1.it('should extract meaning and description from attributes when present', function () {
                var res = extractor.extract("<i18n-el trans='message' i18n-trans=\"meaning|desc\"></i18n-el>", 'someurl');
                testing_internal_1.expect(res.messages).toEqual([new message_1.Message('message', 'meaning', 'desc')]);
            });
        });
        testing_internal_1.describe('errors', function () {
            testing_internal_1.it('should error on i18n attributes without matching "real" attributes', function () {
                var res = extractor.extract("\n        <div\n          title1='message1' i18n-title1='meaning1|desc1' i18n-title2='meaning2|desc2'>\n        </div>", 'someurl');
                testing_internal_1.expect(res.errors.length).toEqual(1);
                testing_internal_1.expect(res.errors[0].msg).toEqual('Missing attribute \'title2\'.');
            });
            testing_internal_1.it('should error when i18n comments are unbalanced', function () {
                var res = extractor.extract('<!-- i18n -->message1', 'someUrl');
                testing_internal_1.expect(res.errors.length).toEqual(1);
                testing_internal_1.expect(res.errors[0].msg).toEqual('Missing closing \'i18n\' comment.');
            });
            testing_internal_1.it('should error when i18n comments are unbalanced', function () {
                var res = extractor.extract('<!-- i18n -->', 'someUrl');
                testing_internal_1.expect(res.errors.length).toEqual(1);
                testing_internal_1.expect(res.errors[0].msg).toEqual('Missing closing \'i18n\' comment.');
            });
            testing_internal_1.it('should return parse errors when the template is invalid', function () {
                var res = extractor.extract('<input&#Besfs', 'someurl');
                testing_internal_1.expect(res.errors.length).toEqual(1);
                testing_internal_1.expect(res.errors[0].msg).toEqual('Unexpected character "s"');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZV9leHRyYWN0b3Jfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvdGVzdC9pMThuL21lc3NhZ2VfZXh0cmFjdG9yX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHNCQUF1QywrQ0FBK0MsQ0FBQyxDQUFBO0FBQ3ZGLHVCQUF5QyxnREFBZ0QsQ0FBQyxDQUFBO0FBQzFGLDRCQUF5QixtQ0FBbUMsQ0FBQyxDQUFBO0FBQzdELHdCQUFzQixvQ0FBb0MsQ0FBQyxDQUFBO0FBQzNELGtDQUFpRCw4Q0FBOEMsQ0FBQyxDQUFBO0FBQ2hHLGlDQUF1Rix3Q0FBd0MsQ0FBQyxDQUFBO0FBR2hJO0lBQ0UsMkJBQVEsQ0FBQyxrQkFBa0IsRUFBRTtRQUMzQixJQUFJLFNBQTJCLENBQUM7UUFFaEMsNkJBQVUsQ0FBQztZQUNULElBQU0sU0FBUyxHQUFHLElBQUksZUFBZ0IsQ0FBQyxJQUFJLGFBQWUsRUFBRSxDQUFDLENBQUM7WUFDOUQsSUFBTSxVQUFVLEdBQUcsSUFBSSx3QkFBVSxFQUFFLENBQUM7WUFDcEMsK0JBQStCO1lBQy9CLFNBQVMsR0FBRyxJQUFJLG9DQUFnQixDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFDLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUNoRyxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsaURBQWlELEVBQUU7WUFDcEQsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQywwQ0FBMEMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNuRix5QkFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLGlCQUFPLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLENB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