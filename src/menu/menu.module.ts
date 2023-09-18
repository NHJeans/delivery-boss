import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MenuController],
  providers: [
    PrismaService,
    MenuService]
})
export class MenuModule {}
