import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaService } from 'src/prisma/prisma.service';
import { multerDiskOptions } from 'src/utils/multer.config';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { StoreService } from 'src/store/store.service';

@Module({
  imports: [
    // AuthModule,
    MulterModule.register(multerDiskOptions),
  ],
  controllers: [MenuController],
  providers: [PrismaService, MenuService, StoreService],
})
export class MenuModule {}
