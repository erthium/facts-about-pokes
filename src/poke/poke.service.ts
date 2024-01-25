import { Injectable } from '@nestjs/common';
import { CsvService } from 'src/csv/csv.service';
import { AppConfig } from 'src/config/config.module';


@Injectable()
export class PokeService {
    // get the random pokemon line from the csv file
    // return the pokemon name
    async getRandomPokemon(): Promise<string> {
        const randomLine = await CsvService.getRandomLine(AppConfig.poke_data_path);
        return randomLine;
    }

    
    // get the pokemon name by line number
    async getPokemonName(index: number): Promise<string> {
        const pokemonInfo = await CsvService.getLineByIndex(AppConfig.poke_data_path, index);
        return pokemonInfo[0];
    }


    async getAllPokemonAbilities(name: string): Promise<string[]> {
        const abilityList: string[] = [];
        const ability_names: string[] = (await CsvService.getLineByIndex(AppConfig.poke_ability_data_path, 0)).split(',').slice(1);
        const pokemon_abilities: string[] = (await CsvService.getLineByColumn(AppConfig.poke_ability_data_path, 0, name)).split(',').slice(1);
        for (let i = 0; i < pokemon_abilities.length; i++) {
            if (pokemon_abilities[i] === '1') {
                abilityList.push(ability_names[i]);
            }
        }
        return abilityList;
    }


    async getAbilityInfo(name: string): Promise<string> {
        return await CsvService.getLineByColumn(AppConfig.ability_info_path, 0, name);
    }
}
