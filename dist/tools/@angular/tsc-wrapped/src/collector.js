"use strict";
var ts = require('typescript');
var evaluator_1 = require('./evaluator');
var schema_1 = require('./schema');
var symbols_1 = require('./symbols');
/**
 * Collect decorator metadata from a TypeScript module.
 */
var MetadataCollector = (function () {
    function MetadataCollector() {
    }
    /**
     * Returns a JSON.stringify friendly form describing the decorators of the exported classes from
     * the source file that is expected to correspond to a module.
     */
    MetadataCollector.prototype.getMetadata = function (sourceFile) {
        var locals = new symbols_1.Symbols(sourceFile);
        var evaluator = new evaluator_1.Evaluator(locals);
        var metadata;
        function objFromDecorator(decoratorNode) {
            return evaluator.evaluateNode(decoratorNode.expression);
        }
        function errorSym(message, node, context) {
            return evaluator_1.errorSymbol(message, node, context, sourceFile);
        }
        function classMetadataOf(classDeclaration) {
            var result = { __symbolic: 'class' };
            function getDecorators(decorators) {
                if (decorators && decorators.length)
                    return decorators.map(function (decorator) { return objFromDecorator(decorator); });
                return undefined;
            }
            function referenceFrom(node) {
                var result = evaluator.evaluateNode(node);
                if (schema_1.isMetadataError(result) || schema_1.isMetadataSymbolicReferenceExpression(result) ||
                    schema_1.isMetadataSymbolicSelectExpression(result)) {
                    return result;
                }
                else {
                    return errorSym('Symbol reference expected', node);
                }
            }
            // Add class decorators
            if (classDeclaration.decorators) {
                result.decorators = getDecorators(classDeclaration.decorators);
            }
            // member decorators
            var members = null;
            function recordMember(name, metadata) {
                if (!members)
                    members = {};
                var data = members.hasOwnProperty(name) ? members[name] : [];
                data.push(metadata);
                members[name] = data;
            }
            for (var _i = 0, _a = classDeclaration.members; _i < _a.length; _i++) {
                var member = _a[_i];
                var isConstructor = false;
                switch (member.kind) {
                    case ts.SyntaxKind.Constructor:
                    case ts.SyntaxKind.MethodDeclaration:
                        isConstructor = member.kind === ts.SyntaxKind.Constructor;
                        var method = member;
                        var methodDecorators = getDecorators(method.decorators);
                        var parameters = method.parameters;
                        var parameterDecoratorData = [];
                        var parametersData = [];
                        var hasDecoratorData = false;
                        var hasParameterData = false;
                        for (var _b = 0, parameters_1 = parameters; _b < parameters_1.length; _b++) {
                            var parameter = parameters_1[_b];
                            var parameterData = getDecorators(parameter.decorators);
                            parameterDecoratorData.push(parameterData);
                            hasDecoratorData = hasDecoratorData || !!parameterData;
                            if (isConstructor) {
                                if (parameter.type) {
                                    parametersData.push(referenceFrom(parameter.type));
                                }
                                else {
                                    parametersData.push(null);
                                }
                                hasParameterData = true;
                            }
                        }
                        var data = { __symbolic: isConstructor ? 'constructor' : 'method' };
                        var name_1 = isConstructor ? '__ctor__' : evaluator.nameOf(member.name);
                        if (methodDecorators) {
                            data.decorators = methodDecorators;
                        }
                        if (hasDecoratorData) {
                            data.parameterDecorators = parameterDecoratorData;
                        }
                        if (hasParameterData) {
                            data.parameters = parametersData;
                        }
                        if (!schema_1.isMetadataError(name_1)) {
                            recordMember(name_1, data);
                        }
                        break;
                    case ts.SyntaxKind.PropertyDeclaration:
                    case ts.SyntaxKind.GetAccessor:
                    case ts.SyntaxKind.SetAccessor:
                        var property = member;
                        var propertyDecorators = getDecorators(property.decorators);
                        if (propertyDecorators) {
                            var name_2 = evaluator.nameOf(property.name);
                            if (!schema_1.isMetadataError(name_2)) {
                                recordMember(name_2, { __symbolic: 'property', decorators: propertyDecorators });
                            }
                        }
                        break;
                }
            }
            if (members) {
                result.members = members;
            }
            return result.decorators || members ? result : undefined;
        }
        // Predeclare classes
        ts.forEachChild(sourceFile, function (node) {
            switch (node.kind) {
                case ts.SyntaxKind.ClassDeclaration:
                    var classDeclaration = node;
                    var className = classDeclaration.name.text;
                    if (node.flags & ts.NodeFlags.Export) {
                        locals.define(className, { __symbolic: 'reference', name: className });
                    }
                    else {
                        locals.define(className, errorSym('Reference to non-exported class', node, { className: className }));
                    }
                    break;
            }
        });
        ts.forEachChild(sourceFile, function (node) {
            switch (node.kind) {
                case ts.SyntaxKind.ClassDeclaration:
                    var classDeclaration = node;
                    var className = classDeclaration.name.text;
                    if (node.flags & ts.NodeFlags.Export) {
                        if (classDeclaration.decorators) {
                            if (!metadata)
                                metadata = {};
                            metadata[className] = classMetadataOf(classDeclaration);
                        }
                    }
                    // Otherwise don't record metadata for the class.
                    break;
                case ts.SyntaxKind.FunctionDeclaration:
                    // Record functions that return a single value. Record the parameter
                    // names substitution will be performed by the StaticReflector.
                    if (node.flags & ts.NodeFlags.Export) {
                        var functionDeclaration = node;
                        var functionName = functionDeclaration.name.text;
                        var functionBody = functionDeclaration.body;
                        if (functionBody && functionBody.statements.length == 1) {
                            var statement = functionBody.statements[0];
                            if (statement.kind === ts.SyntaxKind.ReturnStatement) {
                                var returnStatement = statement;
                                if (returnStatement.expression) {
                                    if (!metadata)
                                        metadata = {};
                                    metadata[functionName] = {
                                        __symbolic: 'function',
                                        parameters: namesOf(functionDeclaration.parameters),
                                        value: evaluator.evaluateNode(returnStatement.expression)
                                    };
                                }
                            }
                        }
                    }
                    // Otherwise don't record the function.
                    break;
                case ts.SyntaxKind.EnumDeclaration:
                    var enumDeclaration = node;
                    var enumValueHolder = {};
                    var enumName = enumDeclaration.name.text;
                    var nextDefaultValue = 0;
                    var writtenMembers = 0;
                    for (var _i = 0, _a = enumDeclaration.members; _i < _a.length; _i++) {
                        var member = _a[_i];
                        var enumValue = void 0;
                        if (!member.initializer) {
                            enumValue = nextDefaultValue;
                        }
                        else {
                            enumValue = evaluator.evaluateNode(member.initializer);
                        }
                        var name_3 = undefined;
                        if (member.name.kind == ts.SyntaxKind.Identifier) {
                            var identifier = member.name;
                            name_3 = identifier.text;
                            enumValueHolder[name_3] = enumValue;
                            writtenMembers++;
                        }
                        if (typeof enumValue === 'number') {
                            nextDefaultValue = enumValue + 1;
                        }
                        else if (name_3) {
                            nextDefaultValue = {
                                __symbolic: 'binary',
                                operator: '+',
                                left: {
                                    __symbolic: 'select',
                                    expression: { __symbolic: 'reference', name: enumName }, name: name_3
                                }
                            };
                        }
                        else {
                            nextDefaultValue = errorSym('Unsuppported enum member name', member.name);
                        }
                        ;
                    }
                    if (writtenMembers) {
                        if (!metadata)
                            metadata = {};
                        metadata[enumName] = enumValueHolder;
                    }
                    break;
                case ts.SyntaxKind.VariableStatement:
                    var variableStatement = node;
                    var _loop_1 = function(variableDeclaration) {
                        if (variableDeclaration.name.kind == ts.SyntaxKind.Identifier) {
                            var nameNode = variableDeclaration.name;
                            var varValue = void 0;
                            if (variableDeclaration.initializer) {
                                varValue = evaluator.evaluateNode(variableDeclaration.initializer);
                            }
                            else {
                                varValue = errorSym('Variable not initialized', nameNode);
                            }
                            if (variableStatement.flags & ts.NodeFlags.Export ||
                                variableDeclaration.flags & ts.NodeFlags.Export) {
                                if (!metadata)
                                    metadata = {};
                                metadata[nameNode.text] = varValue;
                            }
                            if (evaluator_1.isPrimitive(varValue)) {
                                locals.define(nameNode.text, varValue);
                            }
                        }
                        else {
                            // Destructuring (or binding) declarations are not supported,
                            // var {<identifier>[, <identifer>]+} = <expression>;
                            //   or
                            // var [<identifier>[, <identifier}+] = <expression>;
                            // are not supported.
                            var report_1 = function (nameNode) {
                                switch (nameNode.kind) {
                                    case ts.SyntaxKind.Identifier:
                                        var name_4 = nameNode;
                                        var varValue = errorSym('Destructuring not supported', nameNode);
                                        locals.define(name_4.text, varValue);
                                        if (node.flags & ts.NodeFlags.Export) {
                                            if (!metadata)
                                                metadata = {};
                                            metadata[name_4.text] = varValue;
                                        }
                                        break;
                                    case ts.SyntaxKind.BindingElement:
                                        var bindingElement = nameNode;
                                        report_1(bindingElement.name);
                                        break;
                                    case ts.SyntaxKind.ObjectBindingPattern:
                                    case ts.SyntaxKind.ArrayBindingPattern:
                                        var bindings = nameNode;
                                        bindings.elements.forEach(report_1);
                                        break;
                                }
                            };
                            report_1(variableDeclaration.name);
                        }
                    };
                    for (var _b = 0, _c = variableStatement.declarationList.declarations; _b < _c.length; _b++) {
                        var variableDeclaration = _c[_b];
                        _loop_1(variableDeclaration);
                    }
                    break;
            }
        });
        return metadata && { __symbolic: 'module', version: schema_1.VERSION, metadata: metadata };
    };
    return MetadataCollector;
}());
exports.MetadataCollector = MetadataCollector;
// Collect parameter names from a function.
function namesOf(parameters) {
    var result = [];
    function addNamesOf(name) {
        if (name.kind == ts.SyntaxKind.Identifier) {
            var identifier = name;
            result.push(identifier.text);
        }
        else {
            var bindingPattern = name;
            for (var _i = 0, _a = bindingPattern.elements; _i < _a.length; _i++) {
                var element = _a[_i];
                addNamesOf(element.name);
            }
        }
    }
    for (var _i = 0, parameters_2 = parameters; _i < parameters_2.length; _i++) {
        var parameter = parameters_2[_i];
        addNamesOf(parameter.name);
    }
    return result;
}
//# sourceMappingURL=collector.js.map