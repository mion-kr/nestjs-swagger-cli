import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUsersDto {
  /**
   * 이메일
   * @example test1@gmail.com
   */
  @IsEmail()
  email: string;

  /**
   * 비밀번호
   * @example a12345678!
   */
  @IsStrongPassword()
  password: string;

  /**
   * 닉네임
   * @example 미온
   */
  @IsString()
  nickName: string;
}
