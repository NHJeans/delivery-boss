//src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { OwnerLoginService } from '../../owner/service/owner.login.service';
import { ConfigService } from '@nestjs/config';

//* JWT 토큰을 이용한 전략 구현
@Injectable()
export class OwnerJwtStrategy extends PassportStrategy(Strategy, 'owner-jwt') {
  constructor(
    private readonly ownerLoginService: OwnerLoginService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { id: number }) {
    const customer = await this.ownerLoginService.findOne(payload.id);

    if (!customer) {
      throw new UnauthorizedException();
    }

    return customer;
  }
}
