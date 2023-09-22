import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [StoreController],
  providers: [StoreService],
  imports: [PrismaModule]
})
export class StoreModule {}
