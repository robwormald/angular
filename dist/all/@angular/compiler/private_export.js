/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var directive_normalizer = require('./src/directive_normalizer');
var lexer = require('./src/expression_parser/lexer');
var parser = require('./src/expression_parser/parser');
var html_parser = require('./src/html_parser');
var i18n_html_parser = require('./src/i18n/i18n_html_parser');
var i18n_message = require('./src/i18n/message');
var i18n_extractor = require('./src/i18n/message_extractor');
var xmb_serializer = require('./src/i18n/xmb_serializer');
var metadata_resolver = require('./src/metadata_resolver');
var ng_module_compiler = require('./src/ng_module_compiler');
var path_util = require('./src/output/path_util');
var ts_emitter = require('./src/output/ts_emitter');
var parse_util = require('./src/parse_util');
var dom_element_schema_registry = require('./src/schema/dom_element_schema_registry');
var selector = require('./src/selector');
var style_compiler = require('./src/style_compiler');
var template_parser = require('./src/template_parser');
var view_compiler = require('./src/view_compiler/view_compiler');
var __compiler_private__;
(function (__compiler_private__) {
    __compiler_private__.SelectorMatcher = selector.SelectorMatcher;
    __compiler_private__.CssSelector = selector.CssSelector;
    __compiler_private__.AssetUrl = path_util.AssetUrl;
    __compiler_private__.ImportGenerator = path_util.ImportGenerator;
    __compiler_private__.CompileMetadataResolver = metadata_resolver.CompileMetadataResolver;
    __compiler_private__.HtmlParser = html_parser.HtmlParser;
    __compiler_private__.I18nHtmlParser = i18n_html_parser.I18nHtmlParser;
    __compiler_private__.ExtractionResult = i18n_extractor.ExtractionResult;
    __compiler_private__.Message = i18n_message.Message;
    __compiler_private__.MessageExtractor = i18n_extractor.MessageExtractor;
    __compiler_private__.removeDuplicates = i18n_extractor.removeDuplicates;
    __compiler_private__.serializeXmb = xmb_serializer.serializeXmb;
    __compiler_private__.deserializeXmb = xmb_serializer.deserializeXmb;
    __compiler_private__.DirectiveNormalizer = directive_normalizer.DirectiveNormalizer;
    __compiler_private__.Lexer = lexer.Lexer;
    __compiler_private__.Parser = parser.Parser;
    __compiler_private__.ParseLocation = parse_util.ParseLocation;
    __compiler_private__.ParseError = parse_util.ParseError;
    __compiler_private__.ParseErrorLevel = parse_util.ParseErrorLevel;
    __compiler_private__.ParseSourceFile = parse_util.ParseSourceFile;
    __compiler_private__.ParseSourceSpan = parse_util.ParseSourceSpan;
    __compiler_private__.TemplateParser = template_parser.TemplateParser;
    __compiler_private__.DomElementSchemaRegistry = dom_element_schema_registry.DomElementSchemaRegistry;
    __compiler_private__.StyleCompiler = style_compiler.StyleCompiler;
    __compiler_private__.ViewCompiler = view_compiler.ViewCompiler;
    __compiler_private__.NgModuleCompiler = ng_module_compiler.NgModuleCompiler;
    __compiler_private__.TypeScriptEmitter = ts_emitter.TypeScriptEmitter;
})(__compiler_private__ = exports.__compiler_private__ || (exports.__compiler_private__ = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9leHBvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3ByaXZhdGVfZXhwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxJQUFZLG9CQUFvQixXQUFNLDRCQUE0QixDQUFDLENBQUE7QUFDbkUsSUFBWSxLQUFLLFdBQU0sK0JBQStCLENBQUMsQ0FBQTtBQUN2RCxJQUFZLE1BQU0sV0FBTSxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ3pELElBQVksV0FBVyxXQUFNLG1CQUFtQixDQUFDLENBQUE7QUFDakQsSUFBWSxnQkFBZ0IsV0FBTSw2QkFBNkIsQ0FBQyxDQUFBO0FBQ2hFLElBQVksWUFBWSxXQUFNLG9CQUFvQixDQUFDLENBQUE7QUFDbkQsSUFBWSxjQUFjLFdBQU0sOEJBQThCLENBQUMsQ0FBQTtBQUMvRCxJQUFZLGNBQWMsV0FBTSwyQkFBMkIsQ0FBQyxDQUFBO0FBQzVELElBQVksaUJBQWlCLFdBQU0seUJBQXlCLENBQUMsQ0FBQTtBQUM3RCxJQUFZLGtCQUFrQixXQUFNLDBCQUEwQixDQUFDLENBQUE7QUFDL0QsSUFBWSxTQUFTLFdBQU0sd0JBQXdCLENBQUMsQ0FBQTtBQUNwRCxJQUFZLFVBQVUsV0FBTSx5QkFBeUIsQ0FBQyxDQUFBO0FBQ3RELElBQVksVUFBVSxXQUFNLGtCQUFrQixDQUFDLENBQUE7QUFDL0MsSUFBWSwyQkFBMkIsV0FBTSwwQ0FBMEMsQ0FBQyxDQUFBO0FBQ3hGLElBQVksUUFBUSxXQUFNLGdCQUFnQixDQUFDLENBQUE7QUFDM0MsSUFBWSxjQUFjLFdBQU0sc0JBQXNCLENBQUMsQ0FBQTtBQUN2RCxJQUFZLGVBQWUsV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3pELElBQVksYUFBYSxXQUFNLG1DQUFtQyxDQUFDLENBQUE7QUFFbkUsSUFBaUIsb0JBQW9CLENBK0VwQztBQS9FRCxXQUFpQixvQkFBb0IsRUFBQyxDQUFDO0lBRTVCLG9DQUFlLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQztJQUczQyxnQ0FBVyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFHbkMsNkJBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO0lBRzlCLG9DQUFlLEdBQUcsU0FBUyxDQUFDLGVBQWUsQ0FBQztJQUc1Qyw0Q0FBdUIsR0FBRyxpQkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQztJQUdwRSwrQkFBVSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUM7SUFHcEMsbUNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7SUFHakQscUNBQWdCLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixDQUFDO0lBR25ELDRCQUFPLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQztJQUcvQixxQ0FBZ0IsR0FBRyxjQUFjLENBQUMsZ0JBQWdCLENBQUM7SUFFbkQscUNBQWdCLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixDQUFDO0lBRW5ELGlDQUFZLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQztJQUMzQyxtQ0FBYyxHQUFHLGNBQWMsQ0FBQyxjQUFjLENBQUM7SUFHL0Msd0NBQW1CLEdBQUcsb0JBQW9CLENBQUMsbUJBQW1CLENBQUM7SUFHL0QsMEJBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBR3BCLDJCQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUd2QixrQ0FBYSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFHekMsK0JBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDO0lBR25DLG9DQUFlLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQztJQUc3QyxvQ0FBZSxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUM7SUFHN0Msb0NBQWUsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDO0lBRzdDLG1DQUFjLEdBQUcsZUFBZSxDQUFDLGNBQWMsQ0FBQztJQUtoRCw2Q0FBd0IsR0FBRywyQkFBMkIsQ0FBQyx3QkFBd0IsQ0FBQztJQUdoRixrQ0FBYSxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUM7SUFHN0MsaUNBQVksR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDO0lBRzFDLHFDQUFnQixHQUFHLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDO0lBR3ZELHNDQUFpQixHQUFHLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQztBQUM1RCxDQUFDLEVBL0VnQixvQkFBb0IsR0FBcEIsNEJBQW9CLEtBQXBCLDRCQUFvQixRQStFcEMifQ==