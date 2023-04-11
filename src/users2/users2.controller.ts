import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Users2Service } from './users2.service';
import { CreateUsers2Dto } from './dto/create-users2.dto';
import { UpdateUsers2Dto } from './dto/update-users2.dto';

@Controller('users2')
export class Users2Controller {
  constructor(private readonly usersService: Users2Service) {}

  @Post()
  create(@Body() createUser2Dto: CreateUsers2Dto) {
    return this.usersService.create(createUser2Dto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUser2Dto: UpdateUsers2Dto) {
    return this.usersService.update(+id, updateUser2Dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
