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
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const poke_controller_1 = require("./poke/poke.controller");
const poke_service_1 = require("./poke/poke.service");
const csv_service_1 = require("./csv/csv.service");
const image_controller_1 = require("./image/image.controller");
const image_service_1 = require("./image/image.service");
const search_service_1 = require("./search/search.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [app_controller_1.AppController, poke_controller_1.PokeController, image_controller_1.ImageController],
        providers: [app_service_1.AppService, poke_service_1.PokeService, csv_service_1.CsvService, image_service_1.ImageService, search_service_1.SearchService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map