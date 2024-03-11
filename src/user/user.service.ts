import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { User, UserId } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: Record<UserId, User> = {};

  create(createUserDto: CreateUserDto) {
    const id = uuidv4();
    const dateNow = Date.now();
    const newUser = {
      id,
      version: 1,
      createdAt: dateNow,
      updatedAt: dateNow,
      ...createUserDto,
    };
    this.users[id] = newUser;
    return newUser;
  }

  findAll() {
    return Object.values(this.users);
  }

  findOne(id: UserId) {
    const user = this.users[id];
    if (!user) return undefined;
    return user;
  }

  update(id: UserId, updateUserDto: UpdateUserDto) {
    const user = this.users[id];
    if (!user) return undefined;
    const dateNow = Date.now();
    user.password = updateUserDto.newPassword;
    user.updatedAt = dateNow;
    user.version++;

    return user;
  }

  remove(id: UserId) {
    const user = this.users[id];
    if (!user) return undefined;
    delete this.users[id];
    return true;
  }
}
