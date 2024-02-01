export declare class PokeService {
    isNameValid(name: string): Promise<boolean>;
    nameToIndex(name: string): Promise<number>;
    getRandomPokemon(): Promise<string>;
    getPokemonName(index: number): Promise<string>;
    getAllPokemonAbilities(name: string): Promise<string[]>;
    getAbilityInfo(name: string): Promise<string>;
    getSuggestions(inputText: string): Promise<string[]>;
    getAllPokemonMoves(name: string): Promise<string[]>;
    getMoveInfo(name: string): Promise<string>;
    getPokemonStats(name: string): Promise<string>;
    getPokemonTypes(name: string): Promise<string[]>;
}
