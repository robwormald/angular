/// <reference path="../../../../../../../modules/playground/src/web_workers/images/bitmap.d.ts" />
export declare class BitmapService {
    convertToImageData(buffer: ArrayBuffer): ImageData;
    applySepia(imageData: ImageData): ImageData;
    toDataUri(imageData: ImageData): string;
    arrayBufferToDataUri(data: Uint8Array): string;
    private _imageDataToBMP(imageData);
    private _swap(data, index1, index2);
    private _createBMPHeader(imageData);
    private _BMPToImageData(bmp);
    private _getBMP(buffer);
    private _getLittleEndianHex(value);
}
