import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserId } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.save(createUserDto);
    return newUser;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: UserId) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return user;
  }

  async update(id: UserId, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) return undefined;

    user.password = updateUserDto.newPassword;
    user.version++;
    return await this.userRepository.save(user);
  }

  async remove(id: UserId) {
    const user = await this.findOne(id);
    if (!user) return undefined;
    await this.userRepository.delete(id);
    return true;
  }
}
