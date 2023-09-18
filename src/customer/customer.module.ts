import { PrismaModule } from 'src/prisma/prisma.module';
import { CustomerSignupController } from './controller/customer.signup.controller';
import { CustomerLoginController } from './controller/customer.login.controller';
import { CustomerLoginService } from './service/customer.login.service';
import { CustomerSignupService } from './service/customer.signup.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule], // PrismaModule에서 제공하는 모든 서비스, 가드 등이 이 모듈에서도 사용 가능해집니다.
  controllers: [CustomerSignupController, CustomerLoginController],
  providers: [CustomerSignupService, CustomerLoginService], // PrismaService는 여기서 제거됩니다.
})
export class CustomerModule {}
