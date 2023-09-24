import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { customerAuthGuard } from 'src/auth/customer.jwt-auth.guard';
import { CartsService } from './carts.service';
import { CartCreateDto } from './dto/cart.create.dto';
import { CartUpdateDto } from './dto/cart.update.dto';
import { RequestWithCustomer } from './interface/cart.intefarce';

// Todo: 전체적으로 - 이미지 전달 관련 코드 수정

@ApiTags('cart API')
@Controller('carts')
@UseGuards(customerAuthGuard)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}
  
  // * 장바구니 추가
  @ApiOperation({ summary: '장바구니 추가' })
  @ApiResponse({ status: 404, description: '존재하지 않는 메뉴입니다.'})
  @Post('/:menuId')
  async createCart(@Req() req: RequestWithCustomer, @Param('menuId') menuId: number, @Body() body: CartCreateDto) {
    const customerId: number = req.user.id;

    return this.cartsService.createCart(customerId, menuId, body);
  }

  // * 장바구니 전체 조회
  @ApiOperation({ summary: '장바구니 전체 조회' })
  @Get()
  async getAllCarts(@Req() req: RequestWithCustomer) {
    const customerId: number = req.user.id;

    return this.cartsService.getAllCarts(customerId);
  }

  // * 장바구니 수정
  @ApiOperation({ summary: '장바구니 수정' })
  @ApiResponse({ status: 404, description: '존재하지 않는 카트입니다.'})
  @ApiResponse({ status: 403, description: '수정 권한이 없습니다.'})
  @Patch('/:cartId')
  async updateCart(@Req() req: RequestWithCustomer, @Param('cartId') cartId: number, @Body() body: CartUpdateDto) {
    const customerId: number = req.user.id;

    return this.cartsService.updateCart(customerId, cartId, body);
  }

  // * 장바구니 삭제
  @ApiOperation({ summary: '장바구니 삭제' })
  @ApiResponse({ status: 404, description: '존재하지 않는 카트입니다.'})
  @ApiResponse({ status: 403, description: '삭제 권한이 없습니다.'})
  @Delete('/:cartId')
  async deleteCart(@Req() req: RequestWithCustomer, @Param('cartId') cartId: number) {
    const customerId: number = req.user.id;

    return this.cartsService.deleteCart(customerId, cartId);
  }
}
