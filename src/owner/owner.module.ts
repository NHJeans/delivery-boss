import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OwnerSignupController } from './controller/owner.signup.controller';
import { OwnerLoginController } from './controller/owner.login.controller';
import { OwnerSignupService } from './service/owner.signup.service';
import { OwnerLoginService } from './service/owner.login.service';

@Module({
  imports: [PrismaModule], // PrismaModule에서 제공하는 모든 서비스, 가드 등이 이 모듈에서도 사용 가능해집니다.
  controllers: [OwnerSignupController, OwnerLoginController],
  providers: [OwnerSignupService, OwnerLoginService], // PrismaService는 여기서 제거됩니다.
})
export class OwnerModule {}
