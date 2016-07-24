import { PlatformRef } from '@angular/core';
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
export declare const serverTestPlatform: (extraProviders?: any[]) => PlatformRef;
/**
 * NgModule for testing.
 *
 * @stable
 */
export declare class ServerTestModule {
}
/**
 * @deprecated Use initTestEnvironment with serverTestPlatform instead.
 */
export declare const TEST_SERVER_PLATFORM_PROVIDERS: Array<any>;
/**
 * @deprecated Use initTestEnvironment with ServerTestModule instead.
 */
export declare const TEST_SERVER_APPLICATION_PROVIDERS: Array<any>;
