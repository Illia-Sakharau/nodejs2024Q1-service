import { HttpException, HttpStatus } from '@nestjs/common';

class TrackNotFavoriteError extends HttpException {
  constructor() {
    super('Track is not favorite', HttpStatus.NOT_FOUND);
  }
}

export default TrackNotFavoriteError;
