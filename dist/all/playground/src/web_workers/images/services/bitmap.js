/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
/// <reference path="../bitmap.d.ts" /> /// <reference path="../b64.d.ts" />
var core_1 = require('@angular/core');
// Temporary fix for Typescript issue #4220 (https://github.com/Microsoft/TypeScript/issues/4220)
// var _ImageData: (width: number, height: number) => void = <any>postMessage;
var _ImageData = ImageData;
var BitmapService = (function () {
    function BitmapService() {
    }
    BitmapService.prototype.convertToImageData = function (buffer) {
        var bmp = this._getBMP(buffer);
        return this._BMPToImageData(bmp);
    };
    BitmapService.prototype.applySepia = function (imageData) {
        var buffer = imageData.data;
        for (var i = 0; i < buffer.length; i += 4) {
            var r = buffer[i];
            var g = buffer[i + 1];
            var b = buffer[i + 2];
            buffer[i] = (r * .393) + (g * .769) + (b * .189);
            buffer[i + 1] = (r * .349) + (g * .686) + (b * .168);
            buffer[i + 2] = (r * .272) + (g * .534) + (b * .131);
        }
        return imageData;
    };
    BitmapService.prototype.toDataUri = function (imageData) {
        var header = this._createBMPHeader(imageData);
        imageData = this._imageDataToBMP(imageData);
        return 'data:image/bmp;base64,' + btoa(header) + base64js.fromByteArray(imageData.data);
    };
    // converts a .bmp file ArrayBuffer to a dataURI
    BitmapService.prototype.arrayBufferToDataUri = function (data) {
        return 'data:image/bmp;base64,' + base64js.fromByteArray(data);
    };
    // returns a UInt8Array in BMP order (starting from the bottom)
    BitmapService.prototype._imageDataToBMP = function (imageData) {
        var width = imageData.width;
        var height = imageData.height;
        var data = imageData.data;
        for (var y = 0; y < height / 2; ++y) {
            var topIndex = y * width * 4;
            var bottomIndex = (height - y) * width * 4;
            for (var i = 0; i < width * 4; i++) {
                this._swap(data, topIndex, bottomIndex);
                topIndex++;
                bottomIndex++;
            }
        }
        return imageData;
    };
    BitmapService.prototype._swap = function (data, index1, index2) {
        var temp = data[index1];
        data[index1] = data[index2];
        data[index2] = temp;
    };
    // Based on example from
    // http://www.worldwidewhat.net/2012/07/how-to-draw-bitmaps-using-javascript/
    BitmapService.prototype._createBMPHeader = function (imageData) {
        var numFileBytes = this._getLittleEndianHex(imageData.width * imageData.height);
        var w = this._getLittleEndianHex(imageData.width);
        var h = this._getLittleEndianHex(imageData.height);
        return 'BM' +
            numFileBytes +
            '\x00\x00' +
            '\x00\x00' +
            '\x36\x00\x00\x00' +
            '\x28\x00\x00\x00' +
            w +
            h +
            '\x01\x00' +
            '\x20\x00' +
            '\x00\x00\x00\x00' +
            '\x00\x00\x00\x00' +
            '\x13\x0B\x00\x00' +
            '\x13\x0B\x00\x00' +
            '\x00\x00\x00\x00' +
            '\x00\x00\x00\x00'; // 0 important colors (means all colors are important)
    };
    BitmapService.prototype._BMPToImageData = function (bmp) {
        var width = bmp.infoHeader.biWidth;
        var height = bmp.infoHeader.biHeight;
        var imageData = new _ImageData(width, height);
        var data = imageData.data;
        var bmpData = bmp.pixels;
        var stride = bmp.stride;
        for (var y = 0; y < height; ++y) {
            for (var x = 0; x < width; ++x) {
                var index1 = (x + width * (height - y)) * 4;
                var index2 = x * 3 + stride * y;
                data[index1] = bmpData[index2 + 2];
                data[index1 + 1] = bmpData[index2 + 1];
                data[index1 + 2] = bmpData[index2];
                data[index1 + 3] = 255;
            }
        }
        return imageData;
    };
    BitmapService.prototype._getBMP = function (buffer) {
        var datav = new DataView(buffer);
        var bitmap = {
            fileHeader: {
                bfType: datav.getUint16(0, true),
                bfSize: datav.getUint32(2, true),
                bfReserved1: datav.getUint16(6, true),
                bfReserved2: datav.getUint16(8, true),
                bfOffBits: datav.getUint32(10, true),
            },
            infoHeader: {
                biSize: datav.getUint32(14, true),
                biWidth: datav.getUint32(18, true),
                biHeight: datav.getUint32(22, true),
                biPlanes: datav.getUint16(26, true),
                biBitCount: datav.getUint16(28, true),
                biCompression: datav.getUint32(30, true),
                biSizeImage: datav.getUint32(34, true),
                biXPelsPerMeter: datav.getUint32(38, true),
                biYPelsPerMeter: datav.getUint32(42, true),
                biClrUsed: datav.getUint32(46, true),
                biClrImportant: datav.getUint32(50, true)
            },
            stride: null,
            pixels: null
        };
        var start = bitmap.fileHeader.bfOffBits;
        bitmap.stride =
            Math.floor((bitmap.infoHeader.biBitCount * bitmap.infoHeader.biWidth + 31) / 32) * 4;
        bitmap.pixels = new Uint8Array(datav.buffer, start);
        return bitmap;
    };
    // Based on example from
    // http://www.worldwidewhat.net/2012/07/how-to-draw-bitmaps-using-javascript/
    BitmapService.prototype._getLittleEndianHex = function (value) {
        var result = [];
        for (var bytes = 4; bytes > 0; bytes--) {
            result.push(String.fromCharCode(value & 255));
            value >>= 8;
        }
        return result.join('');
    };
    /** @nocollapse */
    BitmapService.decorators = [
        { type: core_1.Injectable },
    ];
    return BitmapService;
}());
exports.BitmapService = BitmapService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml0bWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9wbGF5Z3JvdW5kL3NyYy93ZWJfd29ya2Vycy9pbWFnZXMvc2VydmljZXMvYml0bWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCw0RUFBNEU7QUFDNUUscUJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBR3pDLGlHQUFpRztBQUNqRyw4RUFBOEU7QUFDOUUsSUFBSSxVQUFVLEdBR1osU0FBUyxDQUFDO0FBQ1o7SUFBQTtJQXNKQSxDQUFDO0lBckpDLDBDQUFrQixHQUFsQixVQUFtQixNQUFtQjtRQUNwQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxrQ0FBVSxHQUFWLFVBQVcsU0FBb0I7UUFDN0IsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztRQUM1QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1lB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