import { User } from '../entities/user.entity';

function prepareUserForResponse(user: User) {
  return {
    id: user.id,
    login: user.login,
    version: user.version,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export default prepareUserForResponse;
