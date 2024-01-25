import { Test, TestingModule } from '@nestjs/testing';
import { PokeService } from './poke.service';

describe('PokeService', () => {
  let service: PokeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokeService],
    }).compile();

    service = module.get<PokeService>(PokeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
