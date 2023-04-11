import { Test, TestingModule } from '@nestjs/testing';
import { Users2Controller } from './users2.controller';
import { Users2Service } from './users2.service';

describe('Users2Controller', () => {
  let controller: Users2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Users2Controller],
      providers: [Users2Service],
    }).compile();

    controller = module.get<Users2Controller>(Users2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
