"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
const getAPIKey = () => {
    const api_key = process.env.OPENAI_API_KEY;
    if (api_key === undefined) {
        throw new Error("OpenAI API Key is missing!");
    }
    const pattern = new RegExp("sk-[a-zA-Z0-9]{48}");
    if (!pattern.test(api_key)) {
        throw new Error("OpenAI API Key is not valid!");
    }
    return api_key;
};
let OpenAiService = class OpenAiService {
    constructor() {
        this.testKey = async () => {
            new openai_1.default({
                apiKey: getAPIKey()
            });
        };
        this.askQuestion = async (question) => {
            const openai = new openai_1.default({
                apiKey: getAPIKey(),
            });
            const gptResponse = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: question }]
            });
            return gptResponse.choices[0].message.content || "Something went wrong";
        };
        this.generateImage = async (prompt) => {
            const openai = new openai_1.default({
                apiKey: getAPIKey(),
            });
            console.log("Generating image for prompt: ", prompt);
            const gptResponse = await openai.images.generate({
                prompt: prompt,
                response_format: 'url',
                model: 'dall-e-2',
                size: '1024x1024',
                quality: 'hd',
                style: 'vivid',
                n: 1,
            });
            const imageUrl = gptResponse.data[0].url;
            return imageUrl;
        };
    }
};
exports.OpenAiService = OpenAiService;
exports.OpenAiService = OpenAiService = __decorate([
    (0, common_1.Injectable)()
], OpenAiService);
//# sourceMappingURL=open_ai.service.js.map