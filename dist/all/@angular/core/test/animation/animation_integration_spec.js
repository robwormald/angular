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
var common_1 = require('@angular/common');
var testing_1 = require('@angular/core/testing');
var animation_driver_1 = require('@angular/platform-browser/src/dom/animation_driver');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var mock_animation_driver_1 = require('@angular/platform-browser/testing/mock_animation_driver');
var exceptions_1 = require('../../../compiler/src/facade/exceptions');
var index_1 = require('../../index');
var animation_constants_1 = require('../../src/animation/animation_constants');
var metadata_1 = require('../../src/animation/metadata');
var lang_1 = require('../../src/facade/lang');
var testing_2 = require('../../testing');
var mock_animation_player_1 = require('../../testing/mock_animation_player');
var testing_internal_1 = require('../../testing/testing_internal');
function main() {
    testing_internal_1.describe('jit', function () { declareTests({ useJit: true }); });
    testing_internal_1.describe('no jit', function () { declareTests({ useJit: false }); });
}
exports.main = main;
function declareTests(_a) {
    var useJit = _a.useJit;
    testing_internal_1.describe('animation tests', function () {
        testing_internal_1.beforeEachProviders(function () {
            testing_2.configureCompiler({ useJit: useJit });
            testing_2.configureModule({ providers: [{ provide: animation_driver_1.AnimationDriver, useClass: mock_animation_driver_1.MockAnimationDriver }] });
        });
        var makeAnimationCmp = function (tcb, tpl, animationEntry, callback, failure) {
            if (callback === void 0) { callback = null; }
            if (failure === void 0) { failure = null; }
            var entries = lang_1.isArray(animationEntry) ? animationEntry :
                [animationEntry];
            tcb = tcb.overrideTemplate(DummyIfCmp, tpl);
            tcb = tcb.overrideAnimations(DummyIfCmp, entries);
            var promise = tcb.createAsync(DummyIfCmp).then(function (root) { callback(root); });
            if (lang_1.isPresent(failure)) {
                promise.catch(failure);
            }
            testing_2.tick();
        };
        testing_internal_1.describe('animation triggers', function () {
            testing_internal_1.it('should trigger a state change animation from void => state', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                makeAnimationCmp(tcb, '<div *ngIf="exp" [@myAnimation]="exp"></div>', metadata_1.trigger('myAnimation', [metadata_1.transition('void => *', [metadata_1.style({ 'opacity': 0 }), metadata_1.animate(500, metadata_1.style({ 'opacity': 1 }))])]), function (fixture /** TODO #9100 */) {
                    var cmp = fixture.debugElement.componentInstance;
                    cmp.exp = true;
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(driver.log.length).toEqual(1);
                    var keyframes2 = driver.log[0]['keyframeLookup'];
                    testing_internal_1.expect(keyframes2.length).toEqual(2);
                    testing_internal_1.expect(keyframes2[0]).toEqual([0, { 'opacity': 0 }]);
                    testing_internal_1.expect(keyframes2[1]).toEqual([1, { 'opacity': 1 }]);
                });
            })));
            testing_internal_1.it('should trigger a state change animation from state => void', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                makeAnimationCmp(tcb, '<div *ngIf="exp" [@myAnimation]="exp"></div>', metadata_1.trigger('myAnimation', [metadata_1.transition('* => void', [metadata_1.style({ 'opacity': 1 }), metadata_1.animate(500, metadata_1.style({ 'opacity': 0 }))])]), function (fixture /** TODO #9100 */) {
                    var cmp = fixture.debugElement.componentInstance;
                    cmp.exp = true;
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    cmp.exp = false;
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(driver.log.length).toEqual(1);
                    var keyframes2 = driver.log[0]['keyframeLookup'];
                    testing_internal_1.expect(keyframes2.length).toEqual(2);
                    testing_internal_1.expect(keyframes2[0]).toEqual([0, { 'opacity': 1 }]);
                    testing_internal_1.expect(keyframes2[1]).toEqual([1, { 'opacity': 0 }]);
                });
            })));
            testing_internal_1.it('should animate the element when the expression changes between states', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                tcb.overrideAnimations(DummyIfCmp, [metadata_1.trigger('myAnimation', [metadata_1.transition('* => state1', [
                            metadata_1.style({ 'background': 'red' }),
                            metadata_1.animate('0.5s 1s ease-out', metadata_1.style({ 'background': 'blue' }))
                        ])])])
                    .createAsync(DummyIfCmp)
                    .then(function (fixture) {
                    testing_2.tick();
                    var cmp = fixture.debugElement.componentInstance;
                    cmp.exp = 'state1';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(driver.log.length).toEqual(1);
                    var animation1 = driver.log[0];
                    testing_internal_1.expect(animation1['duration']).toEqual(500);
                    testing_internal_1.expect(animation1['delay']).toEqual(1000);
                    testing_internal_1.expect(animation1['easing']).toEqual('ease-out');
                    var startingStyles = animation1['startingStyles'];
                    testing_internal_1.expect(startingStyles).toEqual({ 'background': 'red' });
                    var keyframes = animation1['keyframeLookup'];
                    testing_internal_1.expect(keyframes[0]).toEqual([0, { 'background': 'red' }]);
                    testing_internal_1.expect(keyframes[1]).toEqual([1, { 'background': 'blue' }]);
                });
            })));
            testing_internal_1.it('should animate between * and void and back even when no expression is assigned', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                tcb = tcb.overrideTemplate(DummyIfCmp, "\n              <div [@myAnimation] *ngIf=\"exp\"></div>\n            ");
                tcb.overrideAnimations(DummyIfCmp, [metadata_1.trigger('myAnimation', [
                        metadata_1.state('*', metadata_1.style({ 'opacity': '1' })),
                        metadata_1.state('void', metadata_1.style({ 'opacity': '0' })),
                        metadata_1.transition('* => *', [metadata_1.animate('500ms')])
                    ])])
                    .createAsync(DummyIfCmp)
                    .then(function (fixture) {
                    testing_2.tick();
                    var cmp = fixture.debugElement.componentInstance;
                    cmp.exp = true;
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    var result = driver.log.pop();
                    testing_internal_1.expect(result['duration']).toEqual(500);
                    testing_internal_1.expect(result['startingStyles']).toEqual({ 'opacity': '0' });
                    testing_internal_1.expect(result['keyframeLookup']).toEqual([
                        [0, { 'opacity': '0' }], [1, { 'opacity': '1' }]
                    ]);
                    cmp.exp = false;
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    result = driver.log.pop();
                    testing_internal_1.expect(result['duration']).toEqual(500);
                    testing_internal_1.expect(result['startingStyles']).toEqual({ 'opacity': '1' });
                    testing_internal_1.expect(result['keyframeLookup']).toEqual([
                        [0, { 'opacity': '1' }], [1, { 'opacity': '0' }]
                    ]);
                });
            })));
            testing_internal_1.it('should combine repeated style steps into a single step', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                tcb.overrideAnimations(DummyIfCmp, [
                    metadata_1.trigger('myAnimation', [
                        metadata_1.transition('void => *', [
                            metadata_1.style({ 'background': 'red' }),
                            metadata_1.style({ 'width': '100px' }),
                            metadata_1.style({ 'background': 'gold' }),
                            metadata_1.style({ 'height': 111 }),
                            metadata_1.animate('999ms', metadata_1.style({ 'width': '200px', 'background': 'blue' })),
                            metadata_1.style({ 'opacity': '1' }),
                            metadata_1.style({ 'border-width': '100px' }),
                            metadata_1.animate('999ms', metadata_1.style({ 'opacity': '0', 'height': '200px', 'border-width': '10px' }))
                        ])
                    ])
                ])
                    .createAsync(DummyIfCmp)
                    .then(function (fixture) {
                    testing_2.tick();
                    var cmp = fixture.debugElement.componentInstance;
                    cmp.exp = true;
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(driver.log.length).toEqual(2);
                    var animation1 = driver.log[0];
                    testing_internal_1.expect(animation1['duration']).toEqual(999);
                    testing_internal_1.expect(animation1['delay']).toEqual(0);
                    testing_internal_1.expect(animation1['easing']).toEqual(null);
                    testing_internal_1.expect(animation1['startingStyles'])
                        .toEqual({ 'background': 'gold', 'width': '100px', 'height': 111 });
                    var keyframes1 = animation1['keyframeLookup'];
                    testing_internal_1.expect(keyframes1[0]).toEqual([0, { 'background': 'gold', 'width': '100px' }]);
                    testing_internal_1.expect(keyframes1[1]).toEqual([1, { 'background': 'blue', 'width': '200px' }]);
                    var animation2 = driver.log[1];
                    testing_internal_1.expect(animation2['duration']).toEqual(999);
                    testing_internal_1.expect(animation2['delay']).toEqual(0);
                    testing_internal_1.expect(animation2['easing']).toEqual(null);
                    testing_internal_1.expect(animation2['startingStyles'])
                        .toEqual({ 'opacity': '1', 'border-width': '100px' });
                    var keyframes2 = animation2['keyframeLookup'];
                    testing_internal_1.expect(keyframes2[0])
                        .toEqual([0, { 'opacity': '1', 'height': 111, 'border-width': '100px' }]);
                    testing_internal_1.expect(keyframes2[1])
                        .toEqual([1, { 'opacity': '0', 'height': '200px', 'border-width': '10px' }]);
                });
            })));
            testing_internal_1.describe('groups/sequences', function () {
                var assertPlaying = function (player, isPlaying /** TODO #9100 */) {
                    var method = 'play';
                    var lastEntry = player.log.length > 0 ? player.log[player.log.length - 1] : null;
                    if (lang_1.isPresent(lastEntry)) {
                        if (isPlaying) {
                            testing_internal_1.expect(lastEntry).toEqual(method);
                        }
                        else {
                            testing_internal_1.expect(lastEntry).not.toEqual(method);
                        }
                    }
                };
                testing_internal_1.it('should run animations in sequence one by one if a top-level array is used', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                    tcb.overrideAnimations(DummyIfCmp, [metadata_1.trigger('myAnimation', [metadata_1.transition('void => *', [
                                metadata_1.style({ 'opacity': '0' }),
                                metadata_1.animate(1000, metadata_1.style({ 'opacity': '0.5' })),
                                metadata_1.animate('1000ms', metadata_1.style({ 'opacity': '0.8' })),
                                metadata_1.animate('1s', metadata_1.style({ 'opacity': '1' })),
                            ])])])
                        .createAsync(DummyIfCmp)
                        .then(function (fixture) {
                        testing_2.tick();
                        var cmp = fixture.debugElement.componentInstance;
                        cmp.exp = true;
                        fixture.detectChanges();
                        testing_2.flushMicrotasks();
                        testing_internal_1.expect(driver.log.length).toEqual(3);
                        var player1 = driver.log[0]['player'];
                        var player2 = driver.log[1]['player'];
                        var player3 = driver.log[2]['player'];
                        assertPlaying(player1, true);
                        assertPlaying(player2, false);
                        assertPlaying(player3, false);
                        player1.finish();
                        assertPlaying(player1, false);
                        assertPlaying(player2, true);
                        assertPlaying(player3, false);
                        player2.finish();
                        assertPlaying(player1, false);
                        assertPlaying(player2, false);
                        assertPlaying(player3, true);
                        player3.finish();
                        assertPlaying(player1, false);
                        assertPlaying(player2, false);
                        assertPlaying(player3, false);
                    });
                })));
                testing_internal_1.it('should run animations in parallel if a group is used', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                    tcb.overrideAnimations(DummyIfCmp, [
                        metadata_1.trigger('myAnimation', [
                            metadata_1.transition('void => *', [
                                metadata_1.style({ 'width': 0, 'height': 0 }),
                                metadata_1.group([metadata_1.animate(1000, metadata_1.style({ 'width': 100 })), metadata_1.animate(5000, metadata_1.style({ 'height': 500 }))]),
                                metadata_1.group([metadata_1.animate(1000, metadata_1.style({ 'width': 0 })), metadata_1.animate(5000, metadata_1.style({ 'height': 0 }))])
                            ])
                        ])
                    ])
                        .createAsync(DummyIfCmp)
                        .then(function (fixture) {
                        testing_2.tick();
                        var cmp = fixture.debugElement.componentInstance;
                        cmp.exp = true;
                        fixture.detectChanges();
                        testing_2.flushMicrotasks();
                        testing_internal_1.expect(driver.log.length).toEqual(5);
                        var player1 = driver.log[0]['player'];
                        var player2 = driver.log[1]['player'];
                        var player3 = driver.log[2]['player'];
                        var player4 = driver.log[3]['player'];
                        var player5 = driver.log[4]['player'];
                        assertPlaying(player1, true);
                        assertPlaying(player2, false);
                        assertPlaying(player3, false);
                        assertPlaying(player4, false);
                        assertPlaying(player5, false);
                        player1.finish();
                        assertPlaying(player1, false);
                        assertPlaying(player2, true);
                        assertPlaying(player3, true);
                        assertPlaying(player4, false);
                        assertPlaying(player5, false);
                        player2.finish();
                        assertPlaying(player1, false);
                        assertPlaying(player2, false);
                        assertPlaying(player3, true);
                        assertPlaying(player4, false);
                        assertPlaying(player5, false);
                        player3.finish();
                        assertPlaying(player1, false);
                        assertPlaying(player2, false);
                        assertPlaying(player3, false);
                        assertPlaying(player4, true);
                        assertPlaying(player5, true);
                    });
                })));
            });
            testing_internal_1.describe('keyframes', function () {
                testing_internal_1.it('should create an animation step with multiple keyframes', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                    tcb.overrideAnimations(DummyIfCmp, [metadata_1.trigger('myAnimation', [metadata_1.transition('void => *', [metadata_1.animate(1000, metadata_1.keyframes([
                                    metadata_1.style([{
                                            'width': 0,
                                            offset: 0
                                        }]),
                                    metadata_1.style([{
                                            'width': 100,
                                            offset: 0.25
                                        }]),
                                    metadata_1.style([{
                                            'width': 200,
                                            offset: 0.75
                                        }]),
                                    metadata_1.style([{
                                            'width': 300,
                                            offset: 1
                                        }])
                                ]))])])])
                        .createAsync(DummyIfCmp)
                        .then(function (fixture) {
                        testing_2.tick();
                        var cmp = fixture.debugElement
                            .componentInstance;
                        cmp.exp = true;
                        fixture.detectChanges();
                        testing_2.flushMicrotasks();
                        var keyframes = driver
                            .log[0]['keyframeLookup'];
                        testing_internal_1.expect(keyframes.length)
                            .toEqual(4);
                        testing_internal_1.expect(keyframes[0]).toEqual([
                            0, { 'width': 0 }
                        ]);
                        testing_internal_1.expect(keyframes[1]).toEqual([
                            0.25, { 'width': 100 }
                        ]);
                        testing_internal_1.expect(keyframes[2]).toEqual([
                            0.75, { 'width': 200 }
                        ]);
                        testing_internal_1.expect(keyframes[3]).toEqual([
                            1, { 'width': 300 }
                        ]);
                    });
                })));
                testing_internal_1.it('should fetch any keyframe styles that are not defined in the first keyframe from the previous entries or getCompuedStyle', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                    tcb.overrideAnimations(DummyIfCmp, [
                        metadata_1.trigger('myAnimation', [
                            metadata_1.transition('void => *', [
                                metadata_1.style({ 'color': 'white' }),
                                metadata_1.animate(1000, metadata_1.style({ 'color': 'silver' })),
                                metadata_1.animate(1000, metadata_1.keyframes([
                                    metadata_1.style([{ 'color': 'gold', offset: 0.25 }]),
                                    metadata_1.style([{ 'color': 'bronze', 'background-color': 'teal', offset: 0.50 }]),
                                    metadata_1.style([{ 'color': 'platinum', offset: 0.75 }]),
                                    metadata_1.style([{ 'color': 'diamond', offset: 1 }])
                                ]))
                            ])
                        ])
                    ])
                        .createAsync(DummyIfCmp)
                        .then(function (fixture) {
                        testing_2.tick();
                        var cmp = fixture.debugElement.componentInstance;
                        cmp.exp = true;
                        fixture.detectChanges();
                        testing_2.flushMicrotasks();
                        var keyframes = driver.log[1]['keyframeLookup'];
                        testing_internal_1.expect(keyframes.length).toEqual(5);
                        testing_internal_1.expect(keyframes[0]).toEqual([0, { 'color': 'silver', 'background-color': metadata_1.AUTO_STYLE }]);
                        testing_internal_1.expect(keyframes[1]).toEqual([0.25, { 'color': 'gold' }]);
                        testing_internal_1.expect(keyframes[2]).toEqual([0.50, { 'color': 'bronze', 'background-color': 'teal' }]);
                        testing_internal_1.expect(keyframes[3]).toEqual([0.75, { 'color': 'platinum' }]);
                        testing_internal_1.expect(keyframes[4]).toEqual([1, { 'color': 'diamond', 'background-color': 'teal' }]);
                    });
                })));
            });
            testing_internal_1.it('should cancel the previously running animation active with the same element/animationName pair', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                tcb.overrideAnimations(DummyIfCmp, [metadata_1.trigger('myAnimation', [metadata_1.transition('* => *', [metadata_1.style({ 'opacity': 0 }), metadata_1.animate(500, metadata_1.style({ 'opacity': 1 }))])])])
                    .createAsync(DummyIfCmp)
                    .then(function (fixture) {
                    testing_2.tick();
                    var cmp = fixture.debugElement.componentInstance;
                    cmp.exp = 'state1';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    var enterCompleted = false;
                    var enterPlayer = driver.log[0]['player'];
                    enterPlayer.onDone(function () { return enterCompleted = true; });
                    testing_internal_1.expect(enterCompleted).toEqual(false);
                    cmp.exp = 'state2';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(enterCompleted).toEqual(true);
                });
            })));
            testing_internal_1.it('should destroy all animation players once the animation is complete', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                tcb.overrideAnimations(DummyIfCmp, [
                    metadata_1.trigger('myAnimation', [
                        metadata_1.transition('void => *', [
                            metadata_1.style({ 'background': 'red', 'opacity': 0.5 }),
                            metadata_1.animate(500, metadata_1.style({ 'background': 'black' })),
                            metadata_1.group([
                                metadata_1.animate(500, metadata_1.style({ 'background': 'black' })),
                                metadata_1.animate(1000, metadata_1.style({ 'opacity': '0.2' })),
                            ]),
                            metadata_1.sequence([
                                metadata_1.animate(500, metadata_1.style({ 'opacity': '1' })),
                                metadata_1.animate(1000, metadata_1.style({ 'background': 'white' }))
                            ])
                        ])
                    ])
                ]).createAsync(DummyIfCmp)
                    .then(function (fixture) {
                    testing_2.tick();
                    var cmp = fixture.debugElement.componentInstance;
                    cmp.exp = true;
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(driver.log.length).toEqual(5);
                    driver.log.forEach(function (entry) { return entry['player'].finish(); });
                    driver.log.forEach(function (entry) {
                        var player = entry['player'];
                        testing_internal_1.expect(player.log[player.log.length - 2]).toEqual('finish');
                        testing_internal_1.expect(player.log[player.log.length - 1]).toEqual('destroy');
                    });
                });
            })));
            testing_internal_1.it('should use first matched animation when multiple animations are registered', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                tcb = tcb.overrideTemplate(DummyIfCmp, "\n                      <div [@rotate]=\"exp\"></div>\n                      <div [@rotate]=\"exp2\"></div>\n                    ");
                tcb.overrideAnimations(DummyIfCmp, [
                    metadata_1.trigger('rotate', [
                        metadata_1.transition('start => *', [
                            metadata_1.style({ 'color': 'white' }),
                            metadata_1.animate(500, metadata_1.style({ 'color': 'red' }))
                        ]),
                        metadata_1.transition('start => end', [
                            metadata_1.style({ 'color': 'white' }),
                            metadata_1.animate(500, metadata_1.style({ 'color': 'pink' }))
                        ])
                    ]),
                ])
                    .createAsync(DummyIfCmp)
                    .then(function (fixture) {
                    testing_2.tick();
                    var cmp = fixture.debugElement.componentInstance;
                    cmp.exp = 'start';
                    cmp.exp2 = 'start';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(driver.log.length).toEqual(0);
                    cmp.exp = 'something';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(driver.log.length).toEqual(1);
                    var animation1 = driver.log[0];
                    var keyframes1 = animation1['keyframeLookup'];
                    var toStyles1 = keyframes1[1][1];
                    testing_internal_1.expect(toStyles1['color']).toEqual('red');
                    cmp.exp2 = 'end';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(driver.log.length).toEqual(2);
                    var animation2 = driver.log[1];
                    var keyframes2 = animation2['keyframeLookup'];
                    var toStyles2 = keyframes2[1][1];
                    testing_internal_1.expect(toStyles2['color']).toEqual('red');
                });
            })));
            testing_internal_1.it('should not remove the element until the void transition animation is complete', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                makeAnimationCmp(tcb, '<div class="my-if" *ngIf="exp" [@myAnimation]></div>', metadata_1.trigger('myAnimation', [metadata_1.transition('* => void', [metadata_1.animate(1000, metadata_1.style({ 'opacity': 0 }))])]), function (fixture /** TODO #9100 */) {
                    testing_2.tick();
                    var cmp = fixture.debugElement.componentInstance;
                    cmp.exp = true;
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    cmp.exp = false;
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    var player = driver.log[0]['player'];
                    var container = fixture.debugElement.nativeElement;
                    var ifElm = dom_adapter_1.getDOM().querySelector(container, '.my-if');
                    testing_internal_1.expect(ifElm).toBeTruthy();
                    player.finish();
                    ifElm = dom_adapter_1.getDOM().querySelector(container, '.my-if');
                    testing_internal_1.expect(ifElm).toBeFalsy();
                });
            })));
            testing_internal_1.it('should fill an animation with the missing style values if not defined within an earlier style step', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                makeAnimationCmp(tcb, '<div [@myAnimation]="exp"></div>', metadata_1.trigger('myAnimation', [metadata_1.transition('* => *', [
                        metadata_1.animate(1000, metadata_1.style({ 'opacity': 0 })),
                        metadata_1.animate(1000, metadata_1.style({ 'opacity': 1 }))
                    ])]), function (fixture /** TODO #9100 */) {
                    testing_2.tick();
                    var cmp = fixture.debugElement.componentInstance;
                    cmp.exp = 'state1';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    var animation1 = driver.log[0];
                    var keyframes1 = animation1['keyframeLookup'];
                    testing_internal_1.expect(keyframes1[0]).toEqual([0, { 'opacity': metadata_1.AUTO_STYLE }]);
                    testing_internal_1.expect(keyframes1[1]).toEqual([1, { 'opacity': 0 }]);
                    var animation2 = driver.log[1];
                    var keyframes2 = animation2['keyframeLookup'];
                    testing_internal_1.expect(keyframes2[0]).toEqual([0, { 'opacity': 0 }]);
                    testing_internal_1.expect(keyframes2[1]).toEqual([1, { 'opacity': 1 }]);
                });
            })));
            testing_internal_1.it('should perform two transitions in parallel if defined in different state triggers', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                makeAnimationCmp(tcb, '<div [@one]="exp" [@two]="exp2"></div>', [
                    metadata_1.trigger('one', [metadata_1.transition('state1 => state2', [metadata_1.style({ 'opacity': 0 }), metadata_1.animate(1000, metadata_1.style({ 'opacity': 1 }))])]),
                    metadata_1.trigger('two', [metadata_1.transition('state1 => state2', [metadata_1.style({ 'width': 100 }), metadata_1.animate(1000, metadata_1.style({ 'width': 1000 }))])])
                ], function (fixture /** TODO #9100 */) {
                    testing_2.tick();
                    var cmp = fixture.debugElement.componentInstance;
                    cmp.exp = 'state1';
                    cmp.exp2 = 'state1';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    cmp.exp = 'state2';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(driver.log.length).toEqual(1);
                    var count = 0;
                    var animation1 = driver.log[0];
                    var player1 = animation1['player'];
                    player1.onDone(function () { return count++; });
                    testing_internal_1.expect(count).toEqual(0);
                    cmp.exp2 = 'state2';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(driver.log.length).toEqual(2);
                    testing_internal_1.expect(count).toEqual(0);
                    var animation2 = driver.log[1];
                    var player2 = animation2['player'];
                    player2.onDone(function () { return count++; });
                    testing_internal_1.expect(count).toEqual(0);
                    player1.finish();
                    testing_internal_1.expect(count).toEqual(1);
                    player2.finish();
                    testing_internal_1.expect(count).toEqual(2);
                });
            })));
        });
        testing_internal_1.describe('DOM order tracking', function () {
            if (!dom_adapter_1.getDOM().supportsDOMEvents())
                return;
            testing_internal_1.beforeEachProviders(function () { return [{ provide: animation_driver_1.AnimationDriver, useClass: InnerContentTrackingAnimationDriver }]; });
            testing_internal_1.it('should evaluate all inner children and their bindings before running the animation on a parent', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                makeAnimationCmp(tcb, "<div class=\"target\" [@status]=\"exp\">\n                            <div *ngIf=\"exp2\" class=\"inner\">inner child guy</div>\n                        </div>", [metadata_1.trigger('status', [
                        metadata_1.state('final', metadata_1.style({ 'height': '*' })),
                        metadata_1.transition('* => *', [metadata_1.animate(1000)])
                    ])], function (fixture /** TODO #9100 */) {
                    testing_2.tick();
                    var cmp = fixture.debugElement.componentInstance;
                    var node = dom_adapter_1.getDOM().querySelector(fixture.debugElement.nativeElement, '.target');
                    cmp.exp = true;
                    cmp.exp2 = true;
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    var animation = driver.log.pop();
                    var player = animation['player'];
                    testing_internal_1.expect(player.capturedInnerText).toEqual('inner child guy');
                });
            })));
            testing_internal_1.it('should run the initialization stage after all children have been evaluated', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                makeAnimationCmp(tcb, "<div class=\"target\" [@status]=\"exp\">\n                    <div style=\"height:20px\"></div>\n                    <div *ngIf=\"exp2\" style=\"height:40px;\" class=\"inner\">inner child guy</div>\n                  </div>", [metadata_1.trigger('status', [metadata_1.transition('* => *', metadata_1.sequence([
                            metadata_1.animate(1000, metadata_1.style({ height: 0 })),
                            metadata_1.animate(1000, metadata_1.style({ height: '*' }))
                        ]))])], function (fixture /** TODO #9100 */) {
                    testing_2.tick();
                    var cmp = fixture.debugElement.componentInstance;
                    cmp.exp = true;
                    cmp.exp2 = true;
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    fixture.detectChanges();
                    var animation = driver.log.pop();
                    var player = animation['player'];
                    // this is just to confirm that the player is using the parent element
                    testing_internal_1.expect(player.element.className).toEqual('target');
                    testing_internal_1.expect(player.computedHeight).toEqual('60px');
                });
            })));
            testing_internal_1.it('should not trigger animations more than once within a view that contains multiple animation triggers', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                makeAnimationCmp(tcb, "<div *ngIf=\"exp\" @one><div class=\"inner\"></div></div>\n                  <div *ngIf=\"exp2\" @two><div class=\"inner\"></div></div>", [
                    metadata_1.trigger('one', [metadata_1.transition('* => *', [metadata_1.animate(1000)])]),
                    metadata_1.trigger('two', [metadata_1.transition('* => *', [metadata_1.animate(2000)])])
                ], function (fixture /** TODO #9100 */) {
                    var cmp = fixture.debugElement.componentInstance;
                    cmp.exp = true;
                    cmp.exp2 = true;
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(driver.log.length).toEqual(2);
                    var animation1 = driver.log.pop();
                    var animation2 = driver.log.pop();
                    var player1 = animation1['player'];
                    var player2 = animation2['player'];
                    testing_internal_1.expect(player1.playAttempts).toEqual(1);
                    testing_internal_1.expect(player2.playAttempts).toEqual(1);
                });
            })));
            testing_internal_1.it('should trigger animations when animations are detached from the page', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                makeAnimationCmp(tcb, "<div *ngIf=\"exp\" @trigger><div class=\"inner\"></div></div>", [
                    metadata_1.trigger('trigger', [metadata_1.transition('* => void', [metadata_1.animate(1000)])]),
                ], function (fixture /** TODO #9100 */) {
                    var cmp = fixture.debugElement.componentInstance;
                    cmp.exp = true;
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(driver.log.length).toEqual(0);
                    cmp.exp = false;
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(driver.log.length).toEqual(1);
                    var animation = driver.log.pop();
                    var player = animation['player'];
                    testing_internal_1.expect(player.playAttempts).toEqual(1);
                });
            })));
        });
        testing_internal_1.describe('animation states', function () {
            testing_internal_1.it('should throw an error when an animation is referenced that isn\'t defined within the component annotation', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                makeAnimationCmp(tcb, '<div class="target" [@status]="exp"></div>', [], function () {
                    throw new exceptions_1.BaseException('Error: expected animations for DummyIfCmp to throw an error within this spec');
                }, function (e) {
                    var message = e.message;
                    testing_internal_1.expect(message).toMatch(/Animation parsing for DummyIfCmp has failed due to the following errors:/);
                    testing_internal_1.expect(message).toMatch(/- couldn't find an animation entry for status/);
                });
            })));
            testing_internal_1.it('should be permitted to be registered on the host element', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                tcb = tcb.overrideAnimations(DummyLoadingCmp, [metadata_1.trigger('loading', [
                        metadata_1.state('final', metadata_1.style({ 'background': 'grey' })),
                        metadata_1.transition('* => final', [metadata_1.animate(1000)])
                    ])]);
                tcb.createAsync(DummyLoadingCmp).then(function (fixture) {
                    var cmp = fixture.debugElement.componentInstance;
                    cmp.exp = 'final';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    var animation = driver.log.pop();
                    var keyframes = animation['keyframeLookup'];
                    testing_internal_1.expect(keyframes[1]).toEqual([1, { 'background': 'grey' }]);
                });
                testing_2.tick();
            })));
            testing_internal_1.it('should retain the destination animation state styles once the animation is complete', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                makeAnimationCmp(tcb, '<div class="target" [@status]="exp"></div>', [metadata_1.trigger('status', [
                        metadata_1.state('final', metadata_1.style({ 'top': '100px' })),
                        metadata_1.transition('* => final', [metadata_1.animate(1000)])
                    ])], function (fixture /** TODO #9100 */) {
                    testing_2.tick();
                    var cmp = fixture.debugElement.componentInstance;
                    var node = dom_adapter_1.getDOM().querySelector(fixture.debugElement.nativeElement, '.target');
                    cmp.exp = 'final';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    var animation = driver.log[0];
                    var player = animation['player'];
                    player.finish();
                    testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(node, 'top')).toEqual('100px');
                });
            })));
            testing_internal_1.it('should animate to and retain the default animation state styles once the animation is complete if defined', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                makeAnimationCmp(tcb, '<div class="target" [@status]="exp"></div>', [metadata_1.trigger('status', [
                        metadata_1.state(animation_constants_1.DEFAULT_STATE, metadata_1.style({ 'background': 'grey' })),
                        metadata_1.state('green', metadata_1.style({ 'background': 'green' })),
                        metadata_1.state('red', metadata_1.style({ 'background': 'red' })),
                        metadata_1.transition('* => *', [metadata_1.animate(1000)])
                    ])], function (fixture /** TODO #9100 */) {
                    testing_2.tick();
                    var cmp = fixture.debugElement.componentInstance;
                    var node = dom_adapter_1.getDOM().querySelector(fixture.debugElement.nativeElement, '.target');
                    cmp.exp = 'green';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    var animation = driver.log.pop();
                    var keyframes = animation['keyframeLookup'];
                    testing_internal_1.expect(keyframes[1]).toEqual([1, { 'background': 'green' }]);
                    cmp.exp = 'blue';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    animation = driver.log.pop();
                    keyframes = animation['keyframeLookup'];
                    testing_internal_1.expect(keyframes[0]).toEqual([0, { 'background': 'green' }]);
                    testing_internal_1.expect(keyframes[1]).toEqual([1, { 'background': 'grey' }]);
                    cmp.exp = 'red';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    animation = driver.log.pop();
                    keyframes = animation['keyframeLookup'];
                    testing_internal_1.expect(keyframes[0]).toEqual([0, { 'background': 'grey' }]);
                    testing_internal_1.expect(keyframes[1]).toEqual([1, { 'background': 'red' }]);
                    cmp.exp = 'orange';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    animation = driver.log.pop();
                    keyframes = animation['keyframeLookup'];
                    testing_internal_1.expect(keyframes[0]).toEqual([0, { 'background': 'red' }]);
                    testing_internal_1.expect(keyframes[1]).toEqual([1, { 'background': 'grey' }]);
                });
            })));
            testing_internal_1.it('should seed in the origin animation state styles into the first animation step', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                makeAnimationCmp(tcb, '<div class="target" [@status]="exp"></div>', [metadata_1.trigger('status', [
                        metadata_1.state('void', metadata_1.style({ 'height': '100px' })),
                        metadata_1.transition('* => *', [metadata_1.animate(1000)])
                    ])], function (fixture /** TODO #9100 */) {
                    testing_2.tick();
                    var cmp = fixture.debugElement.componentInstance;
                    var node = dom_adapter_1.getDOM().querySelector(fixture.debugElement.nativeElement, '.target');
                    cmp.exp = 'final';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    var animation = driver.log[0];
                    testing_internal_1.expect(animation['startingStyles']).toEqual({ 'height': '100px' });
                });
            })));
            testing_internal_1.it('should perform a state change even if there is no transition that is found', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                makeAnimationCmp(tcb, '<div class="target" [@status]="exp"></div>', [metadata_1.trigger('status', [
                        metadata_1.state('void', metadata_1.style({ 'width': '0px' })),
                        metadata_1.state('final', metadata_1.style({ 'width': '100px' })),
                    ])], function (fixture /** TODO #9100 */) {
                    testing_2.tick();
                    var cmp = fixture.debugElement.componentInstance;
                    var node = dom_adapter_1.getDOM().querySelector(fixture.debugElement.nativeElement, '.target');
                    cmp.exp = 'final';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(driver.log.length).toEqual(0);
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(node, 'width')).toEqual('100px');
                });
            })));
            testing_internal_1.it('should allow multiple states to be defined with the same styles', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                makeAnimationCmp(tcb, '<div class="target" [@status]="exp"></div>', [metadata_1.trigger('status', [
                        metadata_1.state('a, c', metadata_1.style({ 'height': '100px' })),
                        metadata_1.state('b, d', metadata_1.style({ 'width': '100px' })),
                    ])], function (fixture /** TODO #9100 */) {
                    testing_2.tick();
                    var cmp = fixture.debugElement.componentInstance;
                    var node = dom_adapter_1.getDOM().querySelector(fixture.debugElement.nativeElement, '.target');
                    cmp.exp = 'a';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(node, 'height')).toEqual('100px');
                    testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(node, 'width')).not.toEqual('100px');
                    cmp.exp = 'b';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(node, 'height')).not.toEqual('100px');
                    testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(node, 'width')).toEqual('100px');
                    cmp.exp = 'c';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(node, 'height')).toEqual('100px');
                    testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(node, 'width')).not.toEqual('100px');
                    cmp.exp = 'd';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(node, 'height')).not.toEqual('100px');
                    testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(node, 'width')).toEqual('100px');
                    cmp.exp = 'e';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(node, 'height')).not.toEqual('100px');
                    testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(node, 'width')).not.toEqual('100px');
                });
            })));
            testing_internal_1.it('should allow multiple transitions to be defined with the same sequence', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                makeAnimationCmp(tcb, '<div class="target" [@status]="exp"></div>', [metadata_1.trigger('status', [
                        metadata_1.transition('a => b, b => c', [metadata_1.animate(1000)]),
                        metadata_1.transition('* => *', [metadata_1.animate(300)])
                    ])], function (fixture /** TODO #9100 */) {
                    testing_2.tick();
                    var cmp = fixture.debugElement.componentInstance;
                    var node = dom_adapter_1.getDOM().querySelector(fixture.debugElement.nativeElement, '.target');
                    cmp.exp = 'a';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(driver.log.pop()['duration']).toEqual(300);
                    cmp.exp = 'b';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(driver.log.pop()['duration']).toEqual(1000);
                    cmp.exp = 'c';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(driver.log.pop()['duration']).toEqual(1000);
                    cmp.exp = 'd';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    testing_internal_1.expect(driver.log.pop()['duration']).toEqual(300);
                });
            })));
            testing_internal_1.it('should balance the animation with the origin/destination styles as keyframe animation properties', testing_internal_1.inject([testing_1.TestComponentBuilder, animation_driver_1.AnimationDriver], testing_2.fakeAsync(function (tcb, driver) {
                makeAnimationCmp(tcb, '<div class="target" [@status]="exp"></div>', [metadata_1.trigger('status', [
                        metadata_1.state('void', metadata_1.style({ 'height': '100px', 'opacity': 0 })),
                        metadata_1.state('final', metadata_1.style({ 'height': '333px', 'width': '200px' })),
                        metadata_1.transition('void => final', [metadata_1.animate(1000)])
                    ])], function (fixture /** TODO #9100 */) {
                    testing_2.tick();
                    var cmp = fixture.debugElement.componentInstance;
                    var node = dom_adapter_1.getDOM().querySelector(fixture.debugElement.nativeElement, '.target');
                    cmp.exp = 'final';
                    fixture.detectChanges();
                    testing_2.flushMicrotasks();
                    var animation = driver.log.pop();
                    var keyframes = animation['keyframeLookup'];
                    testing_internal_1.expect(keyframes[0]).toEqual([
                        0, { 'height': '100px', 'opacity': 0, 'width': metadata_1.AUTO_STYLE }
                    ]);
                    testing_internal_1.expect(keyframes[1]).toEqual([
                        1, { 'height': '333px', 'opacity': metadata_1.AUTO_STYLE, 'width': '200px' }
                    ]);
                });
            })));
        });
    });
}
var InnerContentTrackingAnimationDriver = (function (_super) {
    __extends(InnerContentTrackingAnimationDriver, _super);
    function InnerContentTrackingAnimationDriver() {
        _super.apply(this, arguments);
    }
    InnerContentTrackingAnimationDriver.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing) {
        _super.prototype.animate.call(this, element, startingStyles, keyframes, duration, delay, easing);
        var player = new InnerContentTrackingAnimationPlayer(element);
        this.log[this.log.length - 1]['player'] = player;
        return player;
    };
    return InnerContentTrackingAnimationDriver;
}(mock_animation_driver_1.MockAnimationDriver));
var InnerContentTrackingAnimationPlayer = (function (_super) {
    __extends(InnerContentTrackingAnimationPlayer, _super);
    function InnerContentTrackingAnimationPlayer(element) {
        _super.call(this);
        this.element = element;
        this.playAttempts = 0;
    }
    InnerContentTrackingAnimationPlayer.prototype.init = function () { this.computedHeight = dom_adapter_1.getDOM().getComputedStyle(this.element)['height']; };
    InnerContentTrackingAnimationPlayer.prototype.play = function () {
        this.playAttempts++;
        this.capturedInnerText = this.element.querySelector('.inner').innerText;
    };
    return InnerContentTrackingAnimationPlayer;
}(mock_animation_player_1.MockAnimationPlayer));
var DummyIfCmp = (function () {
    function DummyIfCmp() {
        this.exp = false;
        this.exp2 = false;
    }
    /** @nocollapse */
    DummyIfCmp.decorators = [
        { type: index_1.Component, args: [{
                    selector: 'if-cmp',
                    directives: [common_1.NgIf],
                    template: "\n    <div *ngIf=\"exp\" [@myAnimation]=\"exp\"></div>\n  "
                },] },
    ];
    return DummyIfCmp;
}());
var DummyLoadingCmp = (function () {
    function DummyLoadingCmp() {
        this.exp = false;
    }
    /** @nocollapse */
    DummyLoadingCmp.decorators = [
        { type: index_1.Component, args: [{
                    selector: 'if-cmp',
                    host: { '[@loading]': 'exp' },
                    directives: [common_1.NgIf],
                    template: "\n    <div>loading...</div>\n  "
                },] },
    ];
    return DummyLoadingCmp;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2ludGVncmF0aW9uX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvdGVzdC9hbmltYXRpb24vYW5pbWF0aW9uX2ludGVncmF0aW9uX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsdUJBQW1CLGlCQUFpQixDQUFDLENBQUE7QUFDckMsd0JBQW1DLHVCQUF1QixDQUFDLENBQUE7QUFDM0QsaUNBQThCLG9EQUFvRCxDQUFDLENBQUE7QUFDbkYsNEJBQXFCLCtDQUErQyxDQUFDLENBQUE7QUFDckUsc0NBQWtDLHlEQUF5RCxDQUFDLENBQUE7QUFFNUYsMkJBQTRCLHlDQUF5QyxDQUFDLENBQUE7QUFDdEUsc0JBQXdCLGFBQWEsQ0FBQyxDQUFBO0FBQ3RDLG9DQUE0Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBSXRFLHlCQUF5SCw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hKLHFCQUFpQyx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3pELHdCQUFtRixlQUFlLENBQUMsQ0FBQTtBQUNuRyxzQ0FBa0MscUNBQXFDLENBQUMsQ0FBQTtBQUN4RSxpQ0FBZ0ksZ0NBQWdDLENBQUMsQ0FBQTtBQUVqSztJQUNFLDJCQUFRLENBQUMsS0FBSyxFQUFFLGNBQVEsWUFBWSxDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RCwyQkFBUSxDQUFDLFFBQVEsRUFBRSxjQUFRLFlBQVksQ0FBQyxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUhlLFlBQUksT0FHbkIsQ0FBQTtBQUVELHNCQUFzQixFQUEyQjtRQUExQixrQkFBTTtJQUMzQiwyQkFBUSxDQUFDLGlCQUFpQixFQUFFO1FBQzFCLHNDQUFtQixD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Q0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN0QyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN0QyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN0QyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN0QyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUV0QyxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUM3QixhQUFhLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUM5QixhQUFhLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUM5QixhQUFhLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUM5QixhQUFhLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUU5QixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBRWpCLGFBQWEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQzlCLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQzdCLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQzdCLGFBQWEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQzlCLGFBQWEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBRTlCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFFakIsYUFBYSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDOUIsYUFBYSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDOUIsYUFBYSxDQUFDLE9B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