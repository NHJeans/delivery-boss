import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { CartCreateDto } from './dto/cart.create.dto';
import { CartUpdateDto } from './dto/cart.update.dto';

// Todo: 전체적으로 - 로그인 정보 관련 코드 수정, 이미지 전달 관련 코드 수정

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  // * 장바구니 추가
  @ApiOperation({ summary: '장바구니 추가'})
  @Post('/:menuId')
  async createCart(@Param('menuId') menuId: number, @Body() body: CartCreateDto) {
    // Todo: 팀과 논의해서 유저 정보를 담을 방법을 정하고 코드 수정하기
    const customerId: number = 3;
    
    return this.cartsService.createCart(customerId, menuId, body);
  }

  // * 장바구니 전체 조회
  @ApiOperation({ summary: '장바구니 전체 조회' })
  @Get()
  async getAllCarts() {
    // Todo: 팀과 논의해서 유저 정보를 담을 방법을 정하고 코드 수정하기
    const customerId: number = 1;

    return this.cartsService.getAllCarts(customerId);
  }
  
  // * 장바구니 수정
  @ApiOperation({ summary: '장바구니 수정' })
  @Patch('/:cartId')
  async updateCart(@Param('cartId') cartId: number, @Body() body: CartUpdateDto) {
    // Todo: 팀과 논의해서 유저 정보를 담을 방법을 정하고 코드 수정하기
    const customerId: number = 1;

    return this.cartsService.updateCart(customerId, cartId, body);
  }

  // * 장바구니 삭제
  @ApiOperation({ summary: '장바구니 삭제' })
  @Delete('/:cartId')
  async deleteCart(@Param('cartId') cartId: number) {
    // Todo: 팀과 논의해서 유저 정보를 담을 방법을 정하고 코드 수정하기
    const customerId: number = 1;

    return this.cartsService.deleteCart(customerId, cartId);
  }
}
