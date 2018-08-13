/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { withResizeable } from '../cdk/resizeable-behavior';
import { NgCustomElementLifecycle, CustomElementConstructor } from '@angular/elements/platform';

const ROOT_RESIZABLES = new Set();

declare const ResizeObserver:any;
