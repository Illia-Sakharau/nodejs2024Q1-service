import { HttpException, HttpStatus } from '@nestjs/common';

class TrackNotFoundError extends HttpException {
  constructor() {
    super('Track not found', HttpStatus.NOT_FOUND);
  }
}

export default TrackNotFoundError;
