import {isString} from 'angular2/src/facade/lang';
import {RequestMethod} from './enums';
import {makeTypeError} from 'angular2/src/facade/exceptions';
import {Response} from './static_response';

export function normalizeMethodName(method): RequestMethod {
  if (isString(method)) {
    var originalMethod = method;
    method = method.replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase());
    method = RequestMethod[method];
    if (typeof method !== 'number')
      throw makeTypeError(
          `Invalid request method. The method "${originalMethod}" is not supported.`);
  }
  return method;
}

const toString = Object.prototype.toString;

// utilities for JSON serialization
export const isSuccess = (status: number): boolean => (status >= 200 && status < 300);
export const isObject = (value: any): boolean => value !== null && typeof value === 'object';
export const isDate = (value: any) => toString.call(value) === '[object Date]';
export const toJSON = (value: any) => JSON.stringify(value);


export function getResponseURL(xhr: any): string {
  if ('responseURL' in xhr) {
    return xhr.responseURL;
  }
  if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
    return xhr.getResponseHeader('X-Request-URL');
  }
  return;
}

export {isJsObject} from 'angular2/src/facade/lang';
