import {
  describe,
  it,
  expect,
  beforeEach,
  ddescribe,
  iit,
  xit,
  el,
  SpyObject,
  AsyncTestCompleter,
  inject
} from 'angular2/testing_internal';

import {
  EventEmitter,
  ComponentEmitter
} from 'angular2/src/facade/eventemitter';

export function main(){
  
  describe('EventEmitter', () => {
    let emitter;
    
    beforeEach(() => {
      emitter = new EventEmitter();
    });
    
    it('should instantiate an EventEmitter', () => {
      expect(emitter).toBeAnInstanceOf(EventEmitter);
    });
    
    it('should work with a single listener and single event', () => {
      let ev;
      emitter.addEventListener('clicky', function listener(data){
        ev = data;
      });
      emitter.emit('clicky','foo');
      expect(ev).toEqual('foo');
    });
    
    it('should work with multiple listeners and multiple events', () => {
      let clicks = 0;
      let clacks = 0;
      emitter.addEventListener('clicky', function listener(data){
        clicks++
      });
      emitter.addEventListener('clacky', function listener(data){
        clacks++;
      });
      emitter.emit('clicky','foo');
      emitter.emit('clacky','foo');
      expect(clicks).toEqual(1);
      expect(clacks).toEqual(1);
    });
    
    it('should work with multiple listeners and single event', () => {
      let ev1, ev2;
      emitter.addEventListener('clicky', function listenerA(data){
        ev1 = data;
      });
      emitter.addEventListener('clicky', function listenerB(data){
        ev2 = data;
      });
      emitter.emit('clicky','foo');
      expect(ev1).toEqual('foo');
      expect(ev2).toEqual('foo');
    });
    
    it('should unregister listeners', () => {
      let ev = 0;
      
      function listener(data){
        ev++;
      }
      
      emitter.addEventListener('clicky', listener);
      emitter.emit('clicky','foo');
      emitter.removeEventListener('clicky', listener);
      emitter.emit('clicky','foo');
      expect(ev).toEqual(1);
    });
    
    it('should unregister listeners synchronously', () => {
      let ev = 0;
      
      function listener(data){
        ev++;
        emitter.removeEventListener('clicky',listener);
      }
      
      emitter.addEventListener('clicky', listener);
      emitter.emit('clicky','foo');
      emitter.emit('clicky','foo');
      expect(ev).toEqual(1);
    });
    
    it('should unregister multiple listeners', () => {
      let ev = 0;
      
      function listener1(data){
        ev++;
      }
      function listener2(data){
        ev++;
      }
      
      emitter.addEventListener('clicky', listener1);
      emitter.addEventListener('clicky', listener2);
      
      emitter.emit('clicky','foo');
      expect(ev).toEqual(2);
      
      emitter.removeEventListener('clicky', listener1);
      emitter.emit('clicky','foo');
      expect(ev).toEqual(3);
      
      emitter.removeEventListener('clicky', listener2);
      emitter.emit('clicky','foo');
      expect(ev).toEqual(3);
    });
    
    
  });
  
  describe('ComponentEmitter - default', () => {
    
    let emitter;
    beforeEach(() => {
      emitter = new ComponentEmitter();
    });
    
    it('should instantiate', () => {
      
      expect(emitter).toBeAnInstanceOf(ComponentEmitter);
      
    });
    
    it('should inherit from EventEmitter', () => {
      
      expect(emitter).toBeAnInstanceOf(EventEmitter);
      
    });
    
    it('should work with a single listener and single event', () => {
      let ev;
      emitter.addListener(function listener(data){
        ev = data;
      });
      emitter.emit('foo');
      expect(ev).toEqual('foo');
    });
    
    it('should work with multiple listeners and single event', () => {
      let ev1, ev2;
      emitter.addListener(function listener1(data){
        ev1 = data;
      });
      emitter.addListener(function listener2(data){
        ev2 = data;
      });
      emitter.emit('foo');
      expect(ev1).toEqual('foo');
      expect(ev2).toEqual('foo');
    });
    
    it('should unregister listeners', () => {
      let ev = 0;
      function listener1(data){
        ev++
      }
      emitter.addListener(listener1);
      
      emitter.emit('foo');
      emitter.removeListener(listener1);
      emitter.emit('foo');
      expect(ev).toEqual(1);
    });
    
    it('should unregister multiple listeners', () => {
      let ev1 = 0;
      let ev2 = 0;
      function listener1(data){
        ev1++
      }
      function listener2(data){
        ev2++
      }
      emitter.addListener(listener1);
      emitter.addListener(listener2);
      
      emitter.emit('foo');
      expect(ev1).toEqual(1);
      expect(ev2).toEqual(1);
      emitter.removeListener(listener2);
      emitter.emit('foo');
      expect(ev1).toEqual(2);
      expect(ev2).toEqual(1);
      emitter.removeListener(listener1);
      emitter.emit('foo');
      expect(ev1).toEqual(2);
      expect(ev2).toEqual(1);
    });
    
  });
  
  describe('ComponentEmitter - named', () => {
    
    let emitter;
    beforeEach(() => {
      emitter = new ComponentEmitter('clicky');
    });
    
    it('should instantiate', () => {
      
      expect(emitter).toBeAnInstanceOf(ComponentEmitter);
      
    });
    
    it('should inherit from EventEmitter', () => {
      
      expect(emitter).toBeAnInstanceOf(EventEmitter);
      
    });
    
    it('should work with a single listener and single event', () => {
      let ev;
      emitter.addListener(function listener(data){
        ev = data;
      });
      emitter.emit('foo');
      expect(ev).toEqual('foo');
    });
    
    it('should work with a single listener and single named event', () => {
      let ev;
      emitter.addEventListener('clicky', function listener(data){
        ev = data;
      });
      emitter.emit('foo');
      expect(ev).toEqual('foo');
    });
    
    it('should allow removing listeners by named event', () => {
      let ev = 0;
      function listener(data){
        ev++
      }
      emitter.addEventListener('clicky', listener);
      emitter.emit('foo');
      emitter.removeEventListener('clicky', listener);
      emitter.emit('foo');
      expect(ev).toEqual(1);
    });
    
    it('should work with multiple listeners and single event', () => {
      let ev1, ev2;
      emitter.addListener(function listener1(data){
        ev1 = data;
      });
      emitter.addListener(function listener2(data){
        ev2 = data;
      });
      emitter.emit('foo');
      expect(ev1).toEqual('foo');
      expect(ev2).toEqual('foo');
    });
    
    it('should unregister listeners', () => {
      let ev = 0;
      function listener1(data){
        ev++
      }
      emitter.addListener(listener1);
      
      emitter.emit('foo');
      emitter.removeListener(listener1);
      emitter.emit('foo');
      expect(ev).toEqual(1);
    });
    
    it('should unregister multiple listeners', () => {
      let ev1 = 0;
      let ev2 = 0;
      function listener1(data){
        ev1++
      }
      function listener2(data){
        ev2++
      }
      emitter.addListener(listener1);
      emitter.addListener(listener2);
      
      emitter.emit('foo');
      expect(ev1).toEqual(1);
      expect(ev2).toEqual(1);
      emitter.removeListener(listener2);
      emitter.emit('foo');
      expect(ev1).toEqual(2);
      expect(ev2).toEqual(1);
      emitter.removeListener(listener1);
      emitter.emit('foo');
      expect(ev1).toEqual(2);
      expect(ev2).toEqual(1);
    });
    
  });
  
}
