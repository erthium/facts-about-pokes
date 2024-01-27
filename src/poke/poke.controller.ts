import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { PokeService } from './poke.service';
import { stringify } from 'querystring';

@Controller('poke')
export class PokeController {
    constructor(private readonly pokeService: PokeService) {}

    @Get('random')
    async getRandomPokemon(): Promise<string> {
        // return 'random pokemon' when the route is /poke/random
        try{
            return this.pokeService.getRandomPokemon();
        }
        catch (error){
            console.log(error);
            throw new HttpException('Invalid', HttpStatus.BAD_REQUEST);
        }
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
            throw new HttpException('Invalid', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('abilities/:index')
    async getAllPokemonAbilities(@Param() params: any): Promise<string[]> {
        try{
            const index: number = parseInt(params.index);
            const pokeName: string = await this.pokeService.getPokemonName(index)
            return this.pokeService.getAllPokemonAbilities(pokeName);
        }
        catch (error){
            console.log(error);
            throw new HttpException('Invalid', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('defs/:index')
    async getAllPokemonAbilitiesDef(@Param() params: any): Promise<string[]> {
        try{
            const index: number = parseInt(params.index);
            const pokeName: string = await this.pokeService.getPokemonName(index)
            const ability_info: string[] = [];
            const allPokeAbilities: string[] = await this.pokeService.getAllPokemonAbilities(pokeName);
            for (let i = 0; i < allPokeAbilities.length; i++) {
                let abilityInfo: string = await this.pokeService.getAbilityInfo(allPokeAbilities[i]);
                abilityInfo = abilityInfo.split(',').slice(1).join(',').replace("\"", "");        
                ability_info.push(abilityInfo);
            }
            return ability_info;
        }
        catch (error){
            console.log(error);
            throw new HttpException('Invalid', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('suggest/:input')
    async getSuggestions(@Param() params: any): Promise<string[]> {
        try{
            const inputText: string = params.input;
            return this.pokeService.getSuggestions(inputText);
        }
        catch (error){
            console.log(error);
            throw new HttpException('Invalid', HttpStatus.BAD_REQUEST);
        }
    }
}
