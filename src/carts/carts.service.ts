import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CartCreateDto } from './dto/cart.create.dto';
import { CartUpdateDto } from './dto/cart.update.dto';

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaService) {}

  // * 장바구니 추가
  async createCart(customerId: number, menuId: number, body: CartCreateDto) {
    const menu = await this.prisma.menu.findUnique({ where: { id: menuId }});
    // ! 해당하는 메뉴가 없는 경우
    if (!menu) {
      throw new HttpException('메뉴를 다시 확인해주세요.', HttpStatus.PRECONDITION_FAILED);
    }
    
    await this.prisma.cart.create({ data: {
      MenuId: menuId,
      CustomerId: customerId,
      count: body.count,
      price: menu.price
    } });
    
    return { message: '장바구니에 메뉴를 담았습니다.' };
  }

  // * 장바구니 전체 조회
  async getAllCarts(customerId: number) {
    const carts = await this.prisma.cart.findMany({ where: { CustomerId: customerId } });

    // Todo: 프론트 구현하면서 리턴해줄 키-값 수정하기
    return carts.map((cart) => {
      return {
        id: cart.id,
        OrderId: cart.OrderId,
        count: cart.count,
        price: cart.price,
        status: cart.status,
      }
    });
  }
  
  // * 장바구니 수정
  async updateCart(customerId: number, cartId: number, body: CartUpdateDto) {
    const cart = await this.prisma.cart.findUnique({ where: { id: cartId } });
    // ! 해당하는 카트가 없는 경우
    if (!cart) {
      throw new HttpException('카트를 다시 확인해주세요.', HttpStatus.NOT_FOUND);
    }

    // ! 카트 수정 권한이 없는 경우
    if (cart.CustomerId !== customerId) {
      throw new HttpException('수정 권한이 없습니다.', HttpStatus.FORBIDDEN);
    }

    await this.prisma.cart.update({ where: { id: cart.id }, data: { count: body.count } });

    return { message: '장바구니 수정이 완료되었습니다.' };
  }
  
  // * 장바구니 삭제
  async deleteCart(customerId: number, cartId: number) {
    const cart = await this.prisma.cart.findUnique({ where: { id: cartId } });
    // ! 해당하는 카트가 없는 경우
    if (!cart) {
     throw new HttpException('카트를 다시 확인해주세요.', HttpStatus.NOT_FOUND);
    }
    
    // ! 카트 삭제 권한이 없는 경우
    if (cart.CustomerId !== customerId) {
     throw new HttpException('삭제 권한이 없습니다.', HttpStatus.FORBIDDEN);
    }

    await this.prisma.cart.delete({ where: { id: cart.id } });

    return { message: '장바구니 삭제가 완료되었습니다.' };
  }
}
