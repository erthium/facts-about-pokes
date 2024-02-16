import { OpenAiService } from 'src/open_ai/open_ai.service';
declare enum Questions {
    about = "I'm a pokemon enthusiast. I'm looking for more information about {name}. Can you briefly tell me more about it in 4-6 sentences?",
    weaknesses = "I'm a pokemon enthusiast. I'm looking for more information about {name}. What are its weaknesses? Can you briefly explain in 4-6 sentences?",
    strengths = "I'm a pokemon enthusiast. I'm looking for more information about {name}. What are its strengths? Can you briefly explain in 4-6 sentences?",
    none = ""
}
export declare class PokedexService {
    private openAiService;
    constructor(openAiService: OpenAiService);
    testConnection: () => Promise<boolean>;
    checkIfAlreadyCached: (pokeName: string, questionType: Questions) => Promise<string | undefined>;
    cacheData: (pokeName: string, questionType: Questions, data: string) => Promise<void>;
    askAboutMore: (pokeName: string) => Promise<string>;
    askAboutWeaknesses: (pokeName: string) => Promise<string>;
    askAboutStrengths: (pokeName: string) => Promise<string>;
}
export {};
