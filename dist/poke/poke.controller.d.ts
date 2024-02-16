import { PokeService } from './poke.service';
export declare class PokeController {
    private readonly pokeService;
    constructor(pokeService: PokeService);
    isNameValid(params: any): Promise<boolean>;
    getRandomPokemon(): Promise<string>;
    getPokemonByIndex(params: any): Promise<string>;
    getAllPokemonAbilities(params: any): Promise<string[]>;
    getAllPokemonAbilitiesDef(params: any): Promise<string[]>;
    getSuggestions(params: any): Promise<string[]>;
    getAllPokemonMoves(params: any): Promise<string[]>;
    getAllPokemonMovesDef(params: any): Promise<string[]>;
    getPokemonStats(params: any): Promise<string>;
    getPokemonTypes(params: any): Promise<string[]>;
}
