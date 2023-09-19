//src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CustomerModule } from 'src/customer/customer.module';
import { CustomerLoginService } from 'src/customer/service/customer.login.service';
import { OwnerModule } from 'src/owner/owner.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { CustomerJwtStrategy } from './customer.jwt.strategy';

export const jwtSecret = 'zjP9h6ZI5LoSKCRj';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
    }),
    CustomerModule,
    OwnerModule,
  ],
  controllers: [AuthController],
  providers: [CustomerLoginService, CustomerJwtStrategy],
})
export class AuthModule {}
