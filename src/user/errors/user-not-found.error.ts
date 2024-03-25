import { HttpException, HttpStatus } from '@nestjs/common';

class UserNotFoundError extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}

export default UserNotFoundError;
