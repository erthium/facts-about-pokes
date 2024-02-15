import { Injectable } from '@nestjs/common';
import { OpenAiService } from 'src/open_ai/open_ai.service';

@Injectable()
export class ImageService {
    constructor(private openAiService: OpenAiService) { }

    getImageFromDB(name: string): string {
        return `https://img.pokemondb.net/artwork/large/${name}.jpg`;
    }

    async generateImage(prompt: string): Promise<string> {
        return this.openAiService.generateImage(prompt);
    }


    getImageFromGoogle(name: string): string {
        /*
        Search for pokemon image on google by '{name} pokemon'
        and return the first image result
        */
        return "Not Implemented";
    }
}
