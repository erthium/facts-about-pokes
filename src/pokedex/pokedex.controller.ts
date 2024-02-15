import { Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { PokedexService } from './pokedex.service';


@Controller('pokedex')
export class PokedexController {
    constructor(private pokedexService: PokedexService) { }

    @Get('test')
    async testConnection(): Promise<boolean> {
        return await this.pokedexService.testConnection();
    }

    @Get('ask/:name/:questionTitle')
    async askQuestion(@Param() params: any): Promise<string> {
        try {
            const { name, questionTitle } = params;
            if (questionTitle === 'about') {
                return await this.pokedexService.askAboutMore(name);
            }
            else if (questionTitle === 'weaknesses') {
                return await this.pokedexService.askAboutWeaknesses(name);
            }
            else if (questionTitle === 'strengths') {
                return await this.pokedexService.askAboutStrengths(name);
            }
            else {
                throw new HttpException('Invalid question title', HttpStatus.BAD_REQUEST);
            }
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
