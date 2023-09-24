import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { customerAuthGuard } from 'src/auth/customer.jwt-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrderCreateDto } from './dto/order.create.dto';
import { RequestWithCustomer, RequestWithUser } from './interface/order.interface';
import { OrdersService } from './orders.service';

@ApiTags('order API')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // * 주문 등록
  @ApiOperation({ summary: '주문 등록' })
  @ApiResponse({ status: 404, description: '존재하지 않는 장바구니입니다.'})
  @ApiResponse({ status: 403, description: '등록 권한이 없는 장바구니입니다.'})
  @ApiResponse({ status: 412, description: '이미 주문 완료한 장바구니입니다.'})
  @ApiResponse({ status: 402, description: '잔여 포인트가 부족합니다.'})
  @Post()
  @UseGuards(customerAuthGuard)
  async createOrder(@Req() req: RequestWithCustomer, @Body() body: OrderCreateDto) {
    const customerId = req.user.id;

    return this.ordersService.createOrder(customerId, body);
  }

  // * 주문 전체 조회
  @ApiOperation({ summary: '주문 전체 조회' })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllOrders(@Req() req: RequestWithUser) {
    return this.ordersService.getAllOrders(req.user);
  }

  // * 주문 상세 조회
  @ApiOperation({ summary: '주문 상세 조회' })
  @ApiResponse({ status: 404, description: '존재하지 않는 주문입니다.'})
  @ApiResponse({ status: 404, description: '조회 권한이 없습니다.'})
  @Get(':orderId')
  @UseGuards(JwtAuthGuard)
  async findOne(@Req() req: RequestWithUser, @Param('orderId') orderId: number) {
    return this.ordersService.getOneOrder(orderId, req.user);
  }
}
