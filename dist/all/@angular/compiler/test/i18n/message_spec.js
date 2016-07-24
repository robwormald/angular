/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var message_1 = require('@angular/compiler/src/i18n/message');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
function main() {
    testing_internal_1.describe('Message', function () {
        testing_internal_1.describe('id', function () {
            testing_internal_1.it('should return a different id for messages with and without the meaning', function () {
                var m1 = new message_1.Message('content', 'meaning', null);
                var m2 = new message_1.Message('content', null, null);
                testing_internal_1.expect(message_1.id(m1)).toEqual(message_1.id(m1));
                testing_internal_1.expect(message_1.id(m1)).not.toEqual(message_1.id(m2));
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci90ZXN0L2kxOG4vbWVzc2FnZV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx3QkFBMEIsb0NBQW9DLENBQUMsQ0FBQTtBQUMvRCxpQ0FBdUYsd0NBQXdDLENBQUMsQ0FBQTtBQUVoSTtJQUNFLDJCQUFRLENBQUMsU0FBUyxFQUFFO1FBQ2xCLDJCQUFRLENBQUMsSUFBSSxFQUFFO1lBQ2IscUJBQUUsQ0FBQyx3RUFBd0UsRUFBRTtnQkFDM0UsSUFBSSxFQUFFLEdBQUcsSUFBSSxpQkFBTyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2pELElBQUksRUFBRSxHQUFHLElBQUksaUJBQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM1Qyx5QkFBTSxDQUFDLFlBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDL0IseUJBQU0sQ0FBQyxZQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFYZSxZQUFJLE9BV25CLENBQUEifQ==