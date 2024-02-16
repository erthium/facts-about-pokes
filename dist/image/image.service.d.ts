import { OpenAiService } from 'src/open_ai/open_ai.service';
export declare class ImageService {
    private openAiService;
    constructor(openAiService: OpenAiService);
    getImageFromDB(name: string): string;
    generateImage(pokeName: string): Promise<string>;
    getImageFromGoogle(name: string): string;
}
