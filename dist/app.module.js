"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const poke_controller_1 = require("./poke/poke.controller");
const poke_service_1 = require("./poke/poke.service");
const csv_service_1 = require("./csv/csv.service");
const image_controller_1 = require("./image/image.controller");
const image_service_1 = require("./image/image.service");
const search_service_1 = require("./search/search.service");
const pokedex_controller_1 = require("./pokedex/pokedex.controller");
const pokedex_service_1 = require("./pokedex/pokedex.service");
const open_ai_service_1 = require("./open_ai/open_ai.service");
const ai_history_service_1 = require("./ai_history/ai_history.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({
                envFilePath: '.env',
            })],
        controllers: [
            app_controller_1.AppController,
            poke_controller_1.PokeController,
            image_controller_1.ImageController,
            pokedex_controller_1.PokedexController
        ],
        providers: [
            app_service_1.AppService,
            poke_service_1.PokeService,
            csv_service_1.CsvService,
            image_service_1.ImageService,
            search_service_1.SearchService,
            pokedex_service_1.PokedexService,
            open_ai_service_1.OpenAiService,
            ai_history_service_1.AiHistoryService
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map