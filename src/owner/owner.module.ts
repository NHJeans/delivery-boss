import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OwnerLoginController } from './controller/owner.login.controller';
import { OwnerSignupController } from './controller/owner.signup.controller';
import { OwnerLoginService } from './service/owner.login.service';
import { OwnerSignupService } from './service/owner.signup.service';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [OwnerSignupController, OwnerLoginController],
  providers: [OwnerSignupService, OwnerLoginService],
})
export class OwnerModule {}
