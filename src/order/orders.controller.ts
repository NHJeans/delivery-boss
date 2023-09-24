import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { customerAuthGuard } from 'src/auth/customer.jwt-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrderCreateDto } from './dto/order.create.dto';
import { RequestWithCustomer, RequestWithUser } from './interface/order.interface';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // * 주문 등록
  @ApiOperation({ summary: '주문 등록' })
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
  @Get(':orderId')
  @UseGuards(JwtAuthGuard)
  async findOne(@Req() req: RequestWithUser, @Param('orderId') orderId: number) {
    return this.ordersService.getOneOrder(orderId, req.user);
  }
}
