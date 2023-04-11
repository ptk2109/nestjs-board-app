import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { Users2Module } from './users2/users2.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    AuthModule,
    Users2Module
  ],
})
export class AppModule {}
