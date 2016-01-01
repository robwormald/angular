import {isString, isPresent, isBlank} from 'angular2/src/facade/lang';
import {Injectable} from 'angular2/core';
import {RequestOptionsArgs, Connection, ConnectionBackend} from './interfaces';
import {Request} from './static_request';
import {Response} from './static_response';
import {BaseRequestOptions, RequestOptions} from './base_request_options';
import {RequestMethod} from './enums';
import {toJSON} from './http_utils';
import {Observable} from 'rxjs/Observable';

function mergeOptions(defaultOpts, providedOpts, method, url): RequestOptions {
  var newOptions = defaultOpts;
  if (isPresent(providedOpts)) {
    // Hack so Dart can used named parameters
    return newOptions.merge(new RequestOptions({
      method: providedOpts.method || method,
      url: providedOpts.url || url,
      search: providedOpts.search,
      headers: providedOpts.headers,
      body: providedOpts.body
    }));
  }
  if (isPresent(method)) {
    return newOptions.merge(new RequestOptions({method: method, url: url}));
  } else {
    return newOptions.merge(new RequestOptions({url: url}));
  }
}

/**
 * Performs http requests using `XMLHttpRequest` as the default backend.
 *
 * `Http` is available as an injectable class, with methods to perform http requests. Calling
 * `request` returns an `Observable` which will emit a single {@link Response} when a
 * response is received.
 *
 * ### Example
 *
 * ```typescript
 * import {Http, HTTP_PROVIDERS} from 'angular2/http';
 * @Component({
 *   selector: 'http-app',
 *   viewProviders: [HTTP_PROVIDERS],
 *   templateUrl: 'people.html'
 * })
 * class PeopleComponent {
 *   constructor(http: Http) {
 *     http.get('people.json')
 *       // Call map on the response observable to get the parsed people object
 *       .map(res => res.json())
 *       // Subscribe to the observable to get the parsed people object and attach it to the
 *       // component
 *       .subscribe(people => this.people = people);
 *   }
 * }
 * ```
 *
 *
 * ### Example
 *
 * ```
 * http.get('people.json').observer({next: (value) => this.people = value});
 * ```
 *
 * The default construct used to perform requests, `XMLHttpRequest`, is abstracted as a "Backend" (
 * {@link XHRBackend} in this case), which could be mocked with dependency injection by replacing
 * the {@link XHRBackend} provider, as in the following example:
 *
 * ### Example
 *
 * ```typescript
 * import {BaseRequestOptions, Http} from 'angular2/http';
 * import {MockBackend} from 'angular2/http/testing';
 * var injector = Injector.resolveAndCreate([
 *   BaseRequestOptions,
 *   MockBackend,
 *   provide(Http, {useFactory:
 *       function(backend, defaultOptions) {
 *         return new Http(backend, defaultOptions);
 *       },
 *       deps: [MockBackend, BaseRequestOptions]})
 * ]);
 * var http = injector.get(Http);
 * http.get('request-from-mock-backend.json').subscribe((res:Response) => doSomething(res));
 * ```
 *
 **/
@Injectable()
export class Http {
  constructor(protected _backend: ConnectionBackend, protected _defaultOptions: RequestOptions) {}

  /**
   * Performs any type of http request. Accepts a Request instance and return a Connection<Response>
   * Observable
   */
  request(request: Request): Connection<Response> {
    if (request instanceof Request) {
      return this._backend.createConnection(request);
    } else {
      throw new TypeError('http.request must be called with an instance of Request');
    }
  }

  /**
   * Performs a request with `get` http method.
   */
  get(url: string, options?: RequestOptionsArgs): Connection<Response> {
    const getRequest =
        new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url));
    return this.request(getRequest);
  }

  /**
   * Performs a request with `post` http method.
   */
  post(url: string, body: any, options?: RequestOptionsArgs): Connection<Response> {
    const postRequest = new Request(
        mergeOptions(this._defaultOptions.merge(new RequestOptions({body: toJSON(body)})), options,
                     RequestMethod.Post, url));
    return this.request(postRequest);
  }

  /**
   * Performs a request with `put` http method.
   */
  put(url: string, body: any, options?: RequestOptionsArgs): Connection<Response> {
    const putRequest = new Request(
        mergeOptions(this._defaultOptions.merge(new RequestOptions({body: toJSON(body)})), options,
                     RequestMethod.Put, url));
    return this.request(putRequest);
  }

  /**
   * Performs a request with `delete` http method.
   */
  delete (url: string, options?: RequestOptionsArgs): Connection<Response> {
    const deleteRequest =
        new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Delete, url));
    return this.request(deleteRequest);
  }

  /**
   * Performs a request with `patch` http method.
   */
  patch(url: string, body: any, options?: RequestOptionsArgs): Connection<Response> {
    const patchRequest = new Request(
        mergeOptions(this._defaultOptions.merge(new RequestOptions({body: toJSON(body)})), options,
                     RequestMethod.Patch, url));
    return this.request(patchRequest);
  }

  /**
   * Performs a request with `head` http method.
   */
  head(url: string, options?: RequestOptionsArgs): Connection<Response> {
    const headRequest =
        new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Head, url));
    return this.request(headRequest);
  }
}

@Injectable()
export class Jsonp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  /**
   * Performs any type of http request. First argument is required, and can either be a url or
   * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
   * object can be provided as the 2nd argument. The options object will be merged with the values
   * of {@link BaseRequestOptions} before performing the request.
   */
  request(url: string | Request, options?: RequestOptionsArgs): Connection<Response> {
    var responseObservable: any;
    if (isString(url)) {
      url = new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url));
    }
    if (url instanceof Request) {
      if (url.method !== RequestMethod.Get) {
        throw new TypeError('JSONP requests must use GET request method.');
      }
      responseObservable = super.request(url);
    } else {
      throw new TypeError('First argument must be a url string or Request instance.');
    }
    return responseObservable;
  }
}
