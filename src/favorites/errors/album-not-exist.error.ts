import { HttpException, HttpStatus } from '@nestjs/common';

class AlbumNotExistError extends HttpException {
  constructor() {
    super(`Album doesn't exist`, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export default AlbumNotExistError;
