import { Injectable, NotFoundException  } from '@nestjs/common';
import { CreateUsers2Dto } from './dto/create-users2.dto';
import { UpdateUsers2Dto } from './dto/update-users2.dto';
import { Users2 } from './entities/users2.entity';

@Injectable()
export class Users2Service {
  private users: Array<Users2> = [];
  private id = 0;

  create(createUserDto: CreateUsers2Dto) {
    this.users.push({ id: ++this.id, ...createUserDto, createdAt: new Date() });
  }

  findAll() {
    return [...this.users];
  }

  findOne(id: number) {
    const found = this.users.find((u) => u.id === id);
    if (!found) throw new NotFoundException();
    return found;
  }

  update(id: number, updateUserDto: UpdateUsers2Dto) {
    const found = this.findOne(id);
    this.remove(id);
    this.users.push({ ...found, ...updateUserDto, updatedAt: new Date() });
  }

  remove(id: number) {
    this.findOne(id);
    this.users = this.users.filter((u) => u.id !== id);
  }
}
