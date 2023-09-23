//src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { OwnerLoginService } from '../owner/service/owner.login.service';

//* JWT 토큰을 이용한 전략 구현
@Injectable()
export class OwnerJwtStrategy extends PassportStrategy(Strategy, 'ownerjwt') {
  constructor(
    private readonly ownerLoginService: OwnerLoginService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
    console.log('OwnerJwtStrategy initialized!');
  }

  async validate(payload: { userId: number }) {
    console.log('JWT Validate Payload:', payload);
    // ! 2023.09.22. userId 값으로 받아올 수 있게 수정
    const owner = await this.ownerLoginService.findOne(payload.userId);

    if (!owner) {
      throw new UnauthorizedException();
    }

    return owner;
  }
}
