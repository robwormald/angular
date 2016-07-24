/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var lang_1 = require('../src/facade/lang');
var MockSchemaRegistry = (function () {
    function MockSchemaRegistry(existingProperties, attrPropMapping) {
        this.existingProperties = existingProperties;
        this.attrPropMapping = attrPropMapping;
    }
    MockSchemaRegistry.prototype.hasProperty = function (tagName, property) {
        var result = this.existingProperties[property];
        return lang_1.isPresent(result) ? result : true;
    };
    MockSchemaRegistry.prototype.securityContext = function (tagName, property) {
        return core_1.SecurityContext.NONE;
    };
    MockSchemaRegistry.prototype.getMappedPropName = function (attrName) {
        var result = this.attrPropMapping[attrName];
        return lang_1.isPresent(result) ? result : attrName;
    };
    return MockSchemaRegistry;
}());
exports.MockSchemaRegistry = MockSchemaRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hX3JlZ2lzdHJ5X21vY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3Rlc3Rpbmcvc2NoZW1hX3JlZ2lzdHJ5X21vY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUE4QixlQUFlLENBQUMsQ0FBQTtBQUU5QyxxQkFBd0Isb0JBQW9CLENBQUMsQ0FBQTtBQUU3QztJQUNFLDRCQUNXLGtCQUE0QyxFQUM1QyxlQUF3QztRQUR4Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQTBCO1FBQzVDLG9CQUFlLEdBQWYsZUFBZSxDQUF5QjtJQUFHLENBQUM7SUFFdkQsd0NBQVcsR0FBWCxVQUFZLE9BQWUsRUFBRSxRQUFnQjtRQUMzQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLGdCQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQztJQUMzQyxDQUFDO0lBRUQsNENBQWUsR0FBZixVQUFnQixPQUFlLEVBQUUsUUFBZ0I7UUFDL0MsTUFBTSxDQUFDLHNCQUFlLENBQUMsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFFRCw4Q0FBaUIsR0FBakIsVUFBa0IsUUFBZ0I7UUFDaEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLEdBQUcsUUFBUSxDQUFDO0lBQy9DLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFsQkQsSUFrQkM7QUFsQlksMEJBQWtCLHFCQWtCOUIsQ0FBQSJ9