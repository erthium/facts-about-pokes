import { ImageService } from './image.service';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    getImage(params: any): Promise<string>;
    generateImage(params: any): Promise<string>;
}
