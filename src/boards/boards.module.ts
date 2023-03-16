import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService]    // providers 등록하면 의존성주입을 할 수 있다.
})
export class BoardsModule {}
