import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateJWT(userDto: UserDto): Promise<string> {
    return this.jwtService.signAsync({ userDto });
  }

  hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  comparePasswords(password: string, passwordHash: string): Promise<any> {
    return bcrypt.compare(password, passwordHash);
  }
}
