import { HttpException, HttpStatus } from '@nestjs/common';

class IncorrectIdError extends HttpException {
  constructor() {
    super('Not valid user ID', HttpStatus.BAD_REQUEST);
  }
}

export default IncorrectIdError;
