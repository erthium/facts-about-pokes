export declare class SearchService {
    static simplyfy(word: string): Promise<string>;
    static levDistance(word: string, target: string): Promise<number>;
    static wordInWord(word: string, target: string): Promise<boolean>;
    static similarity(word: string, target: string): Promise<number>;
    static isSimilar(str1: string, str2: string): Promise<boolean>;
}
