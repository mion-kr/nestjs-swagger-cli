import { IsString } from 'class-validator';

export class CreatePostDto {
  /**
   * 포스트의 제목 입니다.
   * @example 제목입니다.
   */
  @IsString()
  title: string;

  /**
   * 포스트 내용
   * @example 내요내요요용요요요
   */
  @IsString({ message: '' })
  content?: string;

  /**
   * 이미지 url. 업로드한 후 response 된 url을 입력 합니다.
   * @example a;sldkjfasd;fljds.jpg
   */
  imageUrls?: string;

  /**
   * 상태
   * @example DELETE
   */
  status: PostStatus;
}

enum PostStatus {
  OK = 'OK',
  FAILED = 'FAILED',
  DELETE = 'DELETE',
}
