export declare class OpenAiService {
    testKey: () => Promise<void>;
    askQuestion: (question: string) => Promise<string>;
    generateImage: (prompt: string) => Promise<string>;
}
