"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = void 0;
const path = require("path");
class AppConfig {
}
exports.AppConfig = AppConfig;
AppConfig.poke_data_path = path.join(__dirname, '../../data/pokemon/pokemon_data.csv');
AppConfig.poke_ability_data_path = path.join(__dirname, '../../data/pokemon/pokemon_abilities_df.csv');
AppConfig.ability_info_path = path.join(__dirname, '../../data/pokemon/abilities_df.csv');
AppConfig.poke_moves_path = path.join(__dirname, '../../data/pokemon/pokemon_learnsets_df.csv');
AppConfig.move_info_path = path.join(__dirname, '../../data/pokemon/moves_df.csv');
AppConfig.poke_stats_path = path.join(__dirname, '../../data/pokemon/pokemon_df.csv');
AppConfig.poke_types_path = path.join(__dirname, '../../data/pokemon/pokemon_types_df.csv');
AppConfig.pokedex_history_path = path.join(__dirname, '../../data/pokedex/pokedex_history.json');
//# sourceMappingURL=config.module.js.map