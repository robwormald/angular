/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var base_request_options_1 = require('../src/base_request_options');
var enums_1 = require('../src/enums');
var headers_1 = require('../src/headers');
var static_request_1 = require('../src/static_request');
function main() {
    testing_internal_1.describe('Request', function () {
        testing_internal_1.describe('detectContentType', function () {
            testing_internal_1.it('should return ContentType.NONE', function () {
                var req = new static_request_1.Request(new base_request_options_1.RequestOptions({ url: 'test', method: 'GET', body: null }));
                testing_internal_1.expect(req.detectContentType()).toEqual(enums_1.ContentType.NONE);
            });
            testing_internal_1.it('should return ContentType.JSON', function () {
                var req = new static_request_1.Request(new base_request_options_1.RequestOptions({
                    url: 'test',
                    method: 'GET',
                    body: null,
                    headers: new headers_1.Headers({ 'content-type': 'application/json' })
                }));
                testing_internal_1.expect(req.detectContentType()).toEqual(enums_1.ContentType.JSON);
            });
            testing_internal_1.it('should return ContentType.FORM', function () {
                var req = new static_request_1.Request(new base_request_options_1.RequestOptions({
                    url: 'test',
                    method: 'GET',
                    body: null,
                    headers: new headers_1.Headers({ 'content-type': 'application/x-www-form-urlencoded' })
                }));
                testing_internal_1.expect(req.detectContentType()).toEqual(enums_1.ContentType.FORM);
            });
            testing_internal_1.it('should return ContentType.FORM_DATA', function () {
                var req = new static_request_1.Request(new base_request_options_1.RequestOptions({
                    url: 'test',
                    method: 'GET',
                    body: null,
                    headers: new headers_1.Headers({ 'content-type': 'multipart/form-data' })
                }));
                testing_internal_1.expect(req.detectContentType()).toEqual(enums_1.ContentType.FORM_DATA);
            });
            testing_internal_1.it('should return ContentType.TEXT', function () {
                var req = new static_request_1.Request(new base_request_options_1.RequestOptions({
                    url: 'test',
                    method: 'GET',
                    body: null,
                    headers: new headers_1.Headers({ 'content-type': 'text/plain' })
                }));
                testing_internal_1.expect(req.detectContentType()).toEqual(enums_1.ContentType.TEXT);
            });
            testing_internal_1.it('should return ContentType.BLOB', function () {
                var req = new static_request_1.Request(new base_request_options_1.RequestOptions({
                    url: 'test',
                    method: 'GET',
                    body: null,
                    headers: new headers_1.Headers({ 'content-type': 'application/octet-stream' })
                }));
                testing_internal_1.expect(req.detectContentType()).toEqual(enums_1.ContentType.BLOB);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljX3JlcXVlc3Rfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvaHR0cC90ZXN0L3N0YXRpY19yZXF1ZXN0X3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUFtQyx3Q0FBd0MsQ0FBQyxDQUFBO0FBRTVFLHFDQUE2Qiw2QkFBNkIsQ0FBQyxDQUFBO0FBQzNELHNCQUEwQixjQUFjLENBQUMsQ0FBQTtBQUN6Qyx3QkFBc0IsZ0JBQWdCLENBQUMsQ0FBQTtBQUN2QywrQkFBc0IsdUJBQXVCLENBQUMsQ0FBQTtBQUU5QztJQUNFLDJCQUFRLENBQUMsU0FBUyxFQUFFO1FBQ2xCLDJCQUFRLENBQUMsbUJBQW1CLEVBQUU7WUFDNUIscUJBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtnQkFDbkMsSUFBTSxHQUFHLEdBQUcsSUFBSSx3QkFBTyxDQUFDLElBQUkscUNBQWMsQ0FBQyxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV0Rix5QkFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLG1CQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUQsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBRSxDQUFDLGdDQUFnQyxFQUFFO2dCQUNuQyxJQUFNLEdBQUcsR0FBRyxJQUFJLHdCQUFPLENBQUMsSUFBSSxxQ0FBYyxDQUFDO29CQUN6QyxHQUFHLEVBQUUsTUFBTTtvQkFDWCxNQUFNLEVBQUUsS0FBSztvQkFDYixJQUFJLEVBQUUsSUFBSTtvQkFDVixPQUFPLEVBQUUsSUFBSSxpQkFBTyxDQUFDLEVBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFDLENBQUM7aUJBQzNELENBQUMsQ0FBQyxDQUFDO2dCQUVKLHlCQUFN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