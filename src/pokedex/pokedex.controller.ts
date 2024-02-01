import { Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { PokedexService } from './pokedex.service';


@Controller('pokedex')
export class PokedexController {
    constructor(private pokedexService: PokedexService) { }

    @Get('ask/:name/:questionTitle')
    async askQuestion(@Param() params: any): Promise<void> {
        try {
            const { name, questionTitle } = params;
            //const answer: string = await this.pokedexService.askAboutMore(name);
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
