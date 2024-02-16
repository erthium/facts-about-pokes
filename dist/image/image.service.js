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
exports.ImageService = void 0;
const common_1 = require("@nestjs/common");
const open_ai_service_1 = require("../open_ai/open_ai.service");
let ImageService = class ImageService {
    constructor(openAiService) {
        this.openAiService = openAiService;
    }
    getImageFromDB(name) {
        return `https://img.pokemondb.net/artwork/large/${name}.jpg`;
    }
    async generateImage(pokeName) {
        const prompt = `Create an image for ${pokeName} pokemon`;
        const imageUrl = await this.openAiService.generateImage(prompt);
        return imageUrl;
    }
    getImageFromGoogle(name) {
        return "Not Implemented";
    }
};
exports.ImageService = ImageService;
exports.ImageService = ImageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [open_ai_service_1.OpenAiService])
], ImageService);
//# sourceMappingURL=image.service.js.map