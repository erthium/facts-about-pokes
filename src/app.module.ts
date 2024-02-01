import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokeController } from './poke/poke.controller';
import { PokeService } from './poke/poke.service';
import { CsvService } from './csv/csv.service';
import { ImageController } from './image/image.controller';
import { ImageService } from './image/image.service';
import { SearchService } from './search/search.service';
import { PokedexController } from './pokedex/pokedex.controller';
import { PokedexService } from './pokedex/pokedex.service';
import { OpenAiService } from './open_ai/open_ai.service';
import { AiHistoryService } from './ai_history/ai_history.service';

@Module({
  imports: [],
  controllers: [
    AppController, 
    PokeController, 
    ImageController, 
    PokedexController
  ],
  providers: [
    AppService, 
    PokeService, 
    CsvService, 
    ImageService, 
    SearchService, 
    PokedexService, 
    OpenAiService, 
    AiHistoryService
  ],
})
export class AppModule {}
