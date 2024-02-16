export declare class AiHistoryService {
    static inProgress: boolean;
    private static getPokedexData;
    static getPokemonData: (name: string, questionTitle: string) => Promise<string | undefined>;
    static addPokemonData: (name: string, questionTitle: string, data: any) => Promise<void>;
}
