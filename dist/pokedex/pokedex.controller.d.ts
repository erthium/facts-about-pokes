import { PokedexService } from './pokedex.service';
export declare class PokedexController {
    private pokedexService;
    constructor(pokedexService: PokedexService);
    testConnection(): Promise<boolean>;
    askQuestion(params: any): Promise<string>;
}
