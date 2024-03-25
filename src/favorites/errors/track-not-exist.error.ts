import { HttpException, HttpStatus } from '@nestjs/common';

class TrackNotExistError extends HttpException {
  constructor() {
    super(`Track doesn't exist`, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export default TrackNotExistError;
