import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  // * private readonly는 무슨 의미? 없으면 어떻게 되는지 찾아보자!
  constructor(private readonly commentService: CommentService) {}

  @Post('customers/:customer_id/orders/:order_id/comments')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  // * 이부분은 전체 코멘트 불러오기라 API가 이렇게 들어가도 되는 지 생각해보자!
  @Get('customers/:customer_id/orders/:order_id/comments')
  findAll(@Param('customer_id') customerId: string, @Param('order_id') orderId: string) {
    return this.commentService.findAll();
  }

  // @Get('customers/:customer_id/orders/:order_id/comments/:comments_id')
  // findOne(@Param('id') id: string) {
  //   return this.commentService.findOne(+id);
  // }

  @Put('customers/:customer_id/orders/:order_id/comments/:comments_id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete('customers/:customer_id/orders/:order_id/comments/:comments_id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
