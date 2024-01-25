import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
    getImageFromDB(name: string): string {
        return `https://img.pokemondb.net/artwork/large/${name}.jpg`;
    }

    getImageFromGoogle(name: string): string {
        /*
        Search for pokemon image on google by '{name} pokemon'
        and return the first image result
        */
        return "Not Implemented";
    }
}
