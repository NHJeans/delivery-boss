import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthEntity } from 'src/auth/entity/auth.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { OwnerLoginDto } from '../dto/owner.login.dto';

@Injectable()
export class OwnerLoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}
  //* 사용자가 이메일과 비밀번호로 로그인 요청
  async login(loginDto: OwnerLoginDto): Promise<AuthEntity> {
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

    const accessToken = this.jwtService.sign(jwtPayload, { expiresIn: '5m', secret: this.configService.get<string>('JWT_SECRET') });
    const refreshToken = this.jwtService.sign(jwtPayload, { expiresIn: '7d', secret: this.configService.get<string>('JWT_REFRESH_SECRET') });

    await this.prisma.owner.update({
      where: { id: user.id },
      data: { refreshToken },
    });
    return { message: '로그인에 성공하였습니다.', accessToken };
  }
  async renewAccessToken(refreshToken: string): Promise<AuthEntity> {
    let userId: number;
    try {
      const decoded = this.jwtService.verify(refreshToken, { secret: this.configService.get<string>('JWT_REFRESH_SECRET') });
      userId = decoded.userId;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.prisma.owner.findUnique({
      where: { id: userId },
      select: { id: true, refreshToken: true },
    });

    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const jwtPayload = { userId: user.id };
    const newAccessToken = this.jwtService.sign(jwtPayload, { expiresIn: '5m', secret: this.configService.get<string>('JWT_SECRET') });
    return { message: '새로운 액세스 토큰이 생성되었습니다.', accessToken: newAccessToken };
  }
  //* 로그아웃 요청
  async logout(userId: number): Promise<{ message: string }> {
    await this.prisma.owner.update({
      where: { id: userId }, // <-- 이 부분을 수정했습니다.
      data: { refreshToken: null },
    });
    return { message: '로그아웃에 성공하였습니다.' };
  }
  async findOne(id: number) {
    return await this.prisma.customer.findUnique({
      where: { id },
    });
  }
}
