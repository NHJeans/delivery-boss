//src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CustomerModule } from 'src/customer/customer.module';
import { CustomerLoginService } from 'src/customer/service/customer.login.service';
import { OwnerModule } from 'src/owner/owner.module';
import { OwnerLoginService } from 'src/owner/service/owner.login.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtConfigService } from '../config/jwt.config.service';
import { CustomerJwtStrategy } from './customer.jwt.strategy';
import { OwnerJwtStrategy } from './owner.jwt.strategy';
import { JwtStrategy } from './auth.jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    CustomerModule,
    OwnerModule,
  ],
  controllers: [],
  providers: [OwnerJwtStrategy, CustomerJwtStrategy, JwtStrategy, JwtConfigService, OwnerLoginService, CustomerLoginService],
})
export class AuthModule {}
