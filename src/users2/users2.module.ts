import { Module } from '@nestjs/common';
import { Users2Service } from './users2.service';
import { Users2Controller } from './users2.controller';

@Module({
  controllers: [Users2Controller],
  providers: [Users2Service]
})
export class Users2Module {}
