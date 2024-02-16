import { Injectable } from '@nestjs/common';
import { OpenAiService } from 'src/open_ai/open_ai.service';

@Injectable()
export class ImageService {
    constructor(private openAiService: OpenAiService) { }

    getImageFromDB(name: string): string {
        return `https://img.pokemondb.net/artwork/large/${name}.jpg`;
    }

    async generateImage(pokeName: string): Promise<string> {
        const prompt: string = `Create an image for ${pokeName} pokemon`;
        const imageUrl: string = await this.openAiService.generateImage(prompt);
        return imageUrl;
    }


    getImageFromGoogle(name: string): string {
        /*
        Search for pokemon image on google by '{name} pokemon'
        and return the first image result
        */
        return "Not Implemented";
    }
}
