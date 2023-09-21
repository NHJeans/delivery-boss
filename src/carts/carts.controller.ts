import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import { ApiOperation } from '@nestjs/swagger';
import { CartCreateDto } from './dto/cart.create.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  // * 장바구니 추가
  @ApiOperation({ summary: '장바구니 추가'})
  @Post('/:menuId')
  async createCart(@Param('menuId') menuId: number, @Body() body: CartCreateDto) {
    // Todo: 팀과 논의해서 유저 정보를 담을 방법을 정하고 코드 수정하기
    const customerId: number = 1;
    
    return this.cartsService.createCart(customerId, menuId, body);
  }

  // * 장바구니 전체 조회
  @ApiOperation({ summary: '장바구니 전체 조회' })
  @Get()
  async getAllCarts() {
    return this.cartsService.getAllCarts();
  }
  
  // * 장바구니 메뉴 수정
  @ApiOperation({ summary: '장바구니 메뉴 수정' })
  @Patch('cartId')
  async updateCart(@Param('cartId') cartId: number) {
    return this.cartsService.updateCart();
  }

  // * 장바구니 메뉴 삭제
  @ApiOperation({ summary: '장바구니 메뉴 삭제' })
  @Delete('cartId')
  async deleteCart(@Param('cartId') cartId: number) {
    return this.cartsService.deleteCart();
  }
}
