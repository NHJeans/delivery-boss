//src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CustomerJwtStrategy } from './customer.jwt.strategy';
import { CustomerModule } from 'src/customer/customer.module';
import { OwnerModule } from 'src/owner/owner.module';
import { CustomerLoginService } from 'src/customer/service/customer.login.service';

export const jwtSecret = 'zjP9h6ZI5LoSKCRj';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '5m' }, // e.g. 7d, 24h
    }),
    CustomerModule,
    OwnerModule,
  ],
  controllers: [AuthController],
  providers: [CustomerLoginService, CustomerJwtStrategy],
})
export class AuthModule {}
