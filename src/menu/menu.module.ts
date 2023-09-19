import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { config } from 'process';
import { format } from 'path';

@Module({
  // imports: [MulterModule.register({
  //   dest: './public'
  // })],
    imports: [MulterModule.register({
    storage: diskStorage({
      destination(req, file, done) {
        const dirPath: string = `./public`; //* 폴더 직접 만들어야 함
        done(null, dirPath);
      },
      filename: (req, file, done) => {
        const fileSplit: string[] = file.originalname.split(".");
        const name: string = fileSplit[0];
        const ext: string = fileSplit[1];
        return done(null, `${name}_${Date.now()}.${ext}`);
      }
    })
  })],
  controllers: [MenuController],
  providers: [
    PrismaService,
    MenuService]
})
export class MenuModule {}
