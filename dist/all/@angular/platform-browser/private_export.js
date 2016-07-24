/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var browser = require('./src/browser');
var ng_proble = require('./src/dom/debug/ng_probe');
var dom_adapter = require('./src/dom/dom_adapter');
var dom_renderer = require('./src/dom/dom_renderer');
var dom_events = require('./src/dom/events/dom_events');
var shared_styles_host = require('./src/dom/shared_styles_host');
exports.__platform_browser_private__ = {
    DomAdapter: dom_adapter.DomAdapter,
    getDOM: dom_adapter.getDOM,
    setRootDomAdapter: dom_adapter.setRootDomAdapter,
    DomRootRenderer: dom_renderer.DomRootRenderer,
    DomRootRenderer_: dom_renderer.DomRootRenderer_,
    DomSharedStylesHost: shared_styles_host.DomSharedStylesHost,
    SharedStylesHost: shared_styles_host.SharedStylesHost,
    ELEMENT_PROBE_PROVIDERS: ng_proble.ELEMENT_PROBE_PROVIDERS,
    DomEventsPlugin: dom_events.DomEventsPlugin,
    initDomAdapter: browser.initDomAdapter
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9leHBvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvcHJpdmF0ZV9leHBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILElBQVksT0FBTyxXQUFNLGVBQWUsQ0FBQyxDQUFBO0FBQ3pDLElBQVksU0FBUyxXQUFNLDBCQUEwQixDQUFDLENBQUE7QUFDdEQsSUFBWSxXQUFXLFdBQU0sdUJBQXVCLENBQUMsQ0FBQTtBQUNyRCxJQUFZLFlBQVksV0FBTSx3QkFBd0IsQ0FBQyxDQUFBO0FBQ3ZELElBQVksVUFBVSxXQUFNLDZCQUE2QixDQUFDLENBQUE7QUFDMUQsSUFBWSxrQkFBa0IsV0FBTSw4QkFBOEIsQ0FBQyxDQUFBO0FBcUJ4RCxvQ0FBNEIsR0FBRztJQUN4QyxVQUFVLEVBQUUsV0FBVyxDQUFDLFVBQVU7SUFDbEMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNO0lBQzFCLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxpQkFBaUI7SUFDaEQsZUFBZSxFQUFFLFlBQVksQ0FBQyxlQUFlO0lBQzdDLGdCQUFnQixFQUFFLFlBQVksQ0FBQyxnQkFBZ0I7SUFDL0MsbUJBQW1CLEVBQUUsa0JBQWtCLENBQUMsbUJBQW1CO0lBQzNELGdCQUFnQixFQUFFLGtCQUFrQixDQUFDLGdCQUFnQjtJQUNyRCx1QkFBdUIsRUFBRSxTQUFTLENBQUMsdUJBQXVCO0lBQzFELGVBQWUsRUFBRSxVQUFVLENBQUMsZUFBZTtJQUMzQyxjQUFjLEVBQUUsT0FBTyxDQUFDLGNBQWM7Q0FDdkMsQ0FBQyJ9