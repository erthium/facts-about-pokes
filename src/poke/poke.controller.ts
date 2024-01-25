import { Controller, Get, Param } from '@nestjs/common';
import { PokeService } from './poke.service';

@Controller('poke')
export class PokeController {
    constructor(private readonly pokeService: PokeService) {}

    @Get('random')
    async getRandomPokemon(): Promise<string> {
        // return 'random pokemon' when the route is /poke/random
        return this.pokeService.getRandomPokemon();
    }

    // get pokemon by index
    @Get(':index')
    async getPokemonByIndex(@Param() params: any): Promise<string> {
        //parse params.index to number
        try{
            const index: number = parseInt(params.index);
            return this.pokeService.getPokemonName(index);
        }
        catch (error){
            console.log(error);
            return '';
        }
    }

    @Get('all/:index')
    async getAllPokemonAbilities(@Param() params: any): Promise<string[]> {
        try{
            const index: number = parseInt(params.index);
            const pokeName: string = await this.pokeService.getPokemonName(index)
            return this.pokeService.getAllPokemonAbilities(pokeName);
        }
        catch (error){
            console.log(error);
            return [];
        }
    }

    @Get('def/:index')
    async getAllPokemonAbilitiesDef(@Param() params: any): Promise<string[]> {
        try{
            const index: number = parseInt(params.index);
            const pokeName: string = await this.pokeService.getPokemonName(index)
            const ability_info: string[] = [];
            const allPokeAbilities: string[] = await this.pokeService.getAllPokemonAbilities(pokeName);
            for (let i = 0; i < allPokeAbilities.length; i++) {
                ability_info.push(await this.pokeService.getAbilityInfo(allPokeAbilities[i]));
            }
            return ability_info;
        }
        catch (error){
            console.log(error);
            return [];
        }
    }
}
