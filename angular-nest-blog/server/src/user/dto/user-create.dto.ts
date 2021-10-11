import { UserDto } from './user.dto';

export class UserCreateDto extends UserDto {
  password?: string;
}
