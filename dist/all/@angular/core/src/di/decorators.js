/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var decorators_1 = require('../util/decorators');
var metadata_1 = require('./metadata');
/**
 * Factory for creating {@link InjectMetadata}.
 * @stable
 * @Annotation
 */
exports.Inject = decorators_1.makeParamDecorator(metadata_1.InjectMetadata);
/**
 * Factory for creating {@link OptionalMetadata}.
 * @stable
 * @Annotation
 */
exports.Optional = decorators_1.makeParamDecorator(metadata_1.OptionalMetadata);
/**
 * Factory for creating {@link InjectableMetadata}.
 * @stable
 * @Annotation
 */
exports.Injectable = decorators_1.makeDecorator(metadata_1.InjectableMetadata);
/**
 * Factory for creating {@link SelfMetadata}.
 * @stable
 * @Annotation
 */
exports.Self = decorators_1.makeParamDecorator(metadata_1.SelfMetadata);
/**
 * Factory for creating {@link HostMetadata}.
 * @stable
 * @Annotation
 */
exports.Host = decorators_1.makeParamDecorator(metadata_1.HostMetadata);
/**
 * Factory for creating {@link SkipSelfMetadata}.
 * @stable
 * @Annotation
 */
exports.SkipSelf = decorators_1.makeParamDecorator(metadata_1.SkipSelfMetadata);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS9zcmMvZGkvZGVjb3JhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsMkJBQWdELG9CQUFvQixDQUFDLENBQUE7QUFFckUseUJBQWlILFlBQVksQ0FBQyxDQUFBO0FBeUQ5SDs7OztHQUlHO0FBQ1EsY0FBTSxHQUEwQiwrQkFBa0IsQ0FBQyx5QkFBYyxDQUFDLENBQUM7QUFFOUU7Ozs7R0FJRztBQUNRLGdCQUFRLEdBQTRCLCtCQUFrQixDQUFDLDJCQUFnQixDQUFDLENBQUM7QUFFcEY7Ozs7R0FJRztBQUNRLGtCQUFVLEdBQ1UsMEJBQWEsQ0FBQyw2QkFBa0IsQ0FBQyxDQUFDO0FBRWpFOzs7O0dBSUc7QUFDUSxZQUFJLEdBQXdCLCtCQUFrQixDQUFDLHVCQUFZLENBQUMsQ0FBQztBQUV4RTs7OztHQUlHO0FBQ1EsWUFBSSxHQUF3QiwrQkFBa0IsQ0FBQyx1QkFBWSxDQUFDLENBQUM7QUFFeEU7Ozs7R0FJRztBQUNRLGdCQUFRLEdBQTRCLCtCQUFrQixDQUFDLDJCQUFnQixDQUFDLENBQUMifQ==