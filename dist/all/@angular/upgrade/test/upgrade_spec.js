/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var upgrade_1 = require('@angular/upgrade');
var angular = require('@angular/upgrade/src/angular_js');
function main() {
    testing_internal_1.describe('adapter: ng1 to ng2', function () {
        beforeEach(function () { return core_1.disposePlatform(); });
        afterEach(function () { return core_1.disposePlatform(); });
        testing_internal_1.it('should have angular 1 loaded', function () { return testing_internal_1.expect(angular.version.major).toBe(1); });
        testing_internal_1.it('should instantiate ng2 in ng1 template and project content', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var ng1Module = angular.module('ng1', []);
            var Ng2 = core_1.Component({ selector: 'ng2', template: "{{ 'NG2' }}(<ng-content></ng-content>)" })
                .Class({ constructor: function () { } });
            var element = html('<div>{{ \'ng1[\' }}<ng2>~{{ \'ng-content\' }}~</ng2>{{ \']\' }}</div>');
            var adapter = new upgrade_1.UpgradeAdapter();
            ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
            adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                testing_internal_1.expect(document.body.textContent).toEqual('ng1[NG2(~ng-content~)]');
                ref.dispose();
                async.done();
            });
        }));
        testing_internal_1.it('should instantiate ng1 in ng2 template and project content', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var adapter = new upgrade_1.UpgradeAdapter();
            var ng1Module = angular.module('ng1', []);
            var Ng2 = core_1.Component({
                selector: 'ng2',
                template: "{{ 'ng2(' }}<ng1>{{'transclude'}}</ng1>{{ ')' }}",
                directives: [adapter.upgradeNg1Component('ng1')]
            }).Class({ constructor: function () { } });
            ng1Module.directive('ng1', function () {
                return { transclude: true, template: '{{ "ng1" }}(<ng-transclude></ng-transclude>)' };
            });
            ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
            var element = html('<div>{{\'ng1(\'}}<ng2></ng2>{{\')\'}}</div>');
            adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                testing_internal_1.expect(document.body.textContent).toEqual('ng1(ng2(ng1(transclude)))');
                ref.dispose();
                async.done();
            });
        }));
        testing_internal_1.describe('scope/component change-detection', function () {
            testing_internal_1.it('should interleave scope and component expressions', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var ng1Module = angular.module('ng1', []);
                var log = [];
                var l = function (value /** TODO #9100 */) {
                    log.push(value);
                    return value + ';';
                };
                var adapter = new upgrade_1.UpgradeAdapter();
                ng1Module.directive('ng1a', function () { return { template: '{{ l(\'ng1a\') }}' }; });
                ng1Module.directive('ng1b', function () { return { template: '{{ l(\'ng1b\') }}' }; });
                ng1Module.run(function ($rootScope /** TODO #9100 */) {
                    $rootScope.l = l;
                    $rootScope.reset = function () { return log.length = 0; };
                });
                var Ng2 = core_1.Component({
                    selector: 'ng2',
                    template: "{{l('2A')}}<ng1a></ng1a>{{l('2B')}}<ng1b></ng1b>{{l('2C')}}",
                    directives: [adapter.upgradeNg1Component('ng1a'), adapter.upgradeNg1Component('ng1b')]
                }).Class({ constructor: function () { this.l = l; } });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                var element = html('<div>{{reset(); l(\'1A\');}}<ng2>{{l(\'1B\')}}</ng2>{{l(\'1C\')}}</div>');
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    testing_internal_1.expect(document.body.textContent).toEqual('1A;2A;ng1a;2B;ng1b;2C;1C;');
                    // https://github.com/angular/angular.js/issues/12983
                    testing_internal_1.expect(log).toEqual(['1A', '1B', '1C', '2A', '2B', '2C', 'ng1a', 'ng1b']);
                    ref.dispose();
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('downgrade ng2 component', function () {
            testing_internal_1.it('should bind properties, events', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                ng1Module.run(function ($rootScope /** TODO #9100 */) {
                    $rootScope.dataA = 'A';
                    $rootScope.dataB = 'B';
                    $rootScope.modelA = 'initModelA';
                    $rootScope.modelB = 'initModelB';
                    $rootScope.eventA = '?';
                    $rootScope.eventB = '?';
                });
                var Ng2 = core_1.Component({
                    selector: 'ng2',
                    inputs: ['literal', 'interpolate', 'oneWayA', 'oneWayB', 'twoWayA', 'twoWayB'],
                    outputs: [
                        'eventA', 'eventB', 'twoWayAEmitter: twoWayAChange',
                        'twoWayBEmitter: twoWayBChange'
                    ],
                    template: 'ignore: {{ignore}}; ' +
                        'literal: {{literal}}; interpolate: {{interpolate}}; ' +
                        'oneWayA: {{oneWayA}}; oneWayB: {{oneWayB}}; ' +
                        'twoWayA: {{twoWayA}}; twoWayB: {{twoWayB}}; ({{ngOnChangesCount}})'
                }).Class({
                    constructor: function () {
                        this.ngOnChangesCount = 0;
                        this.ignore = '-';
                        this.literal = '?';
                        this.interpolate = '?';
                        this.oneWayA = '?';
                        this.oneWayB = '?';
                        this.twoWayA = '?';
                        this.twoWayB = '?';
                        this.eventA = new core_1.EventEmitter();
                        this.eventB = new core_1.EventEmitter();
                        this.twoWayAEmitter = new core_1.EventEmitter();
                        this.twoWayBEmitter = new core_1.EventEmitter();
                    },
                    ngOnChanges: function (changes /** TODO #9100 */) {
                        var _this = this;
                        var assert = function (prop /** TODO #9100 */, value /** TODO #9100 */) {
                            if (_this[prop] != value) {
                                throw new Error("Expected: '" + prop + "' to be '" + value + "' but was '" + _this[prop] + "'");
                            }
                        };
                        var assertChange = function (prop /** TODO #9100 */, value /** TODO #9100 */) {
                            assert(prop, value);
                            if (!changes[prop]) {
                                throw new Error("Changes record for '" + prop + "' not found.");
                            }
                            var actValue = changes[prop].currentValue;
                            if (actValue != value) {
                                throw new Error("Expected changes record for'" + prop + "' to be '" + value + "' but was '" + actValue + "'");
                            }
                        };
                        switch (this.ngOnChangesCount++) {
                            case 0:
                                assert('ignore', '-');
                                assertChange('literal', 'Text');
                                assertChange('interpolate', 'Hello world');
                                assertChange('oneWayA', 'A');
                                assertChange('oneWayB', 'B');
                                assertChange('twoWayA', 'initModelA');
                                assertChange('twoWayB', 'initModelB');
                                this.twoWayAEmitter.emit('newA');
                                this.twoWayBEmitter.emit('newB');
                                this.eventA.emit('aFired');
                                this.eventB.emit('bFired');
                                break;
                            case 1:
                                assertChange('twoWayA', 'newA');
                                break;
                            case 2:
                                assertChange('twoWayB', 'newB');
                                break;
                            default:
                                throw new Error('Called too many times! ' + JSON.stringify(changes));
                        }
                    }
                });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                var element = html("<div>\n              <ng2 literal=\"Text\" interpolate=\"Hello {{'world'}}\"\n                   bind-one-way-a=\"dataA\" [one-way-b]=\"dataB\"\n                   bindon-two-way-a=\"modelA\" [(two-way-b)]=\"modelB\"\n                   on-event-a='eventA=$event' (event-b)=\"eventB=$event\"></ng2>\n              | modelA: {{modelA}}; modelB: {{modelB}}; eventA: {{eventA}}; eventB: {{eventB}};\n              </div>");
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    testing_internal_1.expect(multiTrim(document.body.textContent))
                        .toEqual('ignore: -; ' +
                        'literal: Text; interpolate: Hello world; ' +
                        'oneWayA: A; oneWayB: B; twoWayA: newA; twoWayB: newB; (2) | ' +
                        'modelA: newA; modelB: newB; eventA: aFired; eventB: bFired;');
                    ref.dispose();
                    async.done();
                });
            }));
            testing_internal_1.it('should properly run cleanup when ng1 directive is destroyed', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                var onDestroyed = new core_1.EventEmitter();
                ng1Module.directive('ng1', function () {
                    return {
                        template: '<div ng-if="!destroyIt"><ng2></ng2></div>',
                        controller: function ($rootScope /** TODO #9100 */, $timeout /** TODO #9100 */) {
                            $timeout(function () { $rootScope.destroyIt = true; });
                        }
                    };
                });
                var Ng2 = core_1.Component({ selector: 'ng2', template: 'test' }).Class({
                    constructor: function () { },
                    ngOnDestroy: function () { onDestroyed.emit('destroyed'); }
                });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                var element = html('<ng1></ng1>');
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    onDestroyed.subscribe(function () {
                        ref.dispose();
                        async.done();
                    });
                });
            }));
            testing_internal_1.it('should fallback to the root ng2.injector when compiled outside the dom', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                ng1Module.directive('ng1', [
                    '$compile',
                    function ($compile /** TODO #9100 */) {
                        return {
                            link: function ($scope /** TODO #9100 */, $element /** TODO #9100 */, $attrs /** TODO #9100 */) {
                                var compiled = $compile('<ng2></ng2>');
                                var template = compiled($scope);
                                $element.append(template);
                            }
                        };
                    }
                ]);
                var Ng2 = core_1.Component({ selector: 'ng2', template: 'test' }).Class({ constructor: function () { } });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                var element = html('<ng1></ng1>');
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    testing_internal_1.expect(multiTrim(document.body.textContent)).toEqual('test');
                    ref.dispose();
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('upgrade ng1 component', function () {
            testing_internal_1.it('should bind properties, events', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                var ng1 = function () {
                    return {
                        template: 'Hello {{fullName}}; A: {{dataA}}; B: {{dataB}}; | ',
                        scope: { fullName: '@', modelA: '=dataA', modelB: '=dataB', event: '&' },
                        link: function (scope /** TODO #9100 */) {
                            scope.$watch('dataB', function (v /** TODO #9100 */) {
                                if (v == 'Savkin') {
                                    scope.dataB = 'SAVKIN';
                                    scope.event('WORKS');
                                    // Should not update because [model-a] is uni directional
                                    scope.dataA = 'VICTOR';
                                }
                            });
                        }
                    };
                };
                ng1Module.directive('ng1', ng1);
                var Ng2 = core_1.Component({
                    selector: 'ng2',
                    template: '<ng1 fullName="{{last}}, {{first}}" [modelA]="first" [(modelB)]="last" ' +
                        '(event)="event=$event"></ng1>' +
                        '<ng1 fullName="{{\'TEST\'}}" modelA="First" modelB="Last"></ng1>' +
                        '{{event}}-{{last}}, {{first}}',
                    directives: [adapter.upgradeNg1Component('ng1')]
                }).Class({
                    constructor: function () {
                        this.first = 'Victor';
                        this.last = 'Savkin';
                        this.event = '?';
                    }
                });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                var element = html("<div><ng2></ng2></div>");
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    // we need to do setTimeout, because the EventEmitter uses setTimeout to schedule
                    // events, and so without this we would not see the events processed.
                    setTimeout(function () {
                        testing_internal_1.expect(multiTrim(document.body.textContent))
                            .toEqual('Hello SAVKIN, Victor; A: VICTOR; B: SAVKIN; | Hello TEST; A: First; B: Last; | WORKS-SAVKIN, Victor');
                        ref.dispose();
                        async.done();
                    }, 0);
                });
            }));
            testing_internal_1.it('should bind properties, events in controller when bindToController is not used', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                var ng1 = function () {
                    return {
                        restrict: 'E',
                        template: '{{someText}} - Length: {{data.length}}',
                        scope: { data: '=' },
                        controller: function ($scope /** TODO #9100 */) {
                            $scope.someText = 'ng1 - Data: ' + $scope.data;
                        }
                    };
                };
                ng1Module.directive('ng1', ng1);
                var Ng2 = core_1.Component({
                    selector: 'ng2',
                    template: '{{someText}} - Length: {{dataList.length}} | <ng1 [(data)]="dataList"></ng1>',
                    directives: [adapter.upgradeNg1Component('ng1')],
                }).Class({
                    constructor: function () {
                        this.dataList = [1, 2, 3];
                        this.someText = 'ng2';
                    }
                });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                var element = html("<div><ng2></ng2></div>");
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    // we need to do setTimeout, because the EventEmitter uses setTimeout to schedule
                    // events, and so without this we would not see the events processed.
                    setTimeout(function () {
                        testing_internal_1.expect(multiTrim(document.body.textContent))
                            .toEqual('ng2 - Length: 3 | ng1 - Data: 1,2,3 - Length: 3');
                        ref.dispose();
                        async.done();
                    }, 0);
                });
            }));
            testing_internal_1.it('should bind properties, events in link function', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                var ng1 = function () {
                    return {
                        restrict: 'E',
                        template: '{{someText}} - Length: {{data.length}}',
                        scope: { data: '=' },
                        link: function ($scope /** TODO #9100 */) {
                            $scope.someText = 'ng1 - Data: ' + $scope.data;
                        }
                    };
                };
                ng1Module.directive('ng1', ng1);
                var Ng2 = core_1.Component({
                    selector: 'ng2',
                    template: '{{someText}} - Length: {{dataList.length}} | <ng1 [(data)]="dataList"></ng1>',
                    directives: [adapter.upgradeNg1Component('ng1')],
                }).Class({
                    constructor: function () {
                        this.dataList = [1, 2, 3];
                        this.someText = 'ng2';
                    }
                });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                var element = html("<div><ng2></ng2></div>");
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    // we need to do setTimeout, because the EventEmitter uses setTimeout to schedule
                    // events, and so without this we would not see the events processed.
                    setTimeout(function () {
                        testing_internal_1.expect(multiTrim(document.body.textContent))
                            .toEqual('ng2 - Length: 3 | ng1 - Data: 1,2,3 - Length: 3');
                        ref.dispose();
                        async.done();
                    }, 0);
                });
            }));
            testing_internal_1.it('should support templateUrl fetched from $httpBackend', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                ng1Module.value('$httpBackend', function (method /** TODO #9100 */, url /** TODO #9100 */, post /** TODO #9100 */, cbFn /** TODO #9100 */) { cbFn(200, method + ":" + url); });
                var ng1 = function () { return { templateUrl: 'url.html' }; };
                ng1Module.directive('ng1', ng1);
                var Ng2 = core_1.Component({
                    selector: 'ng2',
                    template: '<ng1></ng1>',
                    directives: [adapter.upgradeNg1Component('ng1')]
                }).Class({ constructor: function () { } });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                var element = html("<div><ng2></ng2></div>");
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    testing_internal_1.expect(multiTrim(document.body.textContent)).toEqual('GET:url.html');
                    ref.dispose();
                    async.done();
                });
            }));
            testing_internal_1.it('should support templateUrl as a function', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                ng1Module.value('$httpBackend', function (method /** TODO #9100 */, url /** TODO #9100 */, post /** TODO #9100 */, cbFn /** TODO #9100 */) { cbFn(200, method + ":" + url); });
                var ng1 = function () { return { templateUrl: function () { return 'url.html'; } }; };
                ng1Module.directive('ng1', ng1);
                var Ng2 = core_1.Component({
                    selector: 'ng2',
                    template: '<ng1></ng1>',
                    directives: [adapter.upgradeNg1Component('ng1')]
                }).Class({ constructor: function () { } });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                var element = html("<div><ng2></ng2></div>");
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    testing_internal_1.expect(multiTrim(document.body.textContent)).toEqual('GET:url.html');
                    ref.dispose();
                    async.done();
                });
            }));
            testing_internal_1.it('should support empty template', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                var ng1 = function () { return { template: '' }; };
                ng1Module.directive('ng1', ng1);
                var Ng2 = core_1.Component({
                    selector: 'ng2',
                    template: '<ng1></ng1>',
                    directives: [adapter.upgradeNg1Component('ng1')]
                }).Class({ constructor: function () { } });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                var element = html("<div><ng2></ng2></div>");
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    testing_internal_1.expect(multiTrim(document.body.textContent)).toEqual('');
                    ref.dispose();
                    async.done();
                });
            }));
            testing_internal_1.it('should support template as a function', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                var ng1 = function () { return { template: function () { return ''; } }; };
                ng1Module.directive('ng1', ng1);
                var Ng2 = core_1.Component({
                    selector: 'ng2',
                    template: '<ng1></ng1>',
                    directives: [adapter.upgradeNg1Component('ng1')]
                }).Class({ constructor: function () { } });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                var element = html("<div><ng2></ng2></div>");
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    testing_internal_1.expect(multiTrim(document.body.textContent)).toEqual('');
                    ref.dispose();
                    async.done();
                });
            }));
            testing_internal_1.it('should support templateUrl fetched from $templateCache', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                ng1Module.run(function ($templateCache /** TODO #9100 */) { return $templateCache.put('url.html', 'WORKS'); });
                var ng1 = function () { return { templateUrl: 'url.html' }; };
                ng1Module.directive('ng1', ng1);
                var Ng2 = core_1.Component({
                    selector: 'ng2',
                    template: '<ng1></ng1>',
                    directives: [adapter.upgradeNg1Component('ng1')]
                }).Class({ constructor: function () { } });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                var element = html("<div><ng2></ng2></div>");
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    testing_internal_1.expect(multiTrim(document.body.textContent)).toEqual('WORKS');
                    ref.dispose();
                    async.done();
                });
            }));
            testing_internal_1.it('should support controller with controllerAs', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                var ng1 = function () {
                    return {
                        scope: true,
                        template: '{{ctl.scope}}; {{ctl.isClass}}; {{ctl.hasElement}}; {{ctl.isPublished()}}',
                        controllerAs: 'ctl',
                        controller: core_1.Class({
                            constructor: function ($scope /** TODO #9100 */, $element /** TODO #9100 */) {
                                this.verifyIAmAClass();
                                this.scope = $scope.$parent.$parent == $scope.$root ? 'scope' : 'wrong-scope';
                                this.hasElement = $element[0].nodeName;
                                this.$element = $element;
                            },
                            verifyIAmAClass: function () { this.isClass = 'isClass'; },
                            isPublished: function () {
                                return this.$element.controller('ng1') == this ? 'published' : 'not-published';
                            }
                        })
                    };
                };
                ng1Module.directive('ng1', ng1);
                var Ng2 = core_1.Component({
                    selector: 'ng2',
                    template: '<ng1></ng1>',
                    directives: [adapter.upgradeNg1Component('ng1')]
                }).Class({ constructor: function () { } });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                var element = html("<div><ng2></ng2></div>");
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    testing_internal_1.expect(multiTrim(document.body.textContent)).toEqual('scope; isClass; NG1; published');
                    ref.dispose();
                    async.done();
                });
            }));
            testing_internal_1.it('should support bindToController', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                var ng1 = function () {
                    return {
                        scope: { title: '@' },
                        bindToController: true,
                        template: '{{ctl.title}}',
                        controllerAs: 'ctl',
                        controller: core_1.Class({ constructor: function () { } })
                    };
                };
                ng1Module.directive('ng1', ng1);
                var Ng2 = core_1.Component({
                    selector: 'ng2',
                    template: '<ng1 title="WORKS"></ng1>',
                    directives: [adapter.upgradeNg1Component('ng1')]
                }).Class({ constructor: function () { } });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                var element = html("<div><ng2></ng2></div>");
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    testing_internal_1.expect(multiTrim(document.body.textContent)).toEqual('WORKS');
                    ref.dispose();
                    async.done();
                });
            }));
            testing_internal_1.it('should support bindToController with bindings', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                var ng1 = function () {
                    return {
                        scope: {},
                        bindToController: { title: '@' },
                        template: '{{ctl.title}}',
                        controllerAs: 'ctl',
                        controller: core_1.Class({ constructor: function () { } })
                    };
                };
                ng1Module.directive('ng1', ng1);
                var Ng2 = core_1.Component({
                    selector: 'ng2',
                    template: '<ng1 title="WORKS"></ng1>',
                    directives: [adapter.upgradeNg1Component('ng1')]
                }).Class({ constructor: function () { } });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                var element = html("<div><ng2></ng2></div>");
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    testing_internal_1.expect(multiTrim(document.body.textContent)).toEqual('WORKS');
                    ref.dispose();
                    async.done();
                });
            }));
            testing_internal_1.it('should support single require in linking fn', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                var ng1 = function ($rootScope /** TODO #9100 */) {
                    return {
                        scope: { title: '@' },
                        bindToController: true,
                        template: '{{ctl.status}}',
                        require: 'ng1',
                        controllerAs: 'ctrl',
                        controller: core_1.Class({ constructor: function () { this.status = 'WORKS'; } }),
                        link: function (scope /** TODO #9100 */, element /** TODO #9100 */, attrs /** TODO #9100 */, linkController /** TODO #9100 */) {
                            testing_internal_1.expect(scope.$root).toEqual($rootScope);
                            testing_internal_1.expect(element[0].nodeName).toEqual('NG1');
                            testing_internal_1.expect(linkController.status).toEqual('WORKS');
                            scope.ctl = linkController;
                        }
                    };
                };
                ng1Module.directive('ng1', ng1);
                var Ng2 = core_1.Component({
                    selector: 'ng2',
                    template: '<ng1></ng1>',
                    directives: [adapter.upgradeNg1Component('ng1')]
                }).Class({ constructor: function () { } });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                var element = html("<div><ng2></ng2></div>");
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    testing_internal_1.expect(multiTrim(document.body.textContent)).toEqual('WORKS');
                    ref.dispose();
                    async.done();
                });
            }));
            testing_internal_1.it('should support array require in linking fn', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                var parent = function () {
                    return { controller: core_1.Class({ constructor: function () { this.parent = 'PARENT'; } }) };
                };
                var ng1 = function () {
                    return {
                        scope: { title: '@' },
                        bindToController: true,
                        template: '{{parent.parent}}:{{ng1.status}}',
                        require: ['ng1', '^parent', '?^^notFound'],
                        controllerAs: 'ctrl',
                        controller: core_1.Class({ constructor: function () { this.status = 'WORKS'; } }),
                        link: function (scope /** TODO #9100 */, element /** TODO #9100 */, attrs /** TODO #9100 */, linkControllers /** TODO #9100 */) {
                            testing_internal_1.expect(linkControllers[0].status).toEqual('WORKS');
                            testing_internal_1.expect(linkControllers[1].parent).toEqual('PARENT');
                            testing_internal_1.expect(linkControllers[2]).toBe(undefined);
                            scope.ng1 = linkControllers[0];
                            scope.parent = linkControllers[1];
                        }
                    };
                };
                ng1Module.directive('parent', parent);
                ng1Module.directive('ng1', ng1);
                var Ng2 = core_1.Component({
                    selector: 'ng2',
                    template: '<ng1></ng1>',
                    directives: [adapter.upgradeNg1Component('ng1')]
                }).Class({ constructor: function () { } });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                var element = html("<div><parent><ng2></ng2></parent></div>");
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    testing_internal_1.expect(multiTrim(document.body.textContent)).toEqual('PARENT:WORKS');
                    ref.dispose();
                    async.done();
                });
            }));
            testing_internal_1.it('should call $onInit of components', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                var valueToFind = '$onInit';
                var ng1 = {
                    bindings: {},
                    template: '{{$ctrl.value}}',
                    controller: core_1.Class({ constructor: function () { }, $onInit: function () { this.value = valueToFind; } })
                };
                ng1Module.component('ng1', ng1);
                var Ng2 = core_1.Component({
                    selector: 'ng2',
                    template: '<ng1></ng1>',
                    directives: [adapter.upgradeNg1Component('ng1')]
                }).Class({ constructor: function () { } });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                var element = html("<div><ng2></ng2></div>");
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    testing_internal_1.expect(multiTrim(document.body.textContent)).toEqual(valueToFind);
                    ref.dispose();
                    async.done();
                });
            }));
            testing_internal_1.it('should bind input properties (<) of components', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                var ng1 = {
                    bindings: { personProfile: '<' },
                    template: 'Hello {{$ctrl.personProfile.firstName}} {{$ctrl.personProfile.lastName}}',
                    controller: core_1.Class({ constructor: function () { } })
                };
                ng1Module.component('ng1', ng1);
                var Ng2 = core_1.Component({
                    selector: 'ng2',
                    template: '<ng1 [personProfile]="goku"></ng1>',
                    directives: [adapter.upgradeNg1Component('ng1')]
                }).Class({
                    constructor: function () { this.goku = { firstName: 'GOKU', lastName: 'SAN' }; }
                });
                ng1Module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                var element = html("<div><ng2></ng2></div>");
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    testing_internal_1.expect(multiTrim(document.body.textContent)).toEqual("Hello GOKU SAN");
                    ref.dispose();
                    async.done();
                });
            }));
            testing_internal_1.it('should support ng2 > ng1 > ng2', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                var ng1 = {
                    template: 'ng1(<ng2b></ng2b>)',
                };
                ng1Module.component('ng1', ng1);
                var Ng2a = core_1.Component({
                    selector: 'ng2a',
                    template: 'ng2a(<ng1></ng1>)',
                    directives: [adapter.upgradeNg1Component('ng1')]
                }).Class({ constructor: function () { } });
                ng1Module.directive('ng2a', adapter.downgradeNg2Component(Ng2a));
                var Ng2b = core_1.Component({ selector: 'ng2b', template: 'ng2b', directives: [] }).Class({
                    constructor: function () { }
                });
                ng1Module.directive('ng2b', adapter.downgradeNg2Component(Ng2b));
                var element = html("<div><ng2a></ng2a></div>");
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    testing_internal_1.expect(multiTrim(document.body.textContent)).toEqual('ng2a(ng1(ng2b))');
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('injection', function () {
            function SomeToken() { }
            testing_internal_1.it('should export ng2 instance to ng1', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var module = angular.module('myExample', []);
                adapter.addProvider({ provide: SomeToken, useValue: 'correct_value' });
                module.factory('someToken', adapter.downgradeNg2Provider(SomeToken));
                adapter.bootstrap(html('<div>'), ['myExample']).ready(function (ref) {
                    testing_internal_1.expect(ref.ng1Injector.get('someToken')).toBe('correct_value');
                    ref.dispose();
                    async.done();
                });
            }));
            testing_internal_1.it('should export ng1 instance to ng2', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var module = angular.module('myExample', []);
                module.value('testValue', 'secreteToken');
                adapter.upgradeNg1Provider('testValue');
                adapter.upgradeNg1Provider('testValue', { asToken: 'testToken' });
                adapter.upgradeNg1Provider('testValue', { asToken: String });
                adapter.bootstrap(html('<div>'), ['myExample']).ready(function (ref) {
                    testing_internal_1.expect(ref.ng2Injector.get('testValue')).toBe('secreteToken');
                    testing_internal_1.expect(ref.ng2Injector.get(String)).toBe('secreteToken');
                    testing_internal_1.expect(ref.ng2Injector.get('testToken')).toBe('secreteToken');
                    ref.dispose();
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('testability', function () {
            testing_internal_1.it('should handle deferred bootstrap', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                var bootstrapResumed = false;
                var element = html('<div></div>');
                window.name = 'NG_DEFER_BOOTSTRAP!' + window.name;
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    testing_internal_1.expect(bootstrapResumed).toEqual(true);
                    ref.dispose();
                    async.done();
                });
                setTimeout(function () {
                    bootstrapResumed = true;
                    window.angular.resumeBootstrap();
                }, 100);
            }));
            testing_internal_1.it('should wait for ng2 testability', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var ng1Module = angular.module('ng1', []);
                var element = html('<div></div>');
                adapter.bootstrap(element, ['ng1']).ready(function (ref) {
                    var ng2Testability = ref.ng2Injector.get(core_1.Testability);
                    ng2Testability.increasePendingRequestCount();
                    var ng2Stable = false;
                    angular.getTestability(element).whenStable(function () {
                        testing_internal_1.expect(ng2Stable).toEqual(true);
                        ref.dispose();
                        async.done();
                    });
                    setTimeout(function () {
                        ng2Stable = true;
                        ng2Testability.decreasePendingRequestCount();
                    }, 100);
                });
            }));
        });
        testing_internal_1.describe('examples', function () {
            testing_internal_1.it('should verify UpgradeAdapter example', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var adapter = new upgrade_1.UpgradeAdapter();
                var module = angular.module('myExample', []);
                module.directive('ng1', function () {
                    return {
                        scope: { title: '=' },
                        transclude: true,
                        template: 'ng1[Hello {{title}}!](<span ng-transclude></span>)'
                    };
                });
                var Ng2 = core_1.Component({
                    selector: 'ng2',
                    inputs: ['name'],
                    template: 'ng2[<ng1 [title]="name">transclude</ng1>](<ng-content></ng-content>)',
                    directives: [adapter.upgradeNg1Component('ng1')]
                }).Class({ constructor: function () { } });
                module.directive('ng2', adapter.downgradeNg2Component(Ng2));
                document.body.innerHTML = '<ng2 name="World">project</ng2>';
                adapter.bootstrap(document.body, ['myExample']).ready(function (ref) {
                    testing_internal_1.expect(multiTrim(document.body.textContent))
                        .toEqual('ng2[ng1[Hello World!](transclude)](project)');
                    ref.dispose();
                    async.done();
                });
            }));
        });
    });
}
exports.main = main;
function multiTrim(text) {
    return text.replace(/\n/g, '').replace(/\s\s+/g, ' ').trim();
}
function html(html) {
    var body = document.body;
    body.innerHTML = html;
    if (body.childNodes.length == 1 && body.firstChild instanceof HTMLElement)
        return body.firstChild;
    return body;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBncmFkZV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci91cGdyYWRlL3Rlc3QvdXBncmFkZV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBb0YsZUFBZSxDQUFDLENBQUE7QUFDcEcsaUNBQStFLHdDQUF3QyxDQUFDLENBQUE7QUFDeEgsd0JBQTZCLGtCQUFrQixDQUFDLENBQUE7QUFDaEQsSUFBWSxPQUFPLFdBQU0saUNBQWlDLENBQUMsQ0FBQTtBQUUzRDtJQUNFLDJCQUFRLENBQUMscUJBQXFCLEVBQUU7UUFDOUIsVUFBVSxDQUFDLGNBQU0sT0FBQSxzQkFBZSxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztRQUNwQyxTQUFTLENBQUMsY0FBTSxPQUFBLHNCQUFlLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1FBRW5DLHFCQUFFLENBQUMsOEJBQThCLEVBQUUsY0FBTSxPQUFBLHlCQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FBQztRQUVoRixxQkFBRSxDQUFDLDREQUE0RCxFQUM1RCx5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO1lBQ3JELElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzFDLElBQUksR0FBRyxHQUFHLGdCQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSx3Q0FBd0MsRUFBQyxDQUFDO2lCQUMzRSxLQUFLLENBQUMsRUFBQyxXQUFXLEVBQUUsY0FBWSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBRW5ELElBQUksT0FBTyxHQUNQLElBQUksQ0FBQyx1RUFBdUUsQ0FBQyxDQUFD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