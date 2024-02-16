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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokedexController = void 0;
const common_1 = require("@nestjs/common");
const pokedex_service_1 = require("./pokedex.service");
let PokedexController = class PokedexController {
    constructor(pokedexService) {
        this.pokedexService = pokedexService;
    }
    async testConnection() {
        return await this.pokedexService.testConnection();
    }
    async askQuestion(params) {
        try {
            const { name, questionTitle } = params;
            if (questionTitle === 'about') {
                return await this.pokedexService.askAboutMore(name);
            }
            else if (questionTitle === 'weaknesses') {
                return await this.pokedexService.askAboutWeaknesses(name);
            }
            else if (questionTitle === 'strengths') {
                return await this.pokedexService.askAboutStrengths(name);
            }
            else {
                throw new common_1.HttpException('Invalid question title', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.PokedexController = PokedexController;
__decorate([
    (0, common_1.Get)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PokedexController.prototype, "testConnection", null);
__decorate([
    (0, common_1.Get)('ask/:name/:questionTitle'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokedexController.prototype, "askQuestion", null);
exports.PokedexController = PokedexController = __decorate([
    (0, common_1.Controller)('pokedex'),
    __metadata("design:paramtypes", [pokedex_service_1.PokedexService])
], PokedexController);
//# sourceMappingURL=pokedex.controller.js.map