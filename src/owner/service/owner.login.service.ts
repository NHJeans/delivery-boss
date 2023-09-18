import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OwnerLoginDto } from '../dto/owner.login.dto'; // OwnerLoginDto를 정의해주세요
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class OwnerLoginService {
  constructor(private readonly prisma: PrismaService) {}

  async login(loginDto: OwnerLoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.owner.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException('로그인 정보가 올바르지 않습니다.', HttpStatus.UNAUTHORIZED);
    }

    // JWT 생성 로직
    const jwtPayload = { userId: user.id };
    const accessToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { message: '로그인에 성공하였습니다.', accessToken };
  }
}
