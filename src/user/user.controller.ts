import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserId } from './entities/user.entity';
import { Response } from 'express';
import uuidValidateV4 from './utils/uuidValidateV4';
import prepareUserForResponse from './utils/prepareUserForResponse';

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
  findOne(@Param('id') id: UserId, @Res({ passthrough: true }) res: Response) {
    if (!uuidValidateV4(id)) {
      res.status(400).send({
        message: ['Not valid user ID'],
        error: 'Bad Request',
        statusCode: 400,
      });
      return;
    }
    const user = this.userService.findOne(id);
    if (!user) {
      res.status(404).send({
        message: ['User not exist'],
        error: 'Not Found',
        statusCode: 404,
      });
      return;
    }
    return prepareUserForResponse(user);
  }

  @Put(':id')
  update(
    @Param('id') id: UserId,
    @Res({ passthrough: true }) res: Response,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!uuidValidateV4(id)) {
      res.status(400).send({
        message: ['Not valid user ID'],
        error: 'Bad Request',
        statusCode: 400,
      });
      return;
    }
    const user = this.userService.findOne(id);
    if (!user) {
      res.status(404).send({
        message: ['User not exist'],
        error: 'Not Found',
        statusCode: 404,
      });
      return;
    }
    if (user.password !== updateUserDto.oldPassword) {
      res.status(403).send({
        message: ['Current password is wrong'],
        error: 'Forbidden',
        statusCode: 403,
      });
      return;
    }
    const updatedUser = this.userService.update(id, updateUserDto);
    return prepareUserForResponse(updatedUser);
  }

  @Delete(':id')
  remove(@Param('id') id: UserId, @Res({ passthrough: true }) res: Response) {
    if (!uuidValidateV4(id)) {
      res.status(400).send({
        message: ['Not valid user ID'],
        error: 'Bad Request',
        statusCode: 400,
      });
      return;
    }

    const isDeleted = this.userService.remove(id);
    if (!isDeleted) {
      res.status(404).send({
        message: ['User not exist'],
        error: 'Not Found',
        statusCode: 404,
      });
      return;
    }
    res.status(204);
  }
}
