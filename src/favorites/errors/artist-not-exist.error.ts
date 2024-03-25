import { HttpException, HttpStatus } from '@nestjs/common';

class ArtistNotExistError extends HttpException {
  constructor() {
    super(`Artist doesn't exist`, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export default ArtistNotExistError;
