import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { PokeService } from './poke.service';

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


    @Get('abilities/defs/:name')
    async getAllPokemonAbilitiesDef(@Param() params: any): Promise<string[]> {
        try{
            const abilityInfoList: string[] = [];
            const allPokeAbilities: string[] = await this.pokeService.getAllPokemonAbilities(params.name);
            for (let i = 0; i < allPokeAbilities.length; i++) {
                const abilityInfo: string = await this.pokeService.getAbilityInfo(allPokeAbilities[i]);
                abilityInfoList.push(abilityInfo);
            }
            return abilityInfoList;
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


    @Get('moves/:name')
    async getAllPokemonMoves(@Param() params: any): Promise<string[]> {
        try{
            return this.pokeService.getAllPokemonMoves(params.name);
        }
        catch (error){
            console.log(error);
            throw new HttpException('Invalid', HttpStatus.BAD_REQUEST);
        }
    }

    
    @Get('moves/defs/:name')
    async getAllPokemonMovesDef(@Param() params: any): Promise<string[]> {
        try{
            const moveInfoList: string[] = [];
            const allPokeMoves: string[] = await this.pokeService.getAllPokemonMoves(params.name);
            for (let i = 0; i < allPokeMoves.length; i++) {
                const moveInfo: string = await this.pokeService.getMoveInfo(allPokeMoves[i]);
                moveInfoList.push(moveInfo);
            }
            return moveInfoList;
        }
        catch (error){
            console.log(error);
            throw new HttpException('Invalid', HttpStatus.BAD_REQUEST);
        }
    }


    @Get('stats/:name')
    async getPokemonStats(@Param() params: any): Promise<string> {
        try{
            const name: string = params.name;
            return this.pokeService.getPokemonStats(name);
        }
        catch (error){
            console.log(error);
            throw new HttpException('Invalid', HttpStatus.BAD_REQUEST);
        }
    }


    @Get('types/:name')
    async getPokemonTypes(@Param() params: any): Promise<string[]> {
        try{
            const name: string = params.name;
            return this.pokeService.getPokemonTypes(name);
        }
        catch (error){
            console.log(error);
            throw new HttpException('Invalid', HttpStatus.BAD_REQUEST);
        }
    }

}
