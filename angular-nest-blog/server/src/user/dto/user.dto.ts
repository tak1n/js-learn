import { UserEntity } from '../user.entity';

export class UserDto {
  id?: string;
  name?: string;
  username?: string;
  email?: string;

  static toDTO(user: UserEntity) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    };
  }
}
