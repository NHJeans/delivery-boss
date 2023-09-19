import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../../prisma/prisma.service';
import { OwnerLoginDto } from '../dto/owner.login.dto';

@Injectable()
export class OwnerLoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}
  //* 사용자가 이메일과 비밀번호로 로그인 요청
  async login(loginDto: OwnerLoginDto) {
    const { email, password } = loginDto;
    //* 제공된 이메일에 해당하는 사용자 정보를 데이터베이스에서 조회
    const user = await this.prisma.owner.findUnique({
      where: { email },
    });
    //* 이메일 일치 여부 확인
    if (!user) {
      throw new HttpException('이메일이 없습니다.', HttpStatus.UNAUTHORIZED);
    }
    //* 사용자 정보가 조회되면 bcrypt를 사용하여 제공된 비밀번호와 데이터베이스에 저장된 비밀번호를 비교
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException('로그인 정보가 올바르지 않습니다.', HttpStatus.UNAUTHORIZED);
    }

    //* 비밀번호가 일치하면 JWT 토큰을 생성. 이 토큰의 payload는 사용자의 ID만 포함
    const jwtPayload = { userId: user.id };
    //* 환경 변수에서 JWT_SECRET을 가져온다.
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    console.log('JWT_SECRET:', jwtSecret);
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not set');
    }
    const accessToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { message: '로그인에 성공하였습니다.', accessToken };
  }
  // customer.jwt.strategy.ts findone메서드 검증용
  async findOne(id: number) {
    return await this.prisma.customer.findUnique({
      where: { id },
    });
  }
}
