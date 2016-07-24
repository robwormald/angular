/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var fs = require('fs');
var sourceMap = require('source-map');
describe('sourcemaps', function () {
    var URL = 'all/playground/src/sourcemap/index.html';
    it('should map sources', function () {
        browser.get(URL);
        $('error-app .errorButton').click();
        // TODO(tbosch): Bug in ChromeDriver: Need to execute at least one command
        // so that the browser logs can be read out!
        browser.executeScript('1+1');
        browser.manage().logs().get('browser').then(function (logs) {
            var errorLine = null;
            var errorColumn = null;
            logs.forEach(function (log) {
                var match = /\.createError\s+\(.+:(\d+):(\d+)/m.exec(log.message);
                if (match) {
                    errorLine = parseInt(match[1]);
                    errorColumn = parseInt(match[2]);
                }
            });
            expect(errorLine).not.toBeNull();
            expect(errorColumn).not.toBeNull();
            var content = fs.readFileSync('dist/all/playground/src/sourcemap/index.js').toString("utf8");
            var marker = "//# sourceMappingURL=data:application/json;base64,";
            var index = content.indexOf(marker);
            var sourceMapData = new Buffer(content.substring(index + marker.length), 'base64').toString("utf8");
            var decoder = new sourceMap.SourceMapConsumer(JSON.parse(sourceMapData));
            var originalPosition = decoder.originalPositionFor({ line: errorLine, column: errorColumn });
            var sourceCodeLines = fs.readFileSync('modules/playground/src/sourcemap/index.ts', { encoding: 'UTF-8' })
                .split('\n');
            expect(sourceCodeLines[originalPosition.line - 1])
                .toMatch(/throw new BaseException\(\'Sourcemap test\'\)/);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlbWFwX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvZTJlX3Rlc3Qvc291cmNlbWFwL3NvdXJjZW1hcF9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFJSCxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkIsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRXRDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7SUFDckIsSUFBSSxHQUFHLEdBQUcseUNBQXlDLENBQUM7SUFFcEQsRUFBRSxDQUFDLG9CQUFvQixFQUFFO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakIsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFcEMsMEVBQTBFO1FBQzFFLDRDQUE0QztRQUM1QyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVMsSUFBSTtZQUN2RCxJQUFJLFNBQVMsR0FBMEIsSUFBSSxDQUFDO1lBQzVDLElBQUksV0FBVyxHQUEwQixJQUFJLENBQUM7WUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFTLEdBQUc7Z0JBQ3ZCLElBQUksS0FBSyxHQUFHLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1YsU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDL0IsV0FBVyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBR25DLElBQU0sT0FBTyxHQUNULEVBQUUsQ0FBQyxZQUFZLENBQUMsNENBQTRDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkYsSUFBTSxNQUFNLEdBQUcsb0RBQW9ELENBQUM7WUFDcEUsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QyxJQUFNLGFBQWEsR0FDZixJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXBGLElBQUksT0FBTyxHQUFHLElBQUksU0FBUyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUV6RSxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7WUFFM0YsSUFBSSxlQUFlLEdBQ2YsRUFBRSxDQUFDLFlBQVksQ0FBQywyQ0FBMkMsRUFBRSxFQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUMsQ0FBQztpQkFDNUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUM3QyxPQUFPLENBQUMsK0NBQStDLENBQUMsQ0FBQztRQUNoRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==