import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class OwnerSignUpDto {
  @IsEmail({}, { message: '이메일 형식이 아닙니다' })
  @IsNotEmpty({ message: '이메일이 비어 있으면 안됩니다' })
  @ApiProperty({
    description: '사용자의 이메일 주소',
    example: 'user@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호가 비어 있으면 안됩니다' })
  @MinLength(6, { message: '비밀번호는 6자 이상이어야 합니다' })
  @ApiProperty({
    description: '사용자의 비밀번호',
    example: 'password12',
  })
  password: string;
}
