/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

//smoke tests
export function checkEnv(){
  describe('Elements Spec Env Check', () => {
    it('should be running as ES2015+', () => {
      expect(() => customElements.define('xx-elements-smoke-test', class extends HTMLElement {})).not.toThrow();
    });

  });
}

checkEnv();
