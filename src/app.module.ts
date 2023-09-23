import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentModule } from './comment/comment.module';
import { CartsModule } from './carts/carts.module';
import { CustomerModule } from './customer/customer.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';
import { OwnerModule } from './owner/owner.module';
import { PrismaModule } from './prisma/prisma.module';
import { StoreModule } from './store/store.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CommentModule,
    CustomerModule,
    OwnerModule,
<<<<<<< HEAD
=======
    StoreModule,
    AuthModule,
    MenuModule,
>>>>>>> dev
    CartsModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // 모든 경로에 미들웨어 적용
  }
}
