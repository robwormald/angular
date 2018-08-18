import {MockDirectory, setup} from '@angular/compiler/test/aot/test_util';
import {compile, expectEmit} from './mock_compile';

describe('ng_element compiler compliance', () => {
  const angularFiles = setup({
    compileAngular: false,
    compileFakeCore: true,
    compileAnimations: false,
    compileElements: false
  });

  it('should create factory methods', () => {
    const files = {
      app: {
        'test-element.ts': `
          import {NgElement, withNgElement} from '@angular/elements/platform';

          @NgElement({
            selector: 'test-element'
          })
          export class TestElement extends withNgElement() {

          }
          `
      }
    };

    const factory = `
      factory: function MyComponent_Factory() {
        return new MyComponent(
          $r3$.ɵinjectAttribute('name'),
          $r3$.ɵdirectiveInject(MyService),
          $r3$.ɵdirectiveInject(MyService, 1),
          $r3$.ɵdirectiveInject(MyService, 2),
          $r3$.ɵdirectiveInject(MyService, 4),
          $r3$.ɵdirectiveInject(MyService, 8),
          $r3$.ɵdirectiveInject(MyService, 10)
        );
      }`;


    const result = compile(files, angularFiles);
    console.log(result.source);
    expect(true).toBe(false);
  });

});
