/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var html_lexer_1 = require('@angular/compiler/src/html_lexer');
var parse_util_1 = require('@angular/compiler/src/parse_util');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
function main() {
    testing_internal_1.describe('HtmlLexer', function () {
        testing_internal_1.describe('line/column numbers', function () {
            testing_internal_1.it('should work without newlines', function () {
                testing_internal_1.expect(tokenizeAndHumanizeLineColumn('<t>a</t>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, '0:0'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END, '0:2'],
                    [html_lexer_1.HtmlTokenType.TEXT, '0:3'],
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, '0:4'],
                    [html_lexer_1.HtmlTokenType.EOF, '0:8'],
                ]);
            });
            testing_internal_1.it('should work with one newline', function () {
                testing_internal_1.expect(tokenizeAndHumanizeLineColumn('<t>\na</t>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, '0:0'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END, '0:2'],
                    [html_lexer_1.HtmlTokenType.TEXT, '0:3'],
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, '1:1'],
                    [html_lexer_1.HtmlTokenType.EOF, '1:5'],
                ]);
            });
            testing_internal_1.it('should work with multiple newlines', function () {
                testing_internal_1.expect(tokenizeAndHumanizeLineColumn('<t\n>\na</t>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, '0:0'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END, '1:0'],
                    [html_lexer_1.HtmlTokenType.TEXT, '1:1'],
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, '2:1'],
                    [html_lexer_1.HtmlTokenType.EOF, '2:5'],
                ]);
            });
            testing_internal_1.it('should work with CR and LF', function () {
                testing_internal_1.expect(tokenizeAndHumanizeLineColumn('<t\n>\r\na\r</t>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, '0:0'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END, '1:0'],
                    [html_lexer_1.HtmlTokenType.TEXT, '1:1'],
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, '2:1'],
                    [html_lexer_1.HtmlTokenType.EOF, '2:5'],
                ]);
            });
        });
        testing_internal_1.describe('comments', function () {
            testing_internal_1.it('should parse comments', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('<!--t\ne\rs\r\nt-->')).toEqual([
                    [html_lexer_1.HtmlTokenType.COMMENT_START],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 't\ne\ns\nt'],
                    [html_lexer_1.HtmlTokenType.COMMENT_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should store the locations', function () {
                testing_internal_1.expect(tokenizeAndHumanizeSourceSpans('<!--t\ne\rs\r\nt-->')).toEqual([
                    [html_lexer_1.HtmlTokenType.COMMENT_START, '<!--'],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 't\ne\rs\r\nt'],
                    [html_lexer_1.HtmlTokenType.COMMENT_END, '-->'],
                    [html_lexer_1.HtmlTokenType.EOF, ''],
                ]);
            });
            testing_internal_1.it('should report <!- without -', function () {
                testing_internal_1.expect(tokenizeAndHumanizeErrors('<!-a')).toEqual([
                    [html_lexer_1.HtmlTokenType.COMMENT_START, 'Unexpected character "a"', '0:3']
                ]);
            });
            testing_internal_1.it('should report missing end comment', function () {
                testing_internal_1.expect(tokenizeAndHumanizeErrors('<!--')).toEqual([
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 'Unexpected character "EOF"', '0:4']
                ]);
            });
            testing_internal_1.it('should accept comments finishing by too many dashes (even number)', function () {
                testing_internal_1.expect(tokenizeAndHumanizeSourceSpans('<!-- test ---->')).toEqual([
                    [html_lexer_1.HtmlTokenType.COMMENT_START, '<!--'],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, ' test --'],
                    [html_lexer_1.HtmlTokenType.COMMENT_END, '-->'],
                    [html_lexer_1.HtmlTokenType.EOF, ''],
                ]);
            });
            testing_internal_1.it('should accept comments finishing by too many dashes (odd number)', function () {
                testing_internal_1.expect(tokenizeAndHumanizeSourceSpans('<!-- test --->')).toEqual([
                    [html_lexer_1.HtmlTokenType.COMMENT_START, '<!--'],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, ' test -'],
                    [html_lexer_1.HtmlTokenType.COMMENT_END, '-->'],
                    [html_lexer_1.HtmlTokenType.EOF, ''],
                ]);
            });
        });
        testing_internal_1.describe('doctype', function () {
            testing_internal_1.it('should parse doctypes', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('<!doctype html>')).toEqual([
                    [html_lexer_1.HtmlTokenType.DOC_TYPE, 'doctype html'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should store the locations', function () {
                testing_internal_1.expect(tokenizeAndHumanizeSourceSpans('<!doctype html>')).toEqual([
                    [html_lexer_1.HtmlTokenType.DOC_TYPE, '<!doctype html>'],
                    [html_lexer_1.HtmlTokenType.EOF, ''],
                ]);
            });
            testing_internal_1.it('should report missing end doctype', function () {
                testing_internal_1.expect(tokenizeAndHumanizeErrors('<!')).toEqual([
                    [html_lexer_1.HtmlTokenType.DOC_TYPE, 'Unexpected character "EOF"', '0:2']
                ]);
            });
        });
        testing_internal_1.describe('CDATA', function () {
            testing_internal_1.it('should parse CDATA', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('<![CDATA[t\ne\rs\r\nt]]>')).toEqual([
                    [html_lexer_1.HtmlTokenType.CDATA_START],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 't\ne\ns\nt'],
                    [html_lexer_1.HtmlTokenType.CDATA_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should store the locations', function () {
                testing_internal_1.expect(tokenizeAndHumanizeSourceSpans('<![CDATA[t\ne\rs\r\nt]]>')).toEqual([
                    [html_lexer_1.HtmlTokenType.CDATA_START, '<![CDATA['],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 't\ne\rs\r\nt'],
                    [html_lexer_1.HtmlTokenType.CDATA_END, ']]>'],
                    [html_lexer_1.HtmlTokenType.EOF, ''],
                ]);
            });
            testing_internal_1.it('should report <![ without CDATA[', function () {
                testing_internal_1.expect(tokenizeAndHumanizeErrors('<![a')).toEqual([
                    [html_lexer_1.HtmlTokenType.CDATA_START, 'Unexpected character "a"', '0:3']
                ]);
            });
            testing_internal_1.it('should report missing end cdata', function () {
                testing_internal_1.expect(tokenizeAndHumanizeErrors('<![CDATA[')).toEqual([
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 'Unexpected character "EOF"', '0:9']
                ]);
            });
        });
        testing_internal_1.describe('open tags', function () {
            testing_internal_1.it('should parse open tags without prefix', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('<test>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 'test'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse namespace prefix', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('<ns1:test>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, 'ns1', 'test'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse void tags', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('<test/>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 'test'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END_VOID],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should allow whitespace after the tag name', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('<test >')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 'test'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should store the locations', function () {
                testing_internal_1.expect(tokenizeAndHumanizeSourceSpans('<test>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, '<test'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END, '>'],
                    [html_lexer_1.HtmlTokenType.EOF, ''],
                ]);
            });
        });
        testing_internal_1.describe('attributes', function () {
            testing_internal_1.it('should parse attributes without prefix', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('<t a>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 't'],
                    [html_lexer_1.HtmlTokenType.ATTR_NAME, null, 'a'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse attributes with interpolation', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('<t a="{{v}}" b="s{{m}}e" c="s{{m//c}}e">')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 't'],
                    [html_lexer_1.HtmlTokenType.ATTR_NAME, null, 'a'],
                    [html_lexer_1.HtmlTokenType.ATTR_VALUE, '{{v}}'],
                    [html_lexer_1.HtmlTokenType.ATTR_NAME, null, 'b'],
                    [html_lexer_1.HtmlTokenType.ATTR_VALUE, 's{{m}}e'],
                    [html_lexer_1.HtmlTokenType.ATTR_NAME, null, 'c'],
                    [html_lexer_1.HtmlTokenType.ATTR_VALUE, 's{{m//c}}e'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse attributes with prefix', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('<t ns1:a>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 't'],
                    [html_lexer_1.HtmlTokenType.ATTR_NAME, 'ns1', 'a'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse attributes whose prefix is not valid', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('<t (ns1:a)>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 't'],
                    [html_lexer_1.HtmlTokenType.ATTR_NAME, null, '(ns1:a)'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse attributes with single quote value', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('<t a=\'b\'>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 't'],
                    [html_lexer_1.HtmlTokenType.ATTR_NAME, null, 'a'],
                    [html_lexer_1.HtmlTokenType.ATTR_VALUE, 'b'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse attributes with double quote value', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('<t a="b">')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 't'],
                    [html_lexer_1.HtmlTokenType.ATTR_NAME, null, 'a'],
                    [html_lexer_1.HtmlTokenType.ATTR_VALUE, 'b'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse attributes with unquoted value', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('<t a=b>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 't'],
                    [html_lexer_1.HtmlTokenType.ATTR_NAME, null, 'a'],
                    [html_lexer_1.HtmlTokenType.ATTR_VALUE, 'b'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should allow whitespace', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('<t a = b >')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 't'],
                    [html_lexer_1.HtmlTokenType.ATTR_NAME, null, 'a'],
                    [html_lexer_1.HtmlTokenType.ATTR_VALUE, 'b'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse attributes with entities in values', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('<t a="&#65;&#x41;">')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 't'],
                    [html_lexer_1.HtmlTokenType.ATTR_NAME, null, 'a'],
                    [html_lexer_1.HtmlTokenType.ATTR_VALUE, 'AA'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should not decode entities without trailing ";"', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('<t a="&amp" b="c&&d">')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 't'],
                    [html_lexer_1.HtmlTokenType.ATTR_NAME, null, 'a'],
                    [html_lexer_1.HtmlTokenType.ATTR_VALUE, '&amp'],
                    [html_lexer_1.HtmlTokenType.ATTR_NAME, null, 'b'],
                    [html_lexer_1.HtmlTokenType.ATTR_VALUE, 'c&&d'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse attributes with "&" in values', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('<t a="b && c &">')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 't'],
                    [html_lexer_1.HtmlTokenType.ATTR_NAME, null, 'a'],
                    [html_lexer_1.HtmlTokenType.ATTR_VALUE, 'b && c &'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse values with CR and LF', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('<t a=\'t\ne\rs\r\nt\'>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 't'],
                    [html_lexer_1.HtmlTokenType.ATTR_NAME, null, 'a'],
                    [html_lexer_1.HtmlTokenType.ATTR_VALUE, 't\ne\ns\nt'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should store the locations', function () {
                testing_internal_1.expect(tokenizeAndHumanizeSourceSpans('<t a=b>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, '<t'],
                    [html_lexer_1.HtmlTokenType.ATTR_NAME, 'a'],
                    [html_lexer_1.HtmlTokenType.ATTR_VALUE, 'b'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END, '>'],
                    [html_lexer_1.HtmlTokenType.EOF, ''],
                ]);
            });
        });
        testing_internal_1.describe('closing tags', function () {
            testing_internal_1.it('should parse closing tags without prefix', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('</test>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, null, 'test'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse closing tags with prefix', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('</ns1:test>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, 'ns1', 'test'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should allow whitespace', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('</ test >')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, null, 'test'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should store the locations', function () {
                testing_internal_1.expect(tokenizeAndHumanizeSourceSpans('</test>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, '</test>'],
                    [html_lexer_1.HtmlTokenType.EOF, ''],
                ]);
            });
            testing_internal_1.it('should report missing name after </', function () {
                testing_internal_1.expect(tokenizeAndHumanizeErrors('</')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, 'Unexpected character "EOF"', '0:2']
                ]);
            });
            testing_internal_1.it('should report missing >', function () {
                testing_internal_1.expect(tokenizeAndHumanizeErrors('</test')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, 'Unexpected character "EOF"', '0:6']
                ]);
            });
        });
        testing_internal_1.describe('entities', function () {
            testing_internal_1.it('should parse named entities', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('a&amp;b')).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, 'a&b'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse hexadecimal entities', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('&#x41;&#X41;')).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, 'AA'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse decimal entities', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('&#65;')).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, 'A'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should store the locations', function () {
                testing_internal_1.expect(tokenizeAndHumanizeSourceSpans('a&amp;b')).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, 'a&amp;b'],
                    [html_lexer_1.HtmlTokenType.EOF, ''],
                ]);
            });
            testing_internal_1.it('should report malformed/unknown entities', function () {
                testing_internal_1.expect(tokenizeAndHumanizeErrors('&tbo;')).toEqual([[
                        html_lexer_1.HtmlTokenType.TEXT,
                        'Unknown entity "tbo" - use the "&#<decimal>;" or  "&#x<hex>;" syntax', '0:0'
                    ]]);
                testing_internal_1.expect(tokenizeAndHumanizeErrors('&#asdf;')).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, 'Unexpected character "s"', '0:3']
                ]);
                testing_internal_1.expect(tokenizeAndHumanizeErrors('&#xasdf;')).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, 'Unexpected character "s"', '0:4']
                ]);
                testing_internal_1.expect(tokenizeAndHumanizeErrors('&#xABC')).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, 'Unexpected character "EOF"', '0:6']
                ]);
            });
        });
        testing_internal_1.describe('regular text', function () {
            testing_internal_1.it('should parse text', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('a')).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, 'a'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse interpolation', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('{{ a }}b{{ c // comment }}')).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, '{{ a }}b{{ c // comment }}'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse interpolation with custom markers', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('{% a %}', null, { start: '{%', end: '%}' })).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, '{% a %}'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should handle CR & LF', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('t\ne\rs\r\nt')).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, 't\ne\ns\nt'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse entities', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('a&amp;b')).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, 'a&b'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse text starting with "&"', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('a && b &')).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, 'a && b &'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should store the locations', function () {
                testing_internal_1.expect(tokenizeAndHumanizeSourceSpans('a')).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, 'a'],
                    [html_lexer_1.HtmlTokenType.EOF, ''],
                ]);
            });
            testing_internal_1.it('should allow "<" in text nodes', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('{{ a < b ? c : d }}')).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, '{{ a < b ? c : d }}'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
                testing_internal_1.expect(tokenizeAndHumanizeSourceSpans('<p>a<b</p>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, '<p'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END, '>'],
                    [html_lexer_1.HtmlTokenType.TEXT, 'a<b'],
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, '</p>'],
                    [html_lexer_1.HtmlTokenType.EOF, ''],
                ]);
                testing_internal_1.expect(tokenizeAndHumanizeParts('< a>')).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, '< a>'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse valid start tag in interpolation', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('{{ a <b && c > d }}')).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, '{{ a '],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 'b'],
                    [html_lexer_1.HtmlTokenType.ATTR_NAME, null, '&&'],
                    [html_lexer_1.HtmlTokenType.ATTR_NAME, null, 'c'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.TEXT, ' d }}'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should be able to escape {', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('{{ "{" }}')).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, '{{ "{" }}'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should be able to escape {{', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('{{ "{{" }}')).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, '{{ "{{" }}'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
        });
        testing_internal_1.describe('raw text', function () {
            testing_internal_1.it('should parse text', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts("<script>t\ne\rs\r\nt</script>")).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 'script'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 't\ne\ns\nt'],
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, null, 'script'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should not detect entities', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts("<script>&amp;</SCRIPT>")).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 'script'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, '&amp;'],
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, null, 'script'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should ignore other opening tags', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts("<script>a<div></script>")).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 'script'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 'a<div>'],
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, null, 'script'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should ignore other closing tags', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts("<script>a</test></script>")).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 'script'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 'a</test>'],
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, null, 'script'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should store the locations', function () {
                testing_internal_1.expect(tokenizeAndHumanizeSourceSpans("<script>a</script>")).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, '<script'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END, '>'],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 'a'],
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, '</script>'],
                    [html_lexer_1.HtmlTokenType.EOF, ''],
                ]);
            });
        });
        testing_internal_1.describe('escapable raw text', function () {
            testing_internal_1.it('should parse text', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts("<title>t\ne\rs\r\nt</title>")).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 'title'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.ESCAPABLE_RAW_TEXT, 't\ne\ns\nt'],
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, null, 'title'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should detect entities', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts("<title>&amp;</title>")).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 'title'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.ESCAPABLE_RAW_TEXT, '&'],
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, null, 'title'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should ignore other opening tags', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts("<title>a<div></title>")).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 'title'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.ESCAPABLE_RAW_TEXT, 'a<div>'],
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, null, 'title'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should ignore other closing tags', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts("<title>a</test></title>")).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 'title'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.ESCAPABLE_RAW_TEXT, 'a</test>'],
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, null, 'title'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should store the locations', function () {
                testing_internal_1.expect(tokenizeAndHumanizeSourceSpans("<title>a</title>")).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, '<title'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END, '>'],
                    [html_lexer_1.HtmlTokenType.ESCAPABLE_RAW_TEXT, 'a'],
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, '</title>'],
                    [html_lexer_1.HtmlTokenType.EOF, ''],
                ]);
            });
        });
        testing_internal_1.describe('expansion forms', function () {
            testing_internal_1.it('should parse an expansion form', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('{one.two, three, =4 {four} =5 {five} foo {bar} }', true))
                    .toEqual([
                    [html_lexer_1.HtmlTokenType.EXPANSION_FORM_START],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 'one.two'],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 'three'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_VALUE, '=4'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START],
                    [html_lexer_1.HtmlTokenType.TEXT, 'four'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_END],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_VALUE, '=5'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START],
                    [html_lexer_1.HtmlTokenType.TEXT, 'five'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_END],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_VALUE, 'foo'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START],
                    [html_lexer_1.HtmlTokenType.TEXT, 'bar'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_END],
                    [html_lexer_1.HtmlTokenType.EXPANSION_FORM_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse an expansion form with text elements surrounding it', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('before{one.two, three, =4 {four}}after', true)).toEqual([
                    [html_lexer_1.HtmlTokenType.TEXT, 'before'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_FORM_START],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 'one.two'],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 'three'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_VALUE, '=4'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START],
                    [html_lexer_1.HtmlTokenType.TEXT, 'four'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_END],
                    [html_lexer_1.HtmlTokenType.EXPANSION_FORM_END],
                    [html_lexer_1.HtmlTokenType.TEXT, 'after'],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse an expansion forms with elements in it', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('{one.two, three, =4 {four <b>a</b>}}', true)).toEqual([
                    [html_lexer_1.HtmlTokenType.EXPANSION_FORM_START],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 'one.two'],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 'three'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_VALUE, '=4'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START],
                    [html_lexer_1.HtmlTokenType.TEXT, 'four '],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, null, 'b'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END],
                    [html_lexer_1.HtmlTokenType.TEXT, 'a'],
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, null, 'b'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_END],
                    [html_lexer_1.HtmlTokenType.EXPANSION_FORM_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse an expansion forms containing an interpolation', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts('{one.two, three, =4 {four {{a}}}}', true)).toEqual([
                    [html_lexer_1.HtmlTokenType.EXPANSION_FORM_START],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 'one.two'],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 'three'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_VALUE, '=4'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START],
                    [html_lexer_1.HtmlTokenType.TEXT, 'four {{a}}'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_END],
                    [html_lexer_1.HtmlTokenType.EXPANSION_FORM_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
            testing_internal_1.it('should parse nested expansion forms', function () {
                testing_internal_1.expect(tokenizeAndHumanizeParts("{one.two, three, =4 { {xx, yy, =x {one}} }}", true))
                    .toEqual([
                    [html_lexer_1.HtmlTokenType.EXPANSION_FORM_START],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 'one.two'],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 'three'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_VALUE, '=4'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START],
                    [html_lexer_1.HtmlTokenType.EXPANSION_FORM_START],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 'xx'],
                    [html_lexer_1.HtmlTokenType.RAW_TEXT, 'yy'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_VALUE, '=x'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START],
                    [html_lexer_1.HtmlTokenType.TEXT, 'one'],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_END],
                    [html_lexer_1.HtmlTokenType.EXPANSION_FORM_END],
                    [html_lexer_1.HtmlTokenType.TEXT, ' '],
                    [html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_END],
                    [html_lexer_1.HtmlTokenType.EXPANSION_FORM_END],
                    [html_lexer_1.HtmlTokenType.EOF],
                ]);
            });
        });
        testing_internal_1.describe('errors', function () {
            testing_internal_1.it('should parse nested expansion forms', function () {
                testing_internal_1.expect(tokenizeAndHumanizeErrors("<p>before { after</p>", true)).toEqual([[
                        html_lexer_1.HtmlTokenType.RAW_TEXT,
                        'Unexpected character "EOF" (Do you have an unescaped "{" in your template?).',
                        '0:21',
                    ]]);
            });
            testing_internal_1.it('should include 2 lines of context in message', function () {
                var src = '111\n222\n333\nE\n444\n555\n666\n';
                var file = new parse_util_1.ParseSourceFile(src, 'file://');
                var location = new parse_util_1.ParseLocation(file, 12, 123, 456);
                var span = new parse_util_1.ParseSourceSpan(location, location);
                var error = new html_lexer_1.HtmlTokenError('**ERROR**', null, span);
                testing_internal_1.expect(error.toString())
                    .toEqual("**ERROR** (\"\n222\n333\n[ERROR ->]E\n444\n555\n\"): file://@123:456");
            });
        });
        testing_internal_1.describe('unicode characters', function () {
            testing_internal_1.it('should support unicode characters', function () {
                testing_internal_1.expect(tokenizeAndHumanizeSourceSpans("<p>\u0130</p>")).toEqual([
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_START, '<p'],
                    [html_lexer_1.HtmlTokenType.TAG_OPEN_END, '>'],
                    [html_lexer_1.HtmlTokenType.TEXT, 'İ'],
                    [html_lexer_1.HtmlTokenType.TAG_CLOSE, '</p>'],
                    [html_lexer_1.HtmlTokenType.EOF, ''],
                ]);
            });
        });
    });
}
exports.main = main;
function tokenizeWithoutErrors(input, tokenizeExpansionForms, interpolationConfig) {
    if (tokenizeExpansionForms === void 0) { tokenizeExpansionForms = false; }
    var tokenizeResult = html_lexer_1.tokenizeHtml(input, 'someUrl', tokenizeExpansionForms, interpolationConfig);
    if (tokenizeResult.errors.length > 0) {
        var errorString = tokenizeResult.errors.join('\n');
        throw new Error("Unexpected parse errors:\n" + errorString);
    }
    return tokenizeResult.tokens;
}
function tokenizeAndHumanizeParts(input, tokenizeExpansionForms, interpolationConfig) {
    if (tokenizeExpansionForms === void 0) { tokenizeExpansionForms = false; }
    return tokenizeWithoutErrors(input, tokenizeExpansionForms, interpolationConfig)
        .map(function (token) { return [token.type].concat(token.parts); });
}
function tokenizeAndHumanizeSourceSpans(input) {
    return tokenizeWithoutErrors(input).map(function (token) { return [token.type, token.sourceSpan.toString()]; });
}
function humanizeLineColumn(location) {
    return location.line + ":" + location.col;
}
function tokenizeAndHumanizeLineColumn(input) {
    return tokenizeWithoutErrors(input).map(function (token) { return [token.type, humanizeLineColumn(token.sourceSpan.start)]; });
}
function tokenizeAndHumanizeErrors(input, tokenizeExpansionForms) {
    if (tokenizeExpansionForms === void 0) { tokenizeExpansionForms = false; }
    return html_lexer_1.tokenizeHtml(input, 'someUrl', tokenizeExpansionForms)
        .errors.map(function (e) { return [e.tokenType, e.msg, humanizeLineColumn(e.span.start)]; });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbF9sZXhlcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci90ZXN0L2h0bWxfbGV4ZXJfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsMkJBQXFFLGtDQUFrQyxDQUFDLENBQUE7QUFFeEcsMkJBQThELGtDQUFrQyxDQUFDLENBQUE7QUFDakcsaUNBQStFLHdDQUF3QyxDQUFDLENBQUE7QUFFeEg7SUFDRSwyQkFBUSxDQUFDLFdBQVcsRUFBRTtRQUNwQiwyQkFBUSxDQUFDLHFCQUFxQixFQUFFO1lBQzlCLHFCQUFFLENBQUMsOEJBQThCLEVBQUU7Z0JBQ2pDLHlCQUFNLENBQUMsNkJBQTZCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7b0JBQ3hELENBQUMsMEJBQWEsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDO29CQUNyQyxDQUFDLDBCQUFhLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQztvQkFDbkMsQ0FBQywwQkFBYSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7b0JBQzNCLENBQUMsMEJBQWEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO29CQUNoQyxDQUFDLDBCQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQztpQkFDM0IsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBRSxDQUFDLDhCQUE4QixFQUFFO2dCQUNqQyx5QkFBTSxDQUFDLDZCQUE2QixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO29CQUMxRCxDQUFDLDBCQUFhLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQztvQkFDckMsQ0FBQywwQkFBYSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUM7b0JBQ25DLENBQUMsMEJBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO29CQUMzQixDQUFDLDBCQUFh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