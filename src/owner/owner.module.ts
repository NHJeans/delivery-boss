import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OwnerSignupController } from './controller/owner.signup.controller';
import { OwnerLoginController } from './controller/owner.login.controller';
import { OwnerSignupService } from './service/owner.signup.service';
import { OwnerLoginService } from './service/owner.login.service';

@Module({
  imports: [PrismaModule],
  controllers: [OwnerSignupController, OwnerLoginController],
  providers: [OwnerSignupService, OwnerLoginService],
})
export class OwnerModule {}
