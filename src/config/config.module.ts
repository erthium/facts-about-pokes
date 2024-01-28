import { Module } from '@nestjs/common';
import * as path from 'path';

export abstract class AppConfig {
    static readonly poke_data_path = path.join(__dirname, '../../data/pokemon/pokemon_data.csv');
    static readonly poke_ability_data_path = path.join(__dirname, '../../data/pokemon/pokemon_abilities_df.csv');
    static readonly ability_info_path = path.join(__dirname, '../../data/pokemon/abilities_df.csv');
    static readonly poke_moves_path = path.join(__dirname, '../../data/pokemon/pokemon_learnset_df.csv');
    static readonly move_info_path = path.join(__dirname, '../../data/pokemon/moves_df.csv');

}
