import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { OwnerSignUpDto } from '../dto/owner.signup.dto'; // OwnerSignupDto를 정의해주세요

@Injectable()
export class OwnerSignupService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(signupDto: OwnerSignUpDto) {
    const { email, password } = signupDto;

    //* 이메일 중복 확인
    const existingUser = await this.prisma.owner.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new HttpException('이메일이 이미 사용중입니다.', HttpStatus.BAD_REQUEST);
    }

    //* 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    //* 소유자 생성
    await this.prisma.owner.create({
      data: {
        email,
        password: hashedPassword,
        point: 0,
      },
    });

    return { message: '회원가입에 성공하였습니다.' };
  }
}
