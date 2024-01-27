import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokeController } from './poke/poke.controller';
import { PokeService } from './poke/poke.service';
import { CsvService } from './csv/csv.service';
import { ImageController } from './image/image.controller';
import { ImageService } from './image/image.service';
import { SearchService } from './search/search.service';

@Module({
  imports: [],
  controllers: [AppController, PokeController, ImageController],
  providers: [AppService, PokeService, CsvService, ImageService, SearchService],
})
export class AppModule {}
