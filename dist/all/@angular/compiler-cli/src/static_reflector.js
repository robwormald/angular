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
var SUPPORTED_SCHEMA_VERSION = 1;
/**
 * A token representing the a reference to a static type.
 *
 * This token is unique for a filePath and name and can be used as a hash table key.
 */
var StaticSymbol = (function () {
    function StaticSymbol(filePath, name) {
        this.filePath = filePath;
        this.name = name;
    }
    return StaticSymbol;
}());
exports.StaticSymbol = StaticSymbol;
/**
 * A static reflector implements enough of the Reflector API that is necessary to compile
 * templates statically.
 */
var StaticReflector = (function () {
    function StaticReflector(host) {
        this.host = host;
        this.annotationCache = new Map();
        this.propertyCache = new Map();
        this.parameterCache = new Map();
        this.metadataCache = new Map();
        this.conversionMap = new Map();
        this.initializeConversionMap();
    }
    StaticReflector.prototype.importUri = function (typeOrFunc) {
        var staticSymbol = this.host.findDeclaration(typeOrFunc.filePath, typeOrFunc.name, '');
        return staticSymbol ? staticSymbol.filePath : null;
    };
    StaticReflector.prototype.annotations = function (type) {
        var annotations = this.annotationCache.get(type);
        if (!annotations) {
            var classMetadata = this.getTypeMetadata(type);
            if (classMetadata['decorators']) {
                annotations = this.simplify(type, classMetadata['decorators']);
            }
            else {
                annotations = [];
            }
            this.annotationCache.set(type, annotations.filter(function (ann) { return !!ann; }));
        }
        return annotations;
    };
    StaticReflector.prototype.propMetadata = function (type) {
        var _this = this;
        var propMetadata = this.propertyCache.get(type);
        if (!propMetadata) {
            var classMetadata = this.getTypeMetadata(type);
            var members = classMetadata ? classMetadata['members'] : {};
            propMetadata = mapStringMap(members, function (propData, propName) {
                var prop = propData.find(function (a) { return a['__symbolic'] == 'property'; });
                if (prop && prop['decorators']) {
                    return _this.simplify(type, prop['decorators']);
                }
                else {
                    return [];
                }
            });
            this.propertyCache.set(type, propMetadata);
        }
        return propMetadata;
    };
    StaticReflector.prototype.parameters = function (type) {
        if (!(type instanceof StaticSymbol)) {
            throw new Error("parameters received " + JSON.stringify(type) + " which is not a StaticSymbol");
        }
        try {
            var parameters_1 = this.parameterCache.get(type);
            if (!parameters_1) {
                var classMetadata = this.getTypeMetadata(type);
                var members = classMetadata ? classMetadata['members'] : null;
                var ctorData = members ? members['__ctor__'] : null;
                if (ctorData) {
                    var ctor = ctorData.find(function (a) { return a['__symbolic'] == 'constructor'; });
                    var parameterTypes = this.simplify(type, ctor['parameters'] || []);
                    var parameterDecorators_1 = this.simplify(type, ctor['parameterDecorators'] || []);
                    parameters_1 = [];
                    parameterTypes.forEach(function (paramType, index) {
                        var nestedResult = [];
                        if (paramType) {
                            nestedResult.push(paramType);
                        }
                        var decorators = parameterDecorators_1 ? parameterDecorators_1[index] : null;
                        if (decorators) {
                            nestedResult.push.apply(nestedResult, decorators);
                        }
                        parameters_1.push(nestedResult);
                    });
                }
                if (!parameters_1) {
                    parameters_1 = [];
                }
                this.parameterCache.set(type, parameters_1);
            }
            return parameters_1;
        }
        catch (e) {
            console.log("Failed on type " + JSON.stringify(type) + " with error " + e);
            throw e;
        }
    };
    StaticReflector.prototype.hasLifecycleHook = function (type, lcInterface, lcProperty) {
        if (!(type instanceof StaticSymbol)) {
            throw new Error("hasLifecycleHook received " + JSON.stringify(type) + " which is not a StaticSymbol");
        }
        var classMetadata = this.getTypeMetadata(type);
        var members = classMetadata ? classMetadata['members'] : null;
        var member = members ? members[lcProperty] : null;
        return member ? member.some(function (a) { return a['__symbolic'] == 'method'; }) : false;
    };
    StaticReflector.prototype.registerDecoratorOrConstructor = function (type, ctor) {
        this.conversionMap.set(type, function (context, args) {
            var metadata = Object.create(ctor.prototype);
            ctor.apply(metadata, args);
            return metadata;
        });
    };
    StaticReflector.prototype.registerFunction = function (type, fn) {
        this.conversionMap.set(type, function (context, args) { return fn.apply(undefined, args); });
    };
    StaticReflector.prototype.initializeConversionMap = function () {
        var _a = this.host.angularImportLocations(), coreDecorators = _a.coreDecorators, diDecorators = _a.diDecorators, diMetadata = _a.diMetadata, diOpaqueToken = _a.diOpaqueToken, animationMetadata = _a.animationMetadata, provider = _a.provider;
        this.opaqueToken = this.host.findDeclaration(diOpaqueToken, 'OpaqueToken');
        this.registerDecoratorOrConstructor(this.host.findDeclaration(provider, 'Provider'), core_1.Provider);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diDecorators, 'Host'), core_1.HostMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diDecorators, 'Injectable'), core_1.InjectableMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diDecorators, 'Self'), core_1.SelfMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diDecorators, 'SkipSelf'), core_1.SkipSelfMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diDecorators, 'Inject'), core_1.InjectMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diDecorators, 'Optional'), core_1.OptionalMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'Attribute'), core_1.AttributeMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'Query'), core_1.QueryMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'ViewQuery'), core_1.ViewQueryMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'ContentChild'), core_1.ContentChildMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'ContentChildren'), core_1.ContentChildrenMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'ViewChild'), core_1.ViewChildMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'ViewChildren'), core_1.ViewChildrenMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'Input'), core_1.InputMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'Output'), core_1.OutputMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'Pipe'), core_1.PipeMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'HostBinding'), core_1.HostBindingMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'HostListener'), core_1.HostListenerMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'Directive'), core_1.DirectiveMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'Component'), core_1.ComponentMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(coreDecorators, 'NgModule'), core_1.NgModuleMetadata);
        // Note: Some metadata classes can be used directly with Provider.deps.
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diMetadata, 'HostMetadata'), core_1.HostMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diMetadata, 'SelfMetadata'), core_1.SelfMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diMetadata, 'SkipSelfMetadata'), core_1.SkipSelfMetadata);
        this.registerDecoratorOrConstructor(this.host.findDeclaration(diMetadata, 'OptionalMetadata'), core_1.OptionalMetadata);
        this.registerFunction(this.host.findDeclaration(animationMetadata, 'trigger'), core_1.trigger);
        this.registerFunction(this.host.findDeclaration(animationMetadata, 'state'), core_1.state);
        this.registerFunction(this.host.findDeclaration(animationMetadata, 'transition'), core_1.transition);
        this.registerFunction(this.host.findDeclaration(animationMetadata, 'style'), core_1.style);
        this.registerFunction(this.host.findDeclaration(animationMetadata, 'animate'), core_1.animate);
        this.registerFunction(this.host.findDeclaration(animationMetadata, 'keyframes'), core_1.keyframes);
        this.registerFunction(this.host.findDeclaration(animationMetadata, 'sequence'), core_1.sequence);
        this.registerFunction(this.host.findDeclaration(animationMetadata, 'group'), core_1.group);
    };
    /** @internal */
    StaticReflector.prototype.simplify = function (context, value) {
        var _this = this;
        var scope = BindingScope.empty;
        var calling = new Map();
        function simplifyInContext(context, value, depth) {
            function resolveReference(context, expression) {
                var staticSymbol;
                if (expression['module']) {
                    staticSymbol = _this.host.findDeclaration(expression['module'], expression['name'], context.filePath);
                }
                else {
                    staticSymbol = _this.host.getStaticSymbol(context.filePath, expression['name']);
                }
                return staticSymbol;
            }
            function resolveReferenceValue(staticSymbol) {
                var result = staticSymbol;
                var moduleMetadata = _this.getModuleMetadata(staticSymbol.filePath);
                var declarationValue = moduleMetadata ? moduleMetadata['metadata'][staticSymbol.name] : null;
                return declarationValue;
            }
            function isOpaqueToken(context, value) {
                if (value && value.__symbolic === 'new' && value.expression) {
                    var target = value.expression;
                    if (target.__symbolic == 'reference') {
                        return sameSymbol(resolveReference(context, target), _this.opaqueToken);
                    }
                }
                return false;
            }
            function simplifyCall(expression) {
                var callContext = undefined;
                if (expression['__symbolic'] == 'call') {
                    var target = expression['expression'];
                    var targetFunction = void 0;
                    if (target && target.__symbolic === 'reference') {
                        callContext = { name: target.name };
                        targetFunction = resolveReferenceValue(resolveReference(context, target));
                    }
                    if (targetFunction && targetFunction['__symbolic'] == 'function') {
                        if (calling.get(targetFunction)) {
                            throw new Error('Recursion not supported');
                        }
                        calling.set(targetFunction, true);
                        var value_1 = targetFunction['value'];
                        if (value_1) {
                            // Determine the arguments
                            var args = (expression['arguments'] || []).map(function (arg) { return simplify(arg); });
                            var parameters = targetFunction['parameters'];
                            var functionScope = BindingScope.build();
                            for (var i = 0; i < parameters.length; i++) {
                                functionScope.define(parameters[i], args[i]);
                            }
                            var oldScope = scope;
                            var result_1;
                            try {
                                scope = functionScope.done();
                                result_1 = simplify(value_1);
                            }
                            finally {
                                scope = oldScope;
                            }
                            return result_1;
                        }
                        calling.delete(targetFunction);
                    }
                }
                if (depth === 0) {
                    // If depth is 0 we are evaluating the top level expression that is describing element
                    // decorator. In this case, it is a decorator we don't understand, such as a custom
                    // non-angular decorator, and we should just ignore it.
                    return { __symbolic: 'ignore' };
                }
                return simplify({ __symbolic: 'error', message: 'Function call not supported', context: callContext });
            }
            function simplify(expression) {
                if (isPrimitive(expression)) {
                    return expression;
                }
                if (expression instanceof Array) {
                    var result_2 = [];
                    for (var _i = 0, _a = expression; _i < _a.length; _i++) {
                        var item = _a[_i];
                        // Check for a spread expression
                        if (item && item.__symbolic === 'spread') {
                            var spreadArray = simplify(item.expression);
                            if (Array.isArray(spreadArray)) {
                                for (var _b = 0, spreadArray_1 = spreadArray; _b < spreadArray_1.length; _b++) {
                                    var spreadItem = spreadArray_1[_b];
                                    result_2.push(spreadItem);
                                }
                                continue;
                            }
                        }
                        var value_2 = simplify(item);
                        if (shouldIgnore(value_2)) {
                            continue;
                        }
                        result_2.push(value_2);
                    }
                    return result_2;
                }
                if (expression) {
                    if (expression['__symbolic']) {
                        var staticSymbol = void 0;
                        switch (expression['__symbolic']) {
                            case 'binop':
                                var left = simplify(expression['left']);
                                if (shouldIgnore(left))
                                    return left;
                                var right = simplify(expression['right']);
                                if (shouldIgnore(right))
                                    return right;
                                switch (expression['operator']) {
                                    case '&&':
                                        return left && right;
                                    case '||':
                                        return left || right;
                                    case '|':
                                        return left | right;
                                    case '^':
                                        return left ^ right;
                                    case '&':
                                        return left & right;
                                    case '==':
                                        return left == right;
                                    case '!=':
                                        return left != right;
                                    case '===':
                                        return left === right;
                                    case '!==':
                                        return left !== right;
                                    case '<':
                                        return left < right;
                                    case '>':
                                        return left > right;
                                    case '<=':
                                        return left <= right;
                                    case '>=':
                                        return left >= right;
                                    case '<<':
                                        return left << right;
                                    case '>>':
                                        return left >> right;
                                    case '+':
                                        return left + right;
                                    case '-':
                                        return left - right;
                                    case '*':
                                        return left * right;
                                    case '/':
                                        return left / right;
                                    case '%':
                                        return left % right;
                                }
                                return null;
                            case 'pre':
                                var operand = simplify(expression['operand']);
                                if (shouldIgnore(operand))
                                    return operand;
                                switch (expression['operator']) {
                                    case '+':
                                        return operand;
                                    case '-':
                                        return -operand;
                                    case '!':
                                        return !operand;
                                    case '~':
                                        return ~operand;
                                }
                                return null;
                            case 'index':
                                var indexTarget = simplify(expression['expression']);
                                var index = simplify(expression['index']);
                                if (indexTarget && isPrimitive(index))
                                    return indexTarget[index];
                                return null;
                            case 'select':
                                var selectTarget = simplify(expression['expression']);
                                var member = simplify(expression['member']);
                                if (selectTarget && isPrimitive(member))
                                    return selectTarget[member];
                                return null;
                            case 'reference':
                                if (!expression.module) {
                                    var name_1 = expression['name'];
                                    var localValue = scope.resolve(name_1);
                                    if (localValue != BindingScope.missing) {
                                        return localValue;
                                    }
                                }
                                staticSymbol = resolveReference(context, expression);
                                var result_3 = staticSymbol;
                                var declarationValue = resolveReferenceValue(result_3);
                                if (declarationValue) {
                                    if (isOpaqueToken(staticSymbol, declarationValue)) {
                                        // If the referenced symbol is initalized by a new OpaqueToken we can keep the
                                        // reference to the symbol.
                                        return staticSymbol;
                                    }
                                    result_3 = simplifyInContext(staticSymbol, declarationValue, depth + 1);
                                }
                                return result_3;
                            case 'class':
                                return context;
                            case 'function':
                                return context;
                            case 'new':
                            case 'call':
                                // Determine if the function is a built-in conversion
                                var target = expression['expression'];
                                if (target['module']) {
                                    staticSymbol = _this.host.findDeclaration(target['module'], target['name'], context.filePath);
                                }
                                else {
                                    staticSymbol = _this.host.getStaticSymbol(context.filePath, target['name']);
                                }
                                var converter = _this.conversionMap.get(staticSymbol);
                                if (converter) {
                                    var args = expression['arguments'];
                                    if (!args) {
                                        args = [];
                                    }
                                    return converter(context, args.map(function (arg) { return simplifyInContext(context, arg, depth + 1); }));
                                }
                                // Determine if the function is one we can simplify.
                                return simplifyCall(expression);
                            case 'error':
                                var message = produceErrorMessage(expression);
                                if (expression['line']) {
                                    message =
                                        message + " (position " + (expression['line'] + 1) + ":" + (expression['character'] + 1) + " in the original .ts file)";
                                }
                                throw new Error(message);
                        }
                        return null;
                    }
                    return mapStringMap(expression, function (value, name) { return simplify(value); });
                }
                return null;
            }
            try {
                return simplify(value);
            }
            catch (e) {
                throw new Error(e.message + ", resolving symbol " + context.name + " in " + context.filePath);
            }
        }
        var result = simplifyInContext(context, value, 0);
        if (shouldIgnore(result)) {
            return undefined;
        }
        return result;
    };
    /**
     * @param module an absolute path to a module file.
     */
    StaticReflector.prototype.getModuleMetadata = function (module) {
        var moduleMetadata = this.metadataCache.get(module);
        if (!moduleMetadata) {
            moduleMetadata = this.host.getMetadataFor(module);
            if (Array.isArray(moduleMetadata)) {
                moduleMetadata = moduleMetadata
                    .find(function (element) { return element.version === SUPPORTED_SCHEMA_VERSION; }) ||
                    moduleMetadata[0];
            }
            if (!moduleMetadata) {
                moduleMetadata =
                    { __symbolic: 'module', version: SUPPORTED_SCHEMA_VERSION, module: module, metadata: {} };
            }
            if (moduleMetadata['version'] != SUPPORTED_SCHEMA_VERSION) {
                throw new Error("Metadata version mismatch for module " + module + ", found version " + moduleMetadata['version'] + ", expected " + SUPPORTED_SCHEMA_VERSION);
            }
            this.metadataCache.set(module, moduleMetadata);
        }
        return moduleMetadata;
    };
    StaticReflector.prototype.getTypeMetadata = function (type) {
        var moduleMetadata = this.getModuleMetadata(type.filePath);
        var result = moduleMetadata['metadata'][type.name];
        if (!result) {
            result = { __symbolic: 'class' };
        }
        return result;
    };
    return StaticReflector;
}());
exports.StaticReflector = StaticReflector;
function expandedMessage(error) {
    switch (error.message) {
        case 'Reference to non-exported class':
            if (error.context && error.context.className) {
                return "Reference to a non-exported class " + error.context.className;
            }
            break;
        case 'Variable not initialized':
            return 'Only initialized variables and constants can be referenced';
        case 'Destructuring not supported':
            return 'Referencing an exported destructured variable or constant is not supported';
        case 'Could not resolve type':
            if (error.context && error.context.typeName) {
                return "Could not resolve type " + error.context.typeName;
            }
            break;
        case 'Function call not supported':
            var prefix = error.context && error.context.name ? "Calling function '" + error.context.name + "', f" : 'F';
            return prefix +
                'unction calls are not supported. Consider replacing the function or lambda with a reference to an exported function';
    }
    return error.message;
}
function produceErrorMessage(error) {
    return "Error encountered resolving symbol values statically. " + expandedMessage(error);
}
function mapStringMap(input, transform) {
    if (!input)
        return {};
    var result = {};
    Object.keys(input).forEach(function (key) {
        var value = transform(input[key], key);
        if (!shouldIgnore(value)) {
            result[key] = value;
        }
    });
    return result;
}
function isPrimitive(o) {
    return o === null || (typeof o !== 'function' && typeof o !== 'object');
}
var BindingScope = (function () {
    function BindingScope() {
    }
    BindingScope.build = function () {
        var current = new Map();
        var parent = undefined;
        return {
            define: function (name, value) {
                current.set(name, value);
                return this;
            },
            done: function () {
                return current.size > 0 ? new PopulatedScope(current) : BindingScope.empty;
            }
        };
    };
    BindingScope.missing = {};
    BindingScope.empty = { resolve: function (name) { return BindingScope.missing; } };
    return BindingScope;
}());
var PopulatedScope = (function (_super) {
    __extends(PopulatedScope, _super);
    function PopulatedScope(bindings) {
        _super.call(this);
        this.bindings = bindings;
    }
    PopulatedScope.prototype.resolve = function (name) {
        return this.bindings.has(name) ? this.bindings.get(name) : BindingScope.missing;
    };
    return PopulatedScope;
}(BindingScope));
function sameSymbol(a, b) {
    return a === b || (a.name == b.name && a.filePath == b.filePath);
}
function shouldIgnore(value) {
    return value && value.__symbolic == 'ignore';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljX3JlZmxlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXItY2xpL3NyYy9zdGF0aWNfcmVmbGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILHFCQUFnZSxlQUFlLENBQUMsQ0FBQTtBQUloZixJQUFNLHdCQUF3QixHQUFHLENBQUMsQ0FBQztBQW9DbkM7Ozs7R0FJRztBQUNIO0lBQ0Usc0JBQW1CLFFBQWdCLEVBQVMsSUFBWTtRQUFyQyxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtJQUFHLENBQUM7SUFDOUQsbUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLG9CQUFZLGVBRXhCLENBQUE7QUFFRDs7O0dBR0c7QUFDSDtJQVFFLHlCQUFvQixJQUF5QjtRQUF6QixTQUFJLEdBQUosSUFBSSxDQUFxQjtRQVByQyxvQkFBZSxHQUFHLElBQUksR0FBRyxFQUF1QixDQUFDO1FBQ2pELGtCQUFhLEdBQUcsSUFBSSxHQUFHLEVBQXNDLENBQUM7UUFDOUQsbUJBQWMsR0FBRyxJQUFJLEdBQUcsRUFBdUIsQ0FBQztRQUNoRCxrQkFBYSxHQUFHLElBQUksR0FBRyxFQUFnQyxDQUFDO1FBQ3hELGtCQUFhLEdBQUcsSUFBSSxHQUFHLEVBQTZELENBQUM7UUFHNUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFBQyxDQUFDO0lBRWxGLG1DQUFTLEdBQVQsVUFBVSxVQUF3QjtRQUNoQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkYsTUFBTSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUNyRCxD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