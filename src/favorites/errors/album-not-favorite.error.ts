import { HttpException, HttpStatus } from '@nestjs/common';

class AlbumNotFavoriteError extends HttpException {
  constructor() {
    super('Album is not favorite', HttpStatus.NOT_FOUND);
  }
}

export default AlbumNotFavoriteError;
