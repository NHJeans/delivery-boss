import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiOperation } from '@nestjs/swagger';
import { OrderCreateDto } from './dto/order.create.dto';

// Todo: 전체적으로 - 로그인 정보 관련 코드 수정

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // * 주문 등록
  @ApiOperation({ summary: '주문 등록' })
  @Post()
  async createOrder(@Body() body: OrderCreateDto) {
    // Todo: 팀과 논의해서 유저 정보를 담을 방법을 정하고 코드 수정하기
    const customerId: number = 3;

    return this.ordersService.createOrder(customerId, body);
  }

  // * 주문 전체 조회
  @ApiOperation({ summary: '주문 전체 조회' })
  @Get()
  async getAllOrders() {
    // Todo: 팀과 논의해서 유저 정보를 담을 방법을 정하고 코드 수정하기
    const user = {
      id: 3,
      type: 'Customer',
    }

    return this.ordersService.getAllOrders(user);
  }

  // * 주문 등록
  @ApiOperation({ summary: '주문 등록' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  // * 주문 등록
  @ApiOperation({ summary: '주문 등록' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: any) {
    return this.ordersService.update(+id, updateOrderDto);
  }
}
