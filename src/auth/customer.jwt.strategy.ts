//src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CustomerLoginService } from '../customer/service/customer.login.service';
import { jwtSecret } from './auth.module';

//* JWT 토큰을 이용한 전략 구현
@Injectable()
export class CustomerJwtStrategy extends PassportStrategy(Strategy, 'customer-jwt') {
  constructor(private readonly customerLoginService: CustomerLoginService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { id: number }) {
    const customer = await this.customerLoginService.findOne(payload.id);

    if (!customer) {
      throw new UnauthorizedException();
    }

    return customer;
  }
}
