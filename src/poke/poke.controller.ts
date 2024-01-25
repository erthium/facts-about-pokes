import { Controller, Get } from '@nestjs/common';
import { PokeService } from './poke.service';

@Controller('poke')
export class PokeController {
    constructor(private readonly pokeService: PokeService) {}

    @Get('random')
    async getRandomPokemon(): Promise<string> {
        // return 'random pokemon' when the route is /poke/random
        return this.pokeService.getRandomPokemon();
    }

    // get pokemon by line number
    @Get(':index')
    async getPokemonByIndex(index: number): Promise<string> {
        return this.pokeService.getPokemonName(index);
    }

    @Get('all/:index')
    async getAllPokemonAbilities(index: number): Promise<string[]> {
        const pokeName: string = await this.pokeService.getPokemonName(index)
        return this.pokeService.getAllPokemonAbilities(pokeName);
    }

    @Get('def/:index')
    async getAllPokemonAbilitiesDef(index: number): Promise<string[]> {
        const pokeName: string = await this.pokeService.getPokemonName(index)
        const ability_info: string[] = [];
        const allPokeAbilities: string[] = await this.pokeService.getAllPokemonAbilities(pokeName);
        for (let i = 0; i < allPokeAbilities.length; i++) {
            ability_info.push(await this.pokeService.getAbilityInfo(allPokeAbilities[i]));
        }
        return ability_info;
    }

}
