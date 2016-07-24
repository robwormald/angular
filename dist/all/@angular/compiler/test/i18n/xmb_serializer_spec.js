/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var message_1 = require('@angular/compiler/src/i18n/message');
var xmb_serializer_1 = require('@angular/compiler/src/i18n/xmb_serializer');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
function main() {
    testing_internal_1.describe('Xmb', function () {
        testing_internal_1.describe('Xmb Serialization', function () {
            testing_internal_1.it('should return an empty message bundle for an empty list of messages', function () { testing_internal_1.expect(xmb_serializer_1.serializeXmb([])).toEqual('<message-bundle></message-bundle>'); });
            testing_internal_1.it('should serialize messages without desc nor meaning', function () {
                var m = new message_1.Message('content', null, null);
                var expected = "<message-bundle><msg id='" + message_1.id(m) + "'>content</msg></message-bundle>";
                testing_internal_1.expect(xmb_serializer_1.serializeXmb([m])).toEqual(expected);
            });
            testing_internal_1.it('should serialize messages with desc and meaning', function () {
                var m = new message_1.Message('content', 'meaning', 'description');
                var expected = "<message-bundle><msg id='" + message_1.id(m) + "' desc='description' meaning='meaning'>content</msg></message-bundle>";
                testing_internal_1.expect(xmb_serializer_1.serializeXmb([m])).toEqual(expected);
            });
            testing_internal_1.it('should escape the desc and meaning', function () {
                var m = new message_1.Message('content', '"\'&<>"\'&<>', '"\'&<>"\'&<>');
                var expected = "<message-bundle><msg id='" + message_1.id(m) + "' desc='&quot;&apos;&amp;&lt;&gt;&quot;&apos;&amp;&lt;&gt;' meaning='&quot;&apos;&amp;&lt;&gt;&quot;&apos;&amp;&lt;&gt;'>content</msg></message-bundle>";
                testing_internal_1.expect(xmb_serializer_1.serializeXmb([m])).toEqual(expected);
            });
        });
        testing_internal_1.describe('Xmb Deserialization', function () {
            testing_internal_1.it('should parse an empty bundle', function () {
                var mb = '<message-bundle></message-bundle>';
                testing_internal_1.expect(xmb_serializer_1.deserializeXmb(mb, 'url').messages).toEqual({});
            });
            testing_internal_1.it('should parse an non-empty bundle', function () {
                var mb = "\n          <message-bundle>\n            <msg id=\"id1\" desc=\"description1\">content1</msg>\n            <msg id=\"id2\">content2</msg>\n          </message-bundle>\n        ";
                var parsed = xmb_serializer_1.deserializeXmb(mb, 'url').messages;
                testing_internal_1.expect(_serialize(parsed['id1'])).toEqual('content1');
                testing_internal_1.expect(_serialize(parsed['id2'])).toEqual('content2');
            });
            testing_internal_1.it('should error when cannot parse the content', function () {
                var mb = "\n          <message-bundle>\n            <msg id=\"id1\" desc=\"description1\">content\n          </message-bundle>\n        ";
                var res = xmb_serializer_1.deserializeXmb(mb, 'url');
                testing_internal_1.expect(_serializeErrors(res.errors)).toEqual(['Unexpected closing tag "message-bundle"']);
            });
            testing_internal_1.it('should error when cannot find the id attribute', function () {
                var mb = "\n          <message-bundle>\n            <msg>content</msg>\n          </message-bundle>\n        ";
                var res = xmb_serializer_1.deserializeXmb(mb, 'url');
                testing_internal_1.expect(_serializeErrors(res.errors)).toEqual(['"id" attribute is missing']);
            });
            testing_internal_1.it('should error on empty content', function () {
                var mb = "";
                var res = xmb_serializer_1.deserializeXmb(mb, 'url');
                testing_internal_1.expect(_serializeErrors(res.errors)).toEqual(['Missing element "message-bundle"']);
            });
            testing_internal_1.it('should error on an invalid element', function () {
                var mb = "\n          <message-bundle>\n            <invalid>content</invalid>\n          </message-bundle>\n        ";
                var res = xmb_serializer_1.deserializeXmb(mb, 'url');
                testing_internal_1.expect(_serializeErrors(res.errors)).toEqual(['Unexpected element "invalid"']);
            });
            testing_internal_1.it('should expand \'ph\' elements', function () {
                var mb = "\n          <message-bundle>\n            <msg id=\"id1\">a<ph name=\"i0\"/></msg>\n          </message-bundle>\n        ";
                var res = xmb_serializer_1.deserializeXmb(mb, 'url').messages['id1'];
                testing_internal_1.expect(res[1].name).toEqual('ph');
            });
        });
    });
}
exports.main = main;
function _serialize(nodes) {
    return nodes[0].value;
}
function _serializeErrors(errors) {
    return errors.map(function (e) { return e.msg; });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG1iX3NlcmlhbGl6ZXJfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvdGVzdC9pMThuL3htYl9zZXJpYWxpemVyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUdILHdCQUEwQixvQ0FBb0MsQ0FBQyxDQUFBO0FBQy9ELCtCQUEyQywyQ0FBMkMsQ0FBQyxDQUFBO0FBRXZGLGlDQUF1Rix3Q0FBd0MsQ0FBQyxDQUFBO0FBRWhJO0lBQ0UsMkJBQVEsQ0FBQyxLQUFLLEVBQUU7UUFDZCwyQkFBUSxDQUFDLG1CQUFtQixFQUFFO1lBQzVCLHFCQUFFLENBQUMscUVBQXFFLEVBQ3JFLGNBQVEseUJBQU0sQ0FBQyw2QkFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVyRixxQkFBRSxDQUFDLG9EQUFvRCxFQUFFO2dCQUN2RCxJQUFJLENBQUMsR0FBRyxJQUFJLGlCQUFPLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxRQUFRLEdBQUcsOEJBQTRCLFlBQUUsQ0FBQyxDQUFDLENBQUMscUNBQWtDLENBQUM7Z0JBQ25GLHlCQUFNLENBQUMsNkJBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBRSxDQUFDLGlEQUFpRCxFQUFFO2dCQUNwRCxJQUFJLENBQUMsR0FBRyxJQUFJLGlCQUFPLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDekQsSUFBSSxRQUFRLEdBQ1IsOEJBQTRCLFlBQUUsQ0FBQyxDQUFDLENBQUMsMEVBQXVFLENBQUM7Z0JBQzdH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