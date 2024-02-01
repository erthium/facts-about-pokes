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
exports.PokeController = void 0;
const common_1 = require("@nestjs/common");
const poke_service_1 = require("./poke.service");
let PokeController = class PokeController {
    constructor(pokeService) {
        this.pokeService = pokeService;
    }
    async isNameValid(params) {
        try {
            const name = params.name;
            return this.pokeService.isNameValid(name);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Invalid', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getRandomPokemon() {
        try {
            return this.pokeService.getRandomPokemon();
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Invalid', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getPokemonByIndex(params) {
        try {
            const index = parseInt(params.index);
            return this.pokeService.getPokemonName(index);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Invalid', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAllPokemonAbilities(params) {
        try {
            return this.pokeService.getAllPokemonAbilities(params.name);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Invalid', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAllPokemonAbilitiesDef(params) {
        try {
            const abilityInfoList = [];
            const allPokeAbilities = await this.pokeService.getAllPokemonAbilities(params.name);
            for (let i = 0; i < allPokeAbilities.length; i++) {
                const abilityInfo = await this.pokeService.getAbilityInfo(allPokeAbilities[i]);
                abilityInfoList.push(abilityInfo);
            }
            return abilityInfoList;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Invalid', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getSuggestions(params) {
        try {
            const inputText = params.input;
            return this.pokeService.getSuggestions(inputText);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Invalid', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAllPokemonMoves(params) {
        try {
            return this.pokeService.getAllPokemonMoves(params.name);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Invalid', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAllPokemonMovesDef(params) {
        try {
            const moveInfoList = [];
            const allPokeMoves = await this.pokeService.getAllPokemonMoves(params.name);
            for (let i = 0; i < allPokeMoves.length; i++) {
                const moveInfo = await this.pokeService.getMoveInfo(allPokeMoves[i]);
                moveInfoList.push(moveInfo);
            }
            return moveInfoList;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Invalid', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getPokemonStats(params) {
        try {
            const name = params.name;
            return this.pokeService.getPokemonStats(name);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Invalid', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getPokemonTypes(params) {
        try {
            const name = params.name;
            return this.pokeService.getPokemonTypes(name);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Invalid', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.PokeController = PokeController;
__decorate([
    (0, common_1.Get)('valid/:name'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokeController.prototype, "isNameValid", null);
__decorate([
    (0, common_1.Get)('random'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PokeController.prototype, "getRandomPokemon", null);
__decorate([
    (0, common_1.Get)(':index'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokeController.prototype, "getPokemonByIndex", null);
__decorate([
    (0, common_1.Get)('abilities/:name'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokeController.prototype, "getAllPokemonAbilities", null);
__decorate([
    (0, common_1.Get)('abilities/defs/:name'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokeController.prototype, "getAllPokemonAbilitiesDef", null);
__decorate([
    (0, common_1.Get)('suggest/:input'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokeController.prototype, "getSuggestions", null);
__decorate([
    (0, common_1.Get)('moves/:name'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokeController.prototype, "getAllPokemonMoves", null);
__decorate([
    (0, common_1.Get)('moves/defs/:name'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokeController.prototype, "getAllPokemonMovesDef", null);
__decorate([
    (0, common_1.Get)('stats/:name'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokeController.prototype, "getPokemonStats", null);
__decorate([
    (0, common_1.Get)('types/:name'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokeController.prototype, "getPokemonTypes", null);
exports.PokeController = PokeController = __decorate([
    (0, common_1.Controller)('poke'),
    __metadata("design:paramtypes", [poke_service_1.PokeService])
], PokeController);
//# sourceMappingURL=poke.controller.js.map