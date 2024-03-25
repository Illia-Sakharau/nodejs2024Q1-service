import { HttpException, HttpStatus } from '@nestjs/common';

class IncorrectIdError extends HttpException {
  constructor() {
    super('Not valid album ID', HttpStatus.BAD_REQUEST);
  }
}

export default IncorrectIdError;
