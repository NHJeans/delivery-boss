import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';

@Module({
  imports: [PrismaModule],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
