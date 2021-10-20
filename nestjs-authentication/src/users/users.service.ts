import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Benny',
      username: 'benny',
      password: 'muchsecurewow',
    },
    {
      id: 2,
      name: 'Julia',
      username: 'julia',
      password: 'securewowmuch',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
