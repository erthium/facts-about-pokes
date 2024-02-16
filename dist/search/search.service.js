"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
let SearchService = class SearchService {
    static async simplyfy(word) {
        const normalized = word.normalize('NFKD');
        const simplified = normalized.replace(/[^\x00-\x7F]/g, '');
        return simplified.toLowerCase();
    }
    static async levDistance(word, target) {
        if (word.length === 0)
            return target.length;
        if (target.length === 0)
            return word.length;
        const matrix = [];
        for (let i = 0; i <= target.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= word.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= target.length; i++) {
            for (let j = 1; j <= word.length; j++) {
                let sub_cost = 1;
                if (target[i - 1] === word[j - 1])
                    sub_cost = 0;
                matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + sub_cost);
            }
        }
        return matrix[target.length][word.length];
    }
    static async wordInWord(word, target) {
        if (word.length === 0 || target.length === 0)
            return false;
        word = await this.simplyfy(word);
        target = await this.simplyfy(target);
        return target.includes(word);
    }
    static async similarity(word, target) {
        if (word.length === 0 || target.length === 0)
            return 0;
        word = await this.simplyfy(word);
        target = await this.simplyfy(target);
        return 1 - (await this.levDistance(word, target) / Math.max(word.length, target.length));
    }
    static async isSimilar(str1, str2) {
        const similartiyPercentage = await this.similarity(str1, str2);
        if (similartiyPercentage > 0.72 || await this.wordInWord(str1, str2)) {
            return true;
        }
        return false;
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)()
], SearchService);
//# sourceMappingURL=search.service.js.map