"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AiHistoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiHistoryService = void 0;
const common_1 = require("@nestjs/common");
const config_module_1 = require("../config/config.module");
const fs = require("fs");
let AiHistoryService = AiHistoryService_1 = class AiHistoryService {
};
exports.AiHistoryService = AiHistoryService;
AiHistoryService.inProgress = false;
AiHistoryService.getPokedexData = async () => {
    const pokedexData = await fs.readFileSync(config_module_1.AppConfig.pokedex_history_path, 'utf8');
    return JSON.parse(pokedexData);
};
AiHistoryService.getPokemonData = async (name, questionTitle) => {
    const pokedexData = await AiHistoryService_1.getPokedexData();
    if (!pokedexData[name]) {
        return undefined;
    }
    if (!pokedexData[name][questionTitle]) {
        return undefined;
    }
    return pokedexData[name][questionTitle];
};
AiHistoryService.addPokemonData = async (name, questionTitle, data) => {
    const pokedexData = await AiHistoryService_1.getPokedexData();
    if (!pokedexData[name]) {
        pokedexData[name] = {};
    }
    pokedexData[name][questionTitle] = data;
    await fs.writeFileSync(config_module_1.AppConfig.pokedex_history_path, JSON.stringify(pokedexData));
};
exports.AiHistoryService = AiHistoryService = AiHistoryService_1 = __decorate([
    (0, common_1.Injectable)()
], AiHistoryService);
//# sourceMappingURL=ai_history.service.js.map