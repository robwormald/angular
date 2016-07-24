/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var async_1 = require('@angular/core/src/facade/async');
var bitmap_1 = require('./services/bitmap');
var file_api_1 = require('./file_api');
var ImageDemo = (function () {
    function ImageDemo(_bitmapService) {
        this._bitmapService = _bitmapService;
        this.images = [];
    }
    ImageDemo.prototype.uploadFiles = function (files /** TODO #9100 */) {
        for (var i = 0; i < files.length; i++) {
            var reader = new file_api_1.FileReader();
            reader.addEventListener("load", this.handleReaderLoad(reader));
            reader.readAsArrayBuffer(files[i]);
        }
    };
    ImageDemo.prototype.handleReaderLoad = function (reader) {
        var _this = this;
        return function (e) {
            var buffer = reader.result;
            _this.images.push({
                src: _this._bitmapService.arrayBufferToDataUri(file_api_1.Uint8ArrayWrapper.create(reader.result)),
                buffer: buffer,
                filtering: false
            });
        };
    };
    ImageDemo.prototype.applyFilters = function () {
        for (var i = 0; i < this.images.length; i++) {
            this.images[i].filtering = true;
            async_1.TimerWrapper.setTimeout(this._filter(i), 0);
        }
    };
    ImageDemo.prototype._filter = function (i) {
        var _this = this;
        return function () {
            var imageData = _this._bitmapService.convertToImageData(_this.images[i].buffer);
            imageData = _this._bitmapService.applySepia(imageData);
            _this.images[i].src = _this._bitmapService.toDataUri(imageData);
            _this.images[i].filtering = false;
        };
    };
    /** @nocollapse */
    ImageDemo.decorators = [
        { type: core_1.Component, args: [{ selector: 'image-demo', viewProviders: [bitmap_1.BitmapService], templateUrl: 'image_demo.html' },] },
    ];
    /** @nocollapse */
    ImageDemo.ctorParameters = [
        { type: bitmap_1.BitmapService, },
    ];
    return ImageDemo;
}());
exports.ImageDemo = ImageDemo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhfY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9wbGF5Z3JvdW5kL3NyYy93ZWJfd29ya2Vycy9pbWFnZXMvaW5kZXhfY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFFeEMsc0JBQTJCLGdDQUFnQyxDQUFDLENBQUE7QUFDNUQsdUJBQTRCLG1CQUFtQixDQUFDLENBQUE7QUFDaEQseUJBQTRDLFlBQVksQ0FBQyxDQUFBO0FBQ3pEO0lBSUUsbUJBQW9CLGNBQTZCO1FBQTdCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBSGpELFdBQU0sR0FBNEIsRUFBRSxDQUFDO0lBR2UsQ0FBQztJQUVyRCwrQkFBVyxHQUFYLFVBQVksS0FBVSxDQUFDLGlCQUFpQjtRQUN0QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0QyxJQUFJLE1BQU0sR0FBRyxJQUFJLHFCQUFVLEVBQUUsQ0FBQztZQUM5QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQy9ELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxDQUFDO0lBQ0gsQ0FBQztJQUVELG9DQUFnQixHQUFoQixVQUFpQixNQUFrQjtRQUFuQyxpQkFTQztRQVJDLE1BQU0sQ0FBQyxVQUFDLENBQUM7WUFDUCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQzNCLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNmLEdBQUcsRUFBRSxLQUFJLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLDRCQUFpQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RGLE1BQU0sRUFBRSxNQUFNO2dCQUNkLFNBQVMsRUFBRSxLQUFLO2FBQ2pCLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxnQ0FBWSxHQUFaO1FBQ0UsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUVoQyxvQkFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlDLENBQUM7SUFDSCxDQUFDO0lBRU8sMkJBQU8sR0FBZixVQUFnQixDQUFTO1FBQXpCLGlCQU9DO1FBTkMsTUFBTSxDQUFDO1lBQ0wsSUFBSSxTQUFTLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlFLFNBQVMsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN0RCxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5RCxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbkMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNILGtCQUFrQjtJQUNYLG9CQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxDQUFDLHNCQUFhLENBQUMsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUMsRUFBRyxFQUFFO0tBQ3RILENBQUM7SUFDRixrQkFBa0I7SUFDWCx3QkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxzQkFBYSxHQUFHO0tBQ3RCLENBQUM7SUFDRixnQkFBQztBQUFELENBQUMsQUFqREQsSUFpREM7QUFqRFksaUJBQVMsWUFpRHJCLENBQUEifQ==