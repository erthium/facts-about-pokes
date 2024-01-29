import { Injectable } from '@nestjs/common';
import { CsvService } from 'src/csv/csv.service';
import { AppConfig } from 'src/config/config.module';
import { SearchService } from 'src/search/search.service';

@Injectable()
export class PokeService {

    async isNameValid(name: string): Promise<boolean> {
        const pokemon_names: string[] = (await CsvService.getColumnByIndex(AppConfig.poke_data_path, 0));
        // remove the first element of the array which is the column name
        pokemon_names.shift();
        for (let i = 0; i < pokemon_names.length; i++) {
            if (pokemon_names[i].toLowerCase() === name.toLowerCase()) {
                return true;
            }
        }
        return false;
    }


    async nameToIndex(name: string): Promise<number> {
        const pokemon_names: string[] = (await CsvService.getColumnByIndex(AppConfig.poke_data_path, 1));
        for (let i = 0; i < pokemon_names.length; i++) {
            if (pokemon_names[i] === name) {
                return i;
            }
        }
        return -1;
    }

    // get the random pokemon line from the csv file
    // return the pokemon name
    async getRandomPokemon(): Promise<string> {
        const randomLine = await CsvService.getRandomLine(AppConfig.poke_data_path);
        // get poke name from the line
        const pokemonName = randomLine.split(CsvService.separator)[0];
        return pokemonName;
    }


    // get the pokemon name by line number
    async getPokemonName(index: number): Promise<string> {
        const pokemonInfo = await CsvService.getLineByIndex(AppConfig.poke_data_path, index);
        return pokemonInfo.split(CsvService.separator)[0];
    }


    async getAllPokemonAbilities(name: string): Promise<string[]> {
        const abilityList: string[] = [];
        const abilityNames: string[] = (await CsvService.getLineByIndex(AppConfig.poke_ability_data_path, 1)).split(CsvService.separator);
        const pokemonAbilities: string[] = (await CsvService.getLineByColumn(AppConfig.poke_ability_data_path, 0, name)).split(CsvService.separator);
        for (let i = 0; i < pokemonAbilities.length; i++) {
            if (pokemonAbilities[i] === '1') {
                abilityList.push(abilityNames[i]);
            }
        }
        return abilityList;
    }


    async getAbilityInfo(name: string): Promise<string> {
        let abilityInfo: string = await CsvService.getLineByColumn(AppConfig.ability_info_path, 0, name);
        abilityInfo = abilityInfo.split(',').slice(1).join(',').replace("\"", "");
        return abilityInfo;
    }


    async getSuggestions(inputText: string): Promise<string[]> {
        const suggestions: string[] = [];
        const pokemon_names: string[] = (await CsvService.getColumnByIndex(AppConfig.poke_data_path, 0));
        // remove the first element of the array which is the column name
        pokemon_names.shift();
        for (let i = 0; i < pokemon_names.length; i++) {
            let isSimiliar = await SearchService.isSimilar(inputText, pokemon_names[i]);
            if (isSimiliar) {
                suggestions.push(pokemon_names[i]);
            }
        }
        return suggestions;
    }


    async getAllPokemonMoves(name: string): Promise<string[]> {
        const moveList: string[] = [];
        const moveNames: string[] = (await CsvService.getLineByIndex(AppConfig.poke_moves_path, 1)).split(CsvService.separator);
        const pokemonMoves: string[] = (await CsvService.getLineByColumn(AppConfig.poke_moves_path, 0, name)).split(CsvService.separator);
        for (let i = 0; i < pokemonMoves.length; i++) {
            if (pokemonMoves[i] === '1') {
                moveList.push(moveNames[i]);
            }
        }
        return moveList;
    }


    async getMoveInfo(name: string): Promise<string> {
        let moveInfo: string = await CsvService.getLineByColumn(AppConfig.move_info_path, 0, name);
        moveInfo = moveInfo.split(',').slice(1).join(',').replace("\"", "");
        return moveInfo;
    }


    async getPokemonStats(name: string): Promise<string> {
        return await CsvService.getLineByColumn(AppConfig.poke_stats_path, 0, name);
    }


    async getPokemonTypes(name: string): Promise<string[]> {
        const typeList: string[] = [];
        const typeNames: string[] = (await CsvService.getLineByIndex(AppConfig.poke_types_path, 1)).split(CsvService.separator);
        const pokemonTypes: string[] = (await CsvService.getLineByColumn(AppConfig.poke_types_path, 0, name)).split(CsvService.separator);
        for (let i = 0; i < pokemonTypes.length; i++) {
            if (pokemonTypes[i] === '1') {
                typeList.push(typeNames[i]);
            }
        }
        return typeList;
    }

}
