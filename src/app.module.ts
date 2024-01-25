import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokeController } from './poke/poke.controller';
import { PokeService } from './poke/poke.service';
import { CsvService } from './csv/csv.service';

@Module({
  imports: [],
  controllers: [AppController, PokeController],
  providers: [AppService, PokeService, CsvService],
})
export class AppModule {}
