import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { Strategies } from './strategies';

@Module({
  imports: [UsersModule],
  providers: [...Strategies],
})
export class AuthModule {}
