import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { CustomerSignUpDto } from '../dto/customer.signup.dto';

@Injectable()
export class CustomerSignupService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(signupDto: CustomerSignUpDto) {
    const { email, password } = signupDto;

    //* 이메일 중복 확인
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { email },
    });
    if (existingCustomer) {
      throw new HttpException('이메일이 이미 사용중입니다.', HttpStatus.BAD_REQUEST);
    }
    const existingOwner = await this.prisma.owner.findUnique({
      where: { email },
    });
    if (existingOwner) {
      throw new HttpException('이메일이 이미 사용 중입니다.', HttpStatus.BAD_REQUEST);
    }
    //* 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    //* 사용자 생성
    await this.prisma.customer.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return { message: '회원가입에 성공하였습니다.' };
  }
}
