import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserId } from './entities/user.entity';
import prepareUserForResponse from './utils/prepare-user-for-response.util';
import uuidValidateV4 from './utils/uuid-user-validate.util';
import IncorrectIdError from './errors/incorrect-user-id.error copy';
import UserNotFoundError from './errors/user-not-found.error';
import InvalidUserPassword from './errors/invalid-user-password.error';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const newUser = this.userService.create(createUserDto);
    return prepareUserForResponse(newUser);
  }

  @Get()
  findAll() {
    return this.userService
      .findAll()
      .map((user) => prepareUserForResponse(user));
  }

  @Get(':id')
  findOne(@Param('id') id: UserId) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const user = this.userService.findOne(id);
    if (!user) throw new UserNotFoundError();
    return prepareUserForResponse(user);
  }

  @Put(':id')
  update(@Param('id') id: UserId, @Body() updateUserDto: UpdateUserDto) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const user = this.userService.findOne(id);
    if (!user) throw new UserNotFoundError();
    if (user.password !== updateUserDto.oldPassword) {
      throw new InvalidUserPassword();
    }
    const updatedUser = this.userService.update(id, updateUserDto);
    return prepareUserForResponse(updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: UserId) {
    if (!uuidValidateV4(id)) throw new IncorrectIdError();
    const isDeleted = this.userService.remove(id);
    if (!isDeleted) throw new UserNotFoundError();
    return;
  }
}
