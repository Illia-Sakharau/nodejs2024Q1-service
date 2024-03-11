import { HttpException, HttpStatus } from '@nestjs/common';

class InvalidUserPassword extends HttpException {
  constructor() {
    super('Current password is wrong', HttpStatus.FORBIDDEN);
  }
}

export default InvalidUserPassword;
