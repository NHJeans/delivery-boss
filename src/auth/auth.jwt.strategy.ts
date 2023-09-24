//src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { OwnerLoginService } from '../owner/service/owner.login.service';
import { CustomerLoginService } from 'src/customer/service/customer.login.service';

//* JWT 토큰을 이용한 전략 구현
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly ownerLoginService: OwnerLoginService,
    private readonly customerLoginService: CustomerLoginService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
    console.log('OwnerJwtStrategy initialized!');
  }

  async validate(payload: { userId: number; type: string }) {
    console.log('JWT Validate Payload:', payload);
    let user;
    if (payload.type === 'Owner') {
      user = await this.ownerLoginService.findOne(payload.userId);
    } else if (payload.type === 'Customer') {
      user = await this.customerLoginService.findOne(payload.userId);
    }
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
