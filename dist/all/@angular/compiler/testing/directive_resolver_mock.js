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
var core_1 = require('@angular/core');
var directive_resolver_1 = require('../src/directive_resolver');
var collection_1 = require('../src/facade/collection');
var lang_1 = require('../src/facade/lang');
var MockDirectiveResolver = (function (_super) {
    __extends(MockDirectiveResolver, _super);
    function MockDirectiveResolver(_injector) {
        _super.call(this);
        this._injector = _injector;
        this._providerOverrides = new collection_1.Map();
        this.viewProviderOverrides = new collection_1.Map();
    }
    Object.defineProperty(MockDirectiveResolver.prototype, "_compiler", {
        get: function () { return this._injector.get(core_1.Compiler); },
        enumerable: true,
        configurable: true
    });
    MockDirectiveResolver.prototype.resolve = function (type, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        var dm = _super.prototype.resolve.call(this, type, throwIfNotFound);
        if (!dm) {
            return null;
        }
        var providerOverrides = this._providerOverrides.get(type);
        var viewProviderOverrides = this.viewProviderOverrides.get(type);
        var providers = dm.providers;
        if (lang_1.isPresent(providerOverrides)) {
            var originalViewProviders = lang_1.isPresent(dm.providers) ? dm.providers : [];
            providers = originalViewProviders.concat(providerOverrides);
        }
        if (dm instanceof core_1.ComponentMetadata) {
            var viewProviders = dm.viewProviders;
            if (lang_1.isPresent(viewProviderOverrides)) {
                var originalViewProviders = lang_1.isPresent(dm.viewProviders) ? dm.viewProviders : [];
                viewProviders = originalViewProviders.concat(viewProviderOverrides);
            }
            return new core_1.ComponentMetadata({
                selector: dm.selector,
                inputs: dm.inputs,
                outputs: dm.outputs,
                host: dm.host,
                exportAs: dm.exportAs,
                moduleId: dm.moduleId,
                queries: dm.queries,
                changeDetection: dm.changeDetection,
                providers: providers,
                viewProviders: viewProviders,
                precompile: dm.precompile
            });
        }
        return new core_1.DirectiveMetadata({
            selector: dm.selector,
            inputs: dm.inputs,
            outputs: dm.outputs,
            host: dm.host,
            providers: providers,
            exportAs: dm.exportAs,
            queries: dm.queries
        });
    };
    MockDirectiveResolver.prototype.setProvidersOverride = function (type, providers) {
        this._providerOverrides.set(type, providers);
        this._compiler.clearCacheFor(type);
    };
    MockDirectiveResolver.prototype.setViewProvidersOverride = function (type, viewProviders) {
        this.viewProviderOverrides.set(type, viewProviders);
        this._compiler.clearCacheFor(type);
    };
    /** @nocollapse */
    MockDirectiveResolver.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MockDirectiveResolver.ctorParameters = [
        { type: core_1.Injector, },
    ];
    return MockDirectiveResolver;
}(directive_resolver_1.DirectiveResolver));
exports.MockDirectiveResolver = MockDirectiveResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlX3Jlc29sdmVyX21vY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3Rlc3RpbmcvZGlyZWN0aXZlX3Jlc29sdmVyX21vY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgscUJBQW1GLGVBQWUsQ0FBQyxDQUFBO0FBRW5HLG1DQUFnQywyQkFBMkIsQ0FBQyxDQUFBO0FBQzVELDJCQUFrQiwwQkFBMEIsQ0FBQyxDQUFBO0FBQzdDLHFCQUE4QixvQkFBb0IsQ0FBQyxDQUFBO0FBQ25EO0lBQTJDLHlDQUFpQjtJQUkxRCwrQkFBb0IsU0FBbUI7UUFBSSxpQkFBTyxDQUFDO1FBQS9CLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFIL0IsdUJBQWtCLEdBQUcsSUFBSSxnQkFBRyxFQUFlLENBQUM7UUFDNUMsMEJBQXFCLEdBQUcsSUFBSSxnQkFBRyxFQUFlLENBQUM7SUFFSCxDQUFDO0lBRXJELHNCQUFZLDRDQUFTO2FBQXJCLGNBQW9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRTFFLHVDQUFPLEdBQVAsVUFBUSxJQUFVLEVBQUUsZUFBc0I7UUFBdEIsK0JBQXNCLEdBQXRCLHNCQUFzQjtRQUN4QyxJQUFJLEVBQUUsR0FBRyxnQkFBSyxDQUFDLE9BQU8sWUFBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDOUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBSSxxQkFBcUIsR0FBRyxJQUFJLENBQUMs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