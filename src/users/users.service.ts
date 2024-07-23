import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { nanoid } from 'nanoid';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';
import { InsertUser, SelectUser } from '../common/database';
import { CreateUsersDto } from './dto/create.users.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUsersDto) {
    const entity: InsertUser = {
      id: nanoid(),
      ...dto,
      createBy: dto.email,
      createdAt: new Date(),
    };

    return await this.usersRepository.create(entity);
  }

  async getUser(id: string) {
    return await this.usersRepository.findOneById(id);
  }

  /**
   * verify user
   * @param email
   * @param password
   * @returns
   */
  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('User Not Found');
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }

    return user;
  }

  async login(user: SelectUser, response: Response<any, Record<string, any>>) {
    // JWT 페이로드
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    // 쿠키 만료일시
    const expires = new Date();

    expires.setSeconds(
      expires.getSeconds() + Number(this.configService.get('JWT_EXPIRATION')),
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('accessToken', token, {
      httpOnly: true, // 브라우저(javascript)에서 쿠키를 접근할 수 없도록 제한 합니다.
      expires, // jwt 토큰 만료일시와 같게 쿠키 만료시간을 설정 합니다.
    });
  }
}
