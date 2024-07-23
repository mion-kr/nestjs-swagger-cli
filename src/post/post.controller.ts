import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthEnum } from '../auth/enum/auth.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create.post.dto';

@ApiTags('포스트')
@Controller('post')
@ApiCookieAuth(AuthEnum.ACCESS_TOKEN)
@UseGuards(JwtAuthGuard)
export class PostController {
  /**
   * [마일스톤 2024 v3] 등록
   */
  @Post()
  @ApiCreatedResponse({ description: '등록 성공' })
  async create(@Body() dto: CreatePostDto) {
    return undefined;
  }
}
