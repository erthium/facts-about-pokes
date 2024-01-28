import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { PokeService } from './poke.service';
import { stringify } from 'querystring';

@Controller('poke')
export class PokeController {
    constructor(private readonly pokeService: PokeService) {}


    @Get('valid/:name')
    async isNameValid(@Param() params: any): Promise<boolean> {
        // return true if the name is valid
        try{
            const name: string = params.name;
            return this.pokeService.isNameValid(name);
        }
        catch (error){
            console.log(error);
            throw new HttpException('Invalid', HttpStatus.BAD_REQUEST);
        }
    }

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

    // get pokemon by name
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

    @Get('abilities/:name')
    async getAllPokemonAbilities(@Param() params: any): Promise<string[]> {
        try{
            return this.pokeService.getAllPokemonAbilities(params.name);
        }
        catch (error){
            console.log(error);
            throw new HttpException('Invalid', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('defs/:name')
    async getAllPokemonAbilitiesDef(@Param() params: any): Promise<string[]> {
        try{
            const ability_info: string[] = [];
            const allPokeAbilities: string[] = await this.pokeService.getAllPokemonAbilities(params.name);
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
