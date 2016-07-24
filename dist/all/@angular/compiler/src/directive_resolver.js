/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var core_private_1 = require('../core_private');
var collection_1 = require('./facade/collection');
var exceptions_1 = require('./facade/exceptions');
var lang_1 = require('./facade/lang');
var util_1 = require('./util');
function _isDirectiveMetadata(type) {
    return type instanceof core_1.DirectiveMetadata;
}
var DirectiveResolver = (function () {
    function DirectiveResolver(_reflector) {
        if (_reflector === void 0) { _reflector = core_private_1.reflector; }
        this._reflector = _reflector;
    }
    /**
     * Return {@link DirectiveMetadata} for a given `Type`.
     */
    DirectiveResolver.prototype.resolve = function (type, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        var typeMetadata = this._reflector.annotations(core_1.resolveForwardRef(type));
        if (lang_1.isPresent(typeMetadata)) {
            var metadata = typeMetadata.find(_isDirectiveMetadata);
            if (lang_1.isPresent(metadata)) {
                var propertyMetadata = this._reflector.propMetadata(type);
                return this._mergeWithPropertyMetadata(metadata, propertyMetadata, type);
            }
        }
        if (throwIfNotFound) {
            throw new exceptions_1.BaseException("No Directive annotation found on " + lang_1.stringify(type));
        }
        return null;
    };
    DirectiveResolver.prototype._mergeWithPropertyMetadata = function (dm, propertyMetadata, directiveType) {
        var inputs = [];
        var outputs = [];
        var host = {};
        var queries = {};
        collection_1.StringMapWrapper.forEach(propertyMetadata, function (metadata, propName) {
            metadata.forEach(function (a) {
                if (a instanceof core_1.InputMetadata) {
                    if (lang_1.isPresent(a.bindingPropertyName)) {
                        inputs.push(propName + ": " + a.bindingPropertyName);
                    }
                    else {
                        inputs.push(propName);
                    }
                }
                else if (a instanceof core_1.OutputMetadata) {
                    if (lang_1.isPresent(a.bindingPropertyName)) {
                        outputs.push(propName + ": " + a.bindingPropertyName);
                    }
                    else {
                        outputs.push(propName);
                    }
                }
                else if (a instanceof core_1.HostBindingMetadata) {
                    if (lang_1.isPresent(a.hostPropertyName)) {
                        host[("[" + a.hostPropertyName + "]")] = propName;
                    }
                    else {
                        host[("[" + propName + "]")] = propName;
                    }
                }
                else if (a instanceof core_1.HostListenerMetadata) {
                    var args = lang_1.isPresent(a.args) ? a.args.join(', ') : '';
                    host[("(" + a.eventName + ")")] = propName + "(" + args + ")";
                }
                else if (a instanceof core_1.QueryMetadata) {
                    queries[propName] = a;
                }
            });
        });
        return this._merge(dm, inputs, outputs, host, queries, directiveType);
    };
    DirectiveResolver.prototype._extractPublicName = function (def) { return util_1.splitAtColon(def, [null, def])[1].trim(); };
    DirectiveResolver.prototype._merge = function (dm, inputs, outputs, host, queries, directiveType) {
        var _this = this;
        var mergedInputs;
        if (lang_1.isPresent(dm.inputs)) {
            var inputNames_1 = dm.inputs.map(function (def) { return _this._extractPublicName(def); });
            inputs.forEach(function (inputDef) {
                var publicName = _this._extractPublicName(inputDef);
                if (inputNames_1.indexOf(publicName) > -1) {
                    throw new exceptions_1.BaseException("Input '" + publicName + "' defined multiple times in '" + lang_1.stringify(directiveType) + "'");
                }
            });
            mergedInputs = dm.inputs.concat(inputs);
        }
        else {
            mergedInputs = inputs;
        }
        var mergedOutputs;
        if (lang_1.isPresent(dm.outputs)) {
            var outputNames_1 = dm.outputs.map(function (def) { return _this._extractPublicName(def); });
            outputs.forEach(function (outputDef) {
                var publicName = _this._extractPublicName(outputDef);
                if (outputNames_1.indexOf(publicName) > -1) {
                    throw new exceptions_1.BaseException("Output event '" + publicName + "' defined multiple times in '" + lang_1.stringify(directiveType) + "'");
                }
            });
            mergedOutputs = dm.outputs.concat(outputs);
        }
        else {
            mergedOutputs = outputs;
        }
        var mergedHost = lang_1.isPresent(dm.host) ? collection_1.StringMapWrapper.merge(dm.host, host) : host;
        var mergedQueries = lang_1.isPresent(dm.queries) ? collection_1.StringMapWrapper.merge(dm.queries, queries) : queries;
        if (dm instanceof core_1.ComponentMetadata) {
            return new core_1.ComponentMetadata({
                selector: dm.selector,
                inputs: mergedInputs,
                outputs: mergedOutputs,
                host: mergedHost,
                exportAs: dm.exportAs,
                moduleId: dm.moduleId,
                queries: mergedQueries,
                changeDetection: dm.changeDetection,
                providers: dm.providers,
                viewProviders: dm.viewProviders,
                precompile: dm.precompile
            });
        }
        else {
            return new core_1.DirectiveMetadata({
                selector: dm.selector,
                inputs: mergedInputs,
                outputs: mergedOutputs,
                host: mergedHost,
                exportAs: dm.exportAs,
                queries: mergedQueries,
                providers: dm.providers
            });
        }
    };
    /** @nocollapse */
    DirectiveResolver.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DirectiveResolver.ctorParameters = [
        { type: core_private_1.ReflectorReader, },
    ];
    return DirectiveResolver;
}());
exports.DirectiveResolver = DirectiveResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlX3Jlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci9zcmMvZGlyZWN0aXZlX3Jlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBMkssZUFBZSxDQUFDLENBQUE7QUFFM0wsNkJBQXlDLGlCQUFpQixDQUFDLENBQUE7QUFFM0QsMkJBQStCLHFCQUFxQixDQUFDLENBQUE7QUFDckQsMkJBQTRCLHFCQUFxQixDQUFDLENBQUE7QUFDbEQscUJBQXlDLGVBQWUsQ0FBQyxDQUFBO0FBQ3pELHFCQUEyQixRQUFRLENBQUMsQ0FBQTtBQUVwQyw4QkFBOEIsSUFBUztJQUNyQyxNQUFNLENBQUMsSUFBSSxZQUFZLHdCQUFpQixDQUFDO0FBQzNDLENBQUM7QUFDRDtJQUNFLDJCQUFvQixVQUF1QztRQUEvQywwQkFBK0MsR0FBL0MscUNBQStDO1FBQXZDLGVBQVUsR0FBVixVQUFVLENBQTZCO0lBQUcsQ0FBQztJQUUvRDs7T0FFRztJQUNILG1DQUFPLEdBQVAsVUFBUSxJQUFVLEVBQUUsZUFBc0I7UUFBdEIsK0JBQXNCLEdBQXRCLHNCQUFzQjtRQUN4QyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyx3QkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksUUFBUSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUN2RCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMs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