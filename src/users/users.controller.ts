import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LocalAuthGuards } from '../auth/guards/local-auth.guard';
import { SelectUser } from '../common/database';
import { CurrentUser } from '../common/decorators/current-user-decorator';
import { CreateUsersDto } from './dto/create.users.dto';
import { LoginUsersDto } from './dto/login.users.dto';
import { UsersService } from './users.service';

@ApiTags('사용자')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 회원가입
   */
  @Post()
  async create(@Body() dto: CreateUsersDto) {
    return await this.usersService.createUser(dto);
  }

  /**
   * 로그인
   */
  @Post('/login')
  @UseGuards(LocalAuthGuards)
  async login(
    @Body() dto: LoginUsersDto,
    @CurrentUser() user: SelectUser,
    @Res({ passthrough: true }) response: Response, // nest에서 제공해주는 response 대신 native express response를 사용하고 싶을 때) {}
  ) {
    // 여기서는 쿠키로 JWT 데이터를 응답합니다.
    await this.usersService.login(user, response);
    response.send({ result: '로그인성공' });
  }
}
