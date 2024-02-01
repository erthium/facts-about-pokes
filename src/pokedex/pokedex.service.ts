import { Injectable } from '@nestjs/common';
import { AiHistoryService } from 'src/ai_history/ai_history.service';
import { OpenAiService } from 'src/open_ai/open_ai.service';

// around 24 tokens
const moreAboutQuestion = "I'm a pokemon enthusiast. I'm looking for more information about {name}. Can you tell me more about it?";
// around 21 tokens
const weaknessesQuestion = "I'm a pokemon enthusiast. I'm looking for more information about {name}. What are its weaknesses?";
// around 21 tokens
const strengthsQuestion = "I'm a pokemon enthusiast. I'm looking for more information about {name}. What are its strengths?";

enum Questions {
    about = moreAboutQuestion,
    weaknesses = weaknessesQuestion,
    strengths = strengthsQuestion,
    none = ''
}

const createQuestionText = (question: Questions, name: string): string => {
    return question.replace('{name}', name);
}

const questionToTitle = (question: Questions): string => {
    switch (question) {
        case Questions.about:
            return 'about';
        case Questions.weaknesses:
            return 'weaknesses';
        case Questions.strengths:
            return 'strengths';
        default:
            return '';
    }
}

@Injectable()
export class PokedexService {
    private pokedexCallback: (input: string) => void = () => {};
    private pokemonName = '';
    private currentQuestionType: Questions = Questions.none;
    private currentMessage = '';

    constructor(callBack: (input: string) => void) {
        this.pokedexCallback = callBack;
    }

    prepareForNewMessage = (pokeName: string, questionType: Questions) => {
        this.pokemonName = pokeName;
        this.currentQuestionType = questionType;
        this.currentMessage = '';
    }
    
    handleCallback = (input: string | null | undefined): void => {
        if (input) {
            this.currentMessage += input;
            this.pokedexCallback(this.currentMessage);
        }
        else {
            this.pokedexCallback(this.currentMessage);
            this.cacheData(this.pokemonName, this.currentQuestionType, this.currentMessage);
        }
    }

    checkIfAlreadyCached = async (pokeName: string, questionType: Questions): Promise<string> => {
        const questionTitle: string = questionToTitle(questionType);
        const cachedData = await AiHistoryService.getPokemonData(pokeName, questionTitle);
        if (cachedData) {
            return cachedData;
        }
        return '';
    }

    cacheData = async (pokeName: string, questionType: Questions, data: string): Promise<void> => {
        const questionTitle: string = questionToTitle(questionType);
        await AiHistoryService.addPokemonData(pokeName, questionTitle, data);
    }

    // methods with streaming
    askAboutMoreInStream = async (pokeName: string): Promise<void> => {
        const cachedData = await this.checkIfAlreadyCached(pokeName, Questions.about);
        if (cachedData) {
            this.handleCallback(cachedData);
            return;
        }
        this.prepareForNewMessage(pokeName, Questions.about);
        const messageData: string = createQuestionText(Questions.about, pokeName);
        OpenAiService.askInStream(messageData, this.handleCallback);
    }


    // methods without streaming
    askAboutMore = async (pokeName: string): Promise<void> => {
        const cachedData = await this.checkIfAlreadyCached(pokeName, Questions.about);
        if (cachedData) {
            this.handleCallback(cachedData);
            return;
        }
        const messageData: string = createQuestionText(Questions.about, pokeName);
        const answer: string = await OpenAiService.askQuestion(messageData);
        this.pokedexCallback(answer);
        this.cacheData(this.pokemonName, this.currentQuestionType, this.currentMessage);
    }


    askAboutWeaknesses = async (pokeName: string): Promise<void> => {
        const cachedData = await this.checkIfAlreadyCached(pokeName, Questions.weaknesses);
        if (cachedData) {
            this.handleCallback(cachedData);
            return;
        }
        const messageData: string = createQuestionText(Questions.weaknesses, pokeName);
        const answer: string = await OpenAiService.askQuestion(messageData);
        this.pokedexCallback(answer);
        this.cacheData(this.pokemonName, this.currentQuestionType, this.currentMessage);
    }


    askAboutStrengths = async (pokeName: string): Promise<void> => {
        const cachedData = await this.checkIfAlreadyCached(pokeName, Questions.strengths);
        if (cachedData) {
            this.handleCallback(cachedData);
            return;
        }
        const messageData: string = createQuestionText(Questions.strengths, pokeName);
        const answer: string = await OpenAiService.askQuestion(messageData);
        this.pokedexCallback(answer);
        this.cacheData(this.pokemonName, this.currentQuestionType, this.currentMessage);
    }

}


