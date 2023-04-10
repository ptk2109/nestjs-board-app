import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmExModule } from 'src/configs/typeorm/typeorm-ex.module';
import { BoardRepository } from './board.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BoardRepository]),
    AuthModule
  ],
  controllers: [BoardsController],
  providers: [BoardsService]    // providers 등록하면 의존성주입을 할 수 있다.
})
export class BoardsModule {}
