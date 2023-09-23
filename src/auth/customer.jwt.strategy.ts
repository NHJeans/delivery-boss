//src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CustomerLoginService } from '../customer/service/customer.login.service';

//* JWT 토큰을 이용한 전략 구현
@Injectable()
export class CustomerJwtStrategy extends PassportStrategy(Strategy, 'customerJwt') {
  constructor(
    private readonly customerLoginService: CustomerLoginService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { userId: number; type: string }) {
    console.log('JWT Validate Payload:', payload);
    //* 타입이 'Customer'가 아니라면 인증 에러 발생
    if (payload.type !== 'Customer') {
      throw new UnauthorizedException();
    }
    const customer = await this.customerLoginService.findOne(payload.userId);
    if (!customer) {
      throw new UnauthorizedException();
    }
    return customer;
  }
}
