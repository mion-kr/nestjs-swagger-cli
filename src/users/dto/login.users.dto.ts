import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginUsersDto {
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
}
