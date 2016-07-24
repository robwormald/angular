/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var html_parser_1 = require('@angular/compiler/src/html_parser');
var dom_element_schema_registry_1 = require('@angular/compiler/src/schema/dom_element_schema_registry');
var core_1 = require('@angular/core');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
var schema_extractor_1 = require('./schema_extractor');
function main() {
    testing_internal_1.describe('DOMElementSchema', function () {
        var registry;
        testing_internal_1.beforeEach(function () { registry = new dom_element_schema_registry_1.DomElementSchemaRegistry(); });
        testing_internal_1.it('should detect properties on regular elements', function () {
            testing_internal_1.expect(registry.hasProperty('div', 'id')).toBeTruthy();
            testing_internal_1.expect(registry.hasProperty('div', 'title')).toBeTruthy();
            testing_internal_1.expect(registry.hasProperty('h1', 'align')).toBeTruthy();
            testing_internal_1.expect(registry.hasProperty('h2', 'align')).toBeTruthy();
            testing_internal_1.expect(registry.hasProperty('h3', 'align')).toBeTruthy();
            testing_internal_1.expect(registry.hasProperty('h4', 'align')).toBeTruthy();
            testing_internal_1.expect(registry.hasProperty('h5', 'align')).toBeTruthy();
            testing_internal_1.expect(registry.hasProperty('h6', 'align')).toBeTruthy();
            testing_internal_1.expect(registry.hasProperty('h7', 'align')).toBeFalsy();
            testing_internal_1.expect(registry.hasProperty('textarea', 'disabled')).toBeTruthy();
            testing_internal_1.expect(registry.hasProperty('input', 'disabled')).toBeTruthy();
            testing_internal_1.expect(registry.hasProperty('div', 'unknown')).toBeFalsy();
        });
        testing_internal_1.it('should detect different kinds of types', function () {
            // inheritance: video => media => *
            testing_internal_1.expect(registry.hasProperty('video', 'className')).toBeTruthy(); // from *
            testing_internal_1.expect(registry.hasProperty('video', 'id')).toBeTruthy(); // string
            testing_internal_1.expect(registry.hasProperty('video', 'scrollLeft')).toBeTruthy(); // number
            testing_internal_1.expect(registry.hasProperty('video', 'height')).toBeTruthy(); // number
            testing_internal_1.expect(registry.hasProperty('video', 'autoplay')).toBeTruthy(); // boolean
            testing_internal_1.expect(registry.hasProperty('video', 'classList')).toBeTruthy(); // object
            // from *; but events are not properties
            testing_internal_1.expect(registry.hasProperty('video', 'click')).toBeFalsy();
        });
        testing_internal_1.it('should return true for custom-like elements', function () { testing_internal_1.expect(registry.hasProperty('custom-like', 'unknown')).toBeTruthy(); });
        testing_internal_1.it('should re-map property names that are specified in DOM facade', function () { testing_internal_1.expect(registry.getMappedPropName('readonly')).toEqual('readOnly'); });
        testing_internal_1.it('should not re-map property names that are not specified in DOM facade', function () {
            testing_internal_1.expect(registry.getMappedPropName('title')).toEqual('title');
            testing_internal_1.expect(registry.getMappedPropName('exotic-unknown')).toEqual('exotic-unknown');
        });
        testing_internal_1.it('should return security contexts for elements', function () {
            testing_internal_1.expect(registry.securityContext('iframe', 'srcdoc')).toBe(core_1.SecurityContext.HTML);
            testing_internal_1.expect(registry.securityContext('p', 'innerHTML')).toBe(core_1.SecurityContext.HTML);
            testing_internal_1.expect(registry.securityContext('a', 'href')).toBe(core_1.SecurityContext.URL);
            testing_internal_1.expect(registry.securityContext('a', 'style')).toBe(core_1.SecurityContext.STYLE);
            testing_internal_1.expect(registry.securityContext('ins', 'cite')).toBe(core_1.SecurityContext.URL);
            testing_internal_1.expect(registry.securityContext('base', 'href')).toBe(core_1.SecurityContext.RESOURCE_URL);
        });
        testing_internal_1.it('should detect properties on namespaced elements', function () {
            var htmlAst = new html_parser_1.HtmlParser().parse('<svg:style>', 'TestComp');
            var nodeName = htmlAst.rootNodes[0].name;
            testing_internal_1.expect(registry.hasProperty(nodeName, 'type')).toBeTruthy();
        });
        testing_internal_1.it('should check security contexts case insensitive', function () {
            testing_internal_1.expect(registry.securityContext('p', 'iNnErHtMl')).toBe(core_1.SecurityContext.HTML);
            testing_internal_1.expect(registry.securityContext('p', 'formaction')).toBe(core_1.SecurityContext.URL);
            testing_internal_1.expect(registry.securityContext('p', 'formAction')).toBe(core_1.SecurityContext.URL);
        });
        testing_internal_1.describe('Angular custom elements', function () {
            testing_internal_1.it('should support <ng-container>', function () { testing_internal_1.expect(registry.hasProperty('ng-container', 'id')).toBeFalsy(); });
            testing_internal_1.it('should support <ng-content>', function () {
                testing_internal_1.expect(registry.hasProperty('ng-content', 'id')).toBeFalsy();
                testing_internal_1.expect(registry.hasProperty('ng-content', 'select')).toBeFalsy();
            });
        });
        if (browser_util_1.browserDetection.isChromeDesktop) {
            testing_internal_1.it('generate a new schema', function () {
                var schema = '\n';
                schema_extractor_1.extractSchema().forEach(function (props, name) { schema += "'" + name + "|" + props.join(',') + "',\n"; });
                // Uncomment this line to see:
                // the generated schema which can then be pasted to the DomElementSchemaRegistry
                // console.log(schema);
            });
        }
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX2VsZW1lbnRfc2NoZW1hX3JlZ2lzdHJ5X3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3Rlc3Qvc2NoZW1hL2RvbV9lbGVtZW50X3NjaGVtYV9yZWdpc3RyeV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFHSCw0QkFBeUIsbUNBQW1DLENBQUMsQ0FBQTtBQUM3RCw0Q0FBdUMsMERBQTBELENBQUMsQ0FBQTtBQUNsRyxxQkFBOEIsZUFBZSxDQUFDLENBQUE7QUFDOUMsaUNBQXVGLHdDQUF3QyxDQUFDLENBQUE7QUFDaEksNkJBQStCLGdEQUFnRCxDQUFDLENBQUE7QUFFaEYsaUNBQTRCLG9CQUFvQixDQUFDLENBQUE7QUFFakQ7SUFDRSwyQkFBUSxDQUFDLGtCQUFrQixFQUFFO1FBQzNCLElBQUksUUFBa0MsQ0FBQztRQUN2Qyw2QkFBVSxDQUFDLGNBQVEsUUFBUSxHQUFHLElBQUksc0RBQXdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpFLHFCQUFFLENBQUMsOENBQThDLEVBQUU7WUFDakQseUJBQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3ZELHlCQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUMxRCx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDekQseUJBQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3pELHlCQUFNLENBQUMs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