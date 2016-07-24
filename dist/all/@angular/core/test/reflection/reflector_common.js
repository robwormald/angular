/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var decorators_1 = require('@angular/core/src/util/decorators');
var ClassDecoratorMeta = (function () {
    function ClassDecoratorMeta(value /** TODO #9100 */) {
        this.value = value;
    }
    return ClassDecoratorMeta;
}());
exports.ClassDecoratorMeta = ClassDecoratorMeta;
var ParamDecoratorMeta = (function () {
    function ParamDecoratorMeta(value /** TODO #9100 */) {
        this.value = value;
    }
    return ParamDecoratorMeta;
}());
exports.ParamDecoratorMeta = ParamDecoratorMeta;
var PropDecoratorMeta = (function () {
    function PropDecoratorMeta(value /** TODO #9100 */) {
        this.value = value;
    }
    return PropDecoratorMeta;
}());
exports.PropDecoratorMeta = PropDecoratorMeta;
function classDecorator(value /** TODO #9100 */) {
    return new ClassDecoratorMeta(value);
}
exports.classDecorator = classDecorator;
function paramDecorator(value /** TODO #9100 */) {
    return new ParamDecoratorMeta(value);
}
exports.paramDecorator = paramDecorator;
function propDecorator(value /** TODO #9100 */) {
    return new PropDecoratorMeta(value);
}
exports.propDecorator = propDecorator;
/** @Annotation */ exports.ClassDecorator = decorators_1.makeDecorator(ClassDecoratorMeta);
/** @Annotation */ exports.ParamDecorator = decorators_1.makeParamDecorator(ParamDecoratorMeta);
/** @Annotation */ exports.PropDecorator = decorators_1.makePropDecorator(PropDecoratorMeta);
// used only in Dart
var HasGetterAndSetterDecorators = (function () {
    function HasGetterAndSetterDecorators() {
    }
    return HasGetterAndSetterDecorators;
}());
exports.HasGetterAndSetterDecorators = HasGetterAndSetterDecorators;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdG9yX2NvbW1vbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0L3JlZmxlY3Rpb24vcmVmbGVjdG9yX2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsMkJBQW1FLG1DQUFtQyxDQUFDLENBQUE7QUFFdkc7SUFDRSw0QkFBbUIsS0FBVSxDQUFDLGlCQUFpQjtRQUE1QixVQUFLLEdBQUwsS0FBSyxDQUFLO0lBQXFCLENBQUM7SUFDckQseUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLDBCQUFrQixxQkFFOUIsQ0FBQTtBQUVEO0lBQ0UsNEJBQW1CLEtBQVUsQ0FBQyxpQkFBaUI7UUFBNUIsVUFBSyxHQUFMLEtBQUssQ0FBSztJQUFxQixDQUFDO0lBQ3JELHlCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSwwQkFBa0IscUJBRTlCLENBQUE7QUFFRDtJQUNFLDJCQUFtQixLQUFVLENBQUMsaUJBQWlCO1FBQTVCLFVBQUssR0FBTCxLQUFLLENBQUs7SUFBcUIsQ0FBQztJQUNyRCx3QkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlkseUJBQWlCLG9CQUU3QixDQUFBO0FBRUQsd0JBQStCLEtBQVUsQ0FBQyxpQkFBaUI7SUFDekQsTUFBTSxDQUFDLElBQUksa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUZlLHNCQUFjLGlCQUU3QixDQUFBO0FBRUQsd0JBQStCLEtBQVUsQ0FBQyxpQkFBaUI7SUFDekQsTUFBTSxDQUFDLElBQUksa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUZlLHNCQUFjLGlCQUU3QixDQUFBO0FBRUQsdUJBQThCLEtBQVUsQ0FBQyxpQkFBaUI7SUFDeEQsTUFBTSxDQUFDLElBQUksaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQUZlLHFCQUFhLGdCQUU1QixDQUFBO0FBRUQsa0JBQWtCLENBQVksc0JBQWMsR0FBRywwQkFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDakYsa0JBQWtCLENBQVksc0JBQWMsR0FBRywrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3RGLGtCQUFrQixDQUFZLHFCQUFhLEdBQUcsOEJBQWlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUVuRixvQkFBb0I7QUFDcEI7SUFBQTtJQUEyQyxDQUFDO0lBQUQsbUNBQUM7QUFBRCxDQUFDLEFBQTVDLElBQTRDO0FBQS9CLG9DQUE0QiwrQkFBRyxDQUFBIn0=