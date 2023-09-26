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
    //? 암호화에 사용되는 솔트(salt)를 생성하는 데 필요한 반복 횟수를 나타내며, 이 반복 횟수는 비밀번호 해싱의 복잡성과 시간을 결정
    //? 10은 비밀번호를 암호화할 때 해싱 함수가 반복적으로 실행되는 횟수

    console.log(hashedPassword);

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
