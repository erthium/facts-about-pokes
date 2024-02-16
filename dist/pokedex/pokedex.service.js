"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokedexService = void 0;
const common_1 = require("@nestjs/common");
const ai_history_service_1 = require("../ai_history/ai_history.service");
const open_ai_service_1 = require("../open_ai/open_ai.service");
const moreAboutQuestion = "I'm a pokemon enthusiast. I'm looking for more information about {name}. Can you briefly tell me more about it in 4-6 sentences?";
const weaknessesQuestion = "I'm a pokemon enthusiast. I'm looking for more information about {name}. What are its weaknesses? Can you briefly explain in 4-6 sentences?";
const strengthsQuestion = "I'm a pokemon enthusiast. I'm looking for more information about {name}. What are its strengths? Can you briefly explain in 4-6 sentences?";
var Questions;
(function (Questions) {
    Questions["about"] = "I'm a pokemon enthusiast. I'm looking for more information about {name}. Can you briefly tell me more about it in 4-6 sentences?";
    Questions["weaknesses"] = "I'm a pokemon enthusiast. I'm looking for more information about {name}. What are its weaknesses? Can you briefly explain in 4-6 sentences?";
    Questions["strengths"] = "I'm a pokemon enthusiast. I'm looking for more information about {name}. What are its strengths? Can you briefly explain in 4-6 sentences?";
    Questions["none"] = "";
})(Questions || (Questions = {}));
const createQuestionText = (question, name) => {
    return question.replace('{name}', name);
};
const questionToTitle = (question) => {
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
};
let PokedexService = class PokedexService {
    constructor(openAiService) {
        this.openAiService = openAiService;
        this.testConnection = async () => {
            try {
                await this.openAiService.testKey();
                return true;
            }
            catch (e) {
                return false;
            }
        };
        this.checkIfAlreadyCached = async (pokeName, questionType) => {
            const questionTitle = questionToTitle(questionType);
            const cachedData = await ai_history_service_1.AiHistoryService.getPokemonData(pokeName, questionTitle);
            if (cachedData) {
                return cachedData;
            }
            return undefined;
        };
        this.cacheData = async (pokeName, questionType, data) => {
            const questionTitle = questionToTitle(questionType);
            await ai_history_service_1.AiHistoryService.addPokemonData(pokeName, questionTitle, data);
        };
        this.askAboutMore = async (pokeName) => {
            const cachedData = await this.checkIfAlreadyCached(pokeName, Questions.about);
            if (cachedData) {
                return cachedData;
            }
            const messageData = createQuestionText(Questions.about, pokeName);
            const answer = await this.openAiService.askQuestion(messageData);
            this.cacheData(pokeName, Questions.about, answer);
            return answer;
        };
        this.askAboutWeaknesses = async (pokeName) => {
            const cachedData = await this.checkIfAlreadyCached(pokeName, Questions.weaknesses);
            if (cachedData) {
                return cachedData;
            }
            const messageData = createQuestionText(Questions.weaknesses, pokeName);
            const answer = await this.openAiService.askQuestion(messageData);
            this.cacheData(pokeName, Questions.weaknesses, answer);
            return answer;
        };
        this.askAboutStrengths = async (pokeName) => {
            const cachedData = await this.checkIfAlreadyCached(pokeName, Questions.strengths);
            if (cachedData) {
                return cachedData;
            }
            const messageData = createQuestionText(Questions.strengths, pokeName);
            const answer = await this.openAiService.askQuestion(messageData);
            this.cacheData(pokeName, Questions.strengths, answer);
            return answer;
        };
    }
};
exports.PokedexService = PokedexService;
exports.PokedexService = PokedexService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [open_ai_service_1.OpenAiService])
], PokedexService);
//# sourceMappingURL=pokedex.service.js.map