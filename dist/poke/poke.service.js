"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokeService = void 0;
const common_1 = require("@nestjs/common");
const csv_service_1 = require("../csv/csv.service");
const config_module_1 = require("../config/config.module");
const search_service_1 = require("../search/search.service");
let PokeService = class PokeService {
    async isNameValid(name) {
        const pokemon_names = (await csv_service_1.CsvService.getColumnByIndex(config_module_1.AppConfig.poke_data_path, 0));
        pokemon_names.shift();
        for (let i = 0; i < pokemon_names.length; i++) {
            if (pokemon_names[i].toLowerCase() === name.toLowerCase()) {
                return true;
            }
        }
        return false;
    }
    async nameToIndex(name) {
        const pokemon_names = (await csv_service_1.CsvService.getColumnByIndex(config_module_1.AppConfig.poke_data_path, 1));
        for (let i = 0; i < pokemon_names.length; i++) {
            if (pokemon_names[i] === name) {
                return i;
            }
        }
        return -1;
    }
    async getRandomPokemon() {
        const randomLine = await csv_service_1.CsvService.getRandomLine(config_module_1.AppConfig.poke_data_path);
        const pokemonName = randomLine.split(csv_service_1.CsvService.separator)[0];
        return pokemonName;
    }
    async getPokemonName(index) {
        const pokemonInfo = await csv_service_1.CsvService.getLineByIndex(config_module_1.AppConfig.poke_data_path, index);
        return pokemonInfo.split(csv_service_1.CsvService.separator)[0];
    }
    async getAllPokemonAbilities(name) {
        const abilityList = [];
        const abilityNames = (await csv_service_1.CsvService.getLineByIndex(config_module_1.AppConfig.poke_ability_data_path, 1)).split(csv_service_1.CsvService.separator);
        const pokemonAbilities = (await csv_service_1.CsvService.getLineByColumn(config_module_1.AppConfig.poke_ability_data_path, 0, name)).split(csv_service_1.CsvService.separator);
        for (let i = 0; i < pokemonAbilities.length; i++) {
            if (pokemonAbilities[i] === '1') {
                abilityList.push(abilityNames[i]);
            }
        }
        return abilityList;
    }
    async getAbilityInfo(name) {
        let abilityInfo = await csv_service_1.CsvService.getLineByColumn(config_module_1.AppConfig.ability_info_path, 0, name);
        abilityInfo = abilityInfo.split(',').slice(1).join(',').replace("\"", "");
        return abilityInfo;
    }
    async getSuggestions(inputText) {
        const suggestions = [];
        const pokemon_names = (await csv_service_1.CsvService.getColumnByIndex(config_module_1.AppConfig.poke_data_path, 0));
        pokemon_names.shift();
        for (let i = 0; i < pokemon_names.length; i++) {
            let isSimiliar = await search_service_1.SearchService.isSimilar(inputText, pokemon_names[i]);
            if (isSimiliar) {
                suggestions.push(pokemon_names[i]);
            }
        }
        return suggestions;
    }
    async getAllPokemonMoves(name) {
        const moveList = [];
        const moveNames = (await csv_service_1.CsvService.getLineByIndex(config_module_1.AppConfig.poke_moves_path, 1)).split(csv_service_1.CsvService.separator);
        const pokemonMoves = (await csv_service_1.CsvService.getLineByColumn(config_module_1.AppConfig.poke_moves_path, 0, name)).split(csv_service_1.CsvService.separator);
        for (let i = 0; i < pokemonMoves.length; i++) {
            if (pokemonMoves[i] === '1') {
                moveList.push(moveNames[i]);
            }
        }
        return moveList;
    }
    async getMoveInfo(name) {
        let moveInfo = await csv_service_1.CsvService.getLineByColumn(config_module_1.AppConfig.move_info_path, 0, name);
        moveInfo = moveInfo.split(',').slice(1).join(',').replace("\"", "");
        return moveInfo;
    }
    async getPokemonStats(name) {
        return await csv_service_1.CsvService.getLineByColumn(config_module_1.AppConfig.poke_stats_path, 0, name);
    }
    async getPokemonTypes(name) {
        const typeList = [];
        const typeNames = (await csv_service_1.CsvService.getLineByIndex(config_module_1.AppConfig.poke_types_path, 1)).split(csv_service_1.CsvService.separator);
        const pokemonTypes = (await csv_service_1.CsvService.getLineByColumn(config_module_1.AppConfig.poke_types_path, 0, name)).split(csv_service_1.CsvService.separator);
        for (let i = 0; i < pokemonTypes.length; i++) {
            if (pokemonTypes[i] === '1') {
                typeList.push(typeNames[i]);
            }
        }
        return typeList;
    }
};
exports.PokeService = PokeService;
exports.PokeService = PokeService = __decorate([
    (0, common_1.Injectable)()
], PokeService);
//# sourceMappingURL=poke.service.js.map