import { BitmapService } from './services/bitmap';
export declare class ImageDemo {
    private _bitmapService;
    images: any[];
    fileInput: String;
    constructor(_bitmapService: BitmapService);
    uploadFiles(files: any): void;
    handleReaderLoad(reader: FileReader): EventListener;
    applyFilters(): void;
    private _filter(i);
}
