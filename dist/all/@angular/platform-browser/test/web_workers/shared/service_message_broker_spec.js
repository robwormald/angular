/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
var web_worker_test_util_1 = require('./web_worker_test_util');
var serializer_1 = require('@angular/platform-browser/src/web_workers/shared/serializer');
var service_message_broker_1 = require('@angular/platform-browser/src/web_workers/shared/service_message_broker');
var async_1 = require('../../../src/facade/async');
var api_1 = require('@angular/platform-browser/src/web_workers/shared/api');
var render_store_1 = require('@angular/platform-browser/src/web_workers/shared/render_store');
function main() {
    var CHANNEL = 'UIMessageBroker Test Channel';
    var TEST_METHOD = 'TEST_METHOD';
    var PASSED_ARG_1 = 5;
    var PASSED_ARG_2 = 'TEST';
    var RESULT = 20;
    var ID = 'methodId';
    testing_internal_1.beforeEachProviders(function () { return [serializer_1.Serializer, { provide: api_1.ON_WEB_WORKER, useValue: true }, render_store_1.RenderStore]; });
    testing_internal_1.describe('UIMessageBroker', function () {
        var messageBuses;
        testing_internal_1.beforeEach(function () {
            messageBuses = web_worker_test_util_1.createPairedMessageBuses();
            messageBuses.ui.initChannel(CHANNEL);
            messageBuses.worker.initChannel(CHANNEL);
        });
        testing_internal_1.it('should call registered method with correct arguments', testing_internal_1.inject([serializer_1.Serializer], function (serializer) {
            var broker = new service_message_broker_1.ServiceMessageBroker_(messageBuses.ui, serializer, CHANNEL);
            broker.registerMethod(TEST_METHOD, [serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], function (arg1, arg2) {
                testing_internal_1.expect(arg1).toEqual(PASSED_ARG_1);
                testing_internal_1.expect(arg2).toEqual(PASSED_ARG_2);
            });
            async_1.ObservableWrapper.callEmit(messageBuses.worker.to(CHANNEL), { 'method': TEST_METHOD, 'args': [PASSED_ARG_1, PASSED_ARG_2] });
        }));
        // TODO(pkozlowski): this fails only in Edge with
        //   "No provider for RenderStore! (Serializer -> RenderStore)"
        if (!browser_util_1.browserDetection.isEdge) {
            testing_internal_1.it('should return promises to the worker', testing_internal_1.inject([serializer_1.Serializer], function (serializer) {
                var broker = new service_message_broker_1.ServiceMessageBroker_(messageBuses.ui, serializer, CHANNEL);
                broker.registerMethod(TEST_METHOD, [serializer_1.PRIMITIVE], function (arg1) {
                    testing_internal_1.expect(arg1).toEqual(PASSED_ARG_1);
                    return async_1.PromiseWrapper.wrap(function () { return RESULT; });
                });
                async_1.ObservableWrapper.callEmit(messageBuses.worker.to(CHANNEL), { 'method': TEST_METHOD, 'id': ID, 'args': [PASSED_ARG_1] });
                async_1.ObservableWrapper.subscribe(messageBuses.worker.from(CHANNEL), function (data) {
                    testing_internal_1.expect(data.type).toEqual('result');
                    testing_internal_1.expect(data.id).toEqual(ID);
                    testing_internal_1.expect(data.value).toEqual(RESULT);
                });
            }));
        }
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZV9tZXNzYWdlX2Jyb2tlcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL3Rlc3Qvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXJfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQWtGLHdDQUF3QyxDQUFDLENBQUE7QUFDM0gsNkJBQStCLGdEQUFnRCxDQUFDLENBQUE7QUFDaEYscUNBQXVDLHdCQUF3QixDQUFDLENBQUE7QUFDaEUsMkJBQW9DLDZEQUE2RCxDQUFDLENBQUE7QUFDbEcsdUNBQTBELHlFQUF5RSxDQUFDLENBQUE7QUFDcEksc0JBQWdELDJCQUEyQixDQUFDLENBQUE7QUFFNUUsb0JBQTRCLHNEQUFzRCxDQUFDLENBQUE7QUFDbkYsNkJBQTBCLCtEQUErRCxDQUFDLENBQUE7QUFFMUY7SUFDRSxJQUFNLE9BQU8sR0FBRyw4QkFBOEIsQ0FBQztJQUMvQyxJQUFNLFdBQVcsR0FBRyxhQUFhLENBQUM7SUFDbEMsSUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLElBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQztJQUM1QixJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDbEIsSUFBTSxFQUFFLEdBQUcsVUFBVSxDQUFDO0lBRXRCLHNDQUFtQixDQUFDLGNBQU0sT0FBQSxDQUFDLHVCQUFVLEVBQUUsRUFBQyxPQUFPLEVBQUUsbUJBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLEVBQUUsMEJBQVcsQ0FBQyxFQUFuRSxDQUFtRSxDQUFDLENBQUM7SUFFL0YsMkJBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQixJQUFJLFlBQWlCLENBQW1CO1FBRXhDLDZCQUFVLENBQUM7WUFDVCxZQUFZLEdBQUcsK0NBQXdCLEVBQUUsQ0FBQztZQUMxQyxZ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