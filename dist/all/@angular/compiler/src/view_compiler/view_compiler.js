/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var animation_compiler_1 = require('../animation/animation_compiler');
var config_1 = require('../config');
var compile_element_1 = require('./compile_element');
var compile_view_1 = require('./compile_view');
var view_binder_1 = require('./view_binder');
var view_builder_1 = require('./view_builder');
var view_builder_2 = require('./view_builder');
exports.ComponentFactoryDependency = view_builder_2.ComponentFactoryDependency;
exports.ViewFactoryDependency = view_builder_2.ViewFactoryDependency;
var ViewCompileResult = (function () {
    function ViewCompileResult(statements, viewFactoryVar, dependencies) {
        this.statements = statements;
        this.viewFactoryVar = viewFactoryVar;
        this.dependencies = dependencies;
    }
    return ViewCompileResult;
}());
exports.ViewCompileResult = ViewCompileResult;
var ViewCompiler = (function () {
    function ViewCompiler(_genConfig) {
        this._genConfig = _genConfig;
        this._animationCompiler = new animation_compiler_1.AnimationCompiler();
    }
    ViewCompiler.prototype.compileComponent = function (component, template, styles, pipes) {
        var dependencies = [];
        var compiledAnimations = this._animationCompiler.compileComponent(component, template);
        var statements = [];
        compiledAnimations.map(function (entry) {
            statements.push(entry.statesMapStatement);
            statements.push(entry.fnStatement);
        });
        var view = new compile_view_1.CompileView(component, this._genConfig, pipes, styles, compiledAnimations, 0, compile_element_1.CompileElement.createNull(), []);
        view_builder_1.buildView(view, template, dependencies);
        // Need to separate binding from creation to be able to refer to
        // variables that have been declared after usage.
        view_binder_1.bindView(view, template);
        view_builder_1.finishView(view, statements);
        return new ViewCompileResult(statements, view.viewFactory.name, dependencies);
    };
    /** @nocollapse */
    ViewCompiler.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ViewCompiler.ctorParameters = [
        { type: config_1.CompilerConfig, },
    ];
    return ViewCompiler;
}());
exports.ViewCompiler = ViewCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld19jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvc3JjL3ZpZXdfY29tcGlsZXIvdmlld19jb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBRXpDLG1DQUFnQyxpQ0FBaUMsQ0FBQyxDQUFBO0FBRWxFLHVCQUE2QixXQUFXLENBQUMsQ0FBQTtBQUl6QyxnQ0FBNkIsbUJBQW1CLENBQUMsQ0FBQTtBQUNqRCw2QkFBMEIsZ0JBQWdCLENBQUMsQ0FBQTtBQUMzQyw0QkFBdUIsZUFBZSxDQUFDLENBQUE7QUFDdkMsNkJBQXVGLGdCQUFnQixDQUFDLENBQUE7QUFFeEcsNkJBQWdFLGdCQUFnQixDQUFDO0FBQXpFLCtFQUEwQjtBQUFFLHFFQUE2QztBQUVqRjtJQUNFLDJCQUNXLFVBQXlCLEVBQVMsY0FBc0IsRUFDeEQsWUFBcUU7UUFEckUsZUFBVSxHQUFWLFVBQVUsQ0FBZTtRQUFTLG1CQUFjLEdBQWQsY0FBYyxDQUFRO1FBQ3hELGlCQUFZLEdBQVosWUFBWSxDQUF5RDtJQUFHLENBQUM7SUFDdEYsd0JBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLHlCQUFpQixvQkFJN0IsQ0FBQTtBQUNEO0lBRUUsc0JBQW9CLFVBQTBCO1FBQTFCLGVBQVUsR0FBVixVQUFVLENBQWdCO1FBRHRDLHVCQUFrQixHQUFHLElBQUksc0NBQWlCLEVBQUUsQ0FBQztJQUNKLENBQUM7SUFFbEQsdUNBQWdCLEdBQWhCLFVBQ0ksU0FBbUMsRUFBRSxRQUF1QixFQUFFLE1BQW9CLEVBQ2xGLEtBQTRCO1FBQzlCLElBQUksWUFBWSxHQUE0RCxFQUFFLENBQUM7UUFDL0UsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksVUFBVSxHQUFrQixFQUFFLENBQUM7UUFDbkMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSztZQUMxQixVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxJQUFJLEdBQUcsSUFBSSwwQkFBVyxDQUN0QixTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLENBQUMsRUFDaEUsZ0NBQWMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyQyx3QkFBUyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDeEMsZ0VBQWdFO1FBQ2hFLGlEQUFpRDtRQUNqRCxzQkFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN6Qix5QkFBVSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUU3QixNQUFNLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUNILGtCQUFrQjtJQUNYLHVCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGlCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDJCQUFjLEdBQTJEO1FBQ2hGLEVBQUMsSUFBSSxFQUFFLHVCQUFjLEdBQUc7S0FDdkIsQ0FBQztJQUNGLG1CQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQztBQWpDWSxvQkFBWSxlQWlDeEIsQ0FBQSJ9