import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// TODO 사용자는 음식점에 대한 리뷰를 작성하고, 평점을 남길 수 있어야 합니다.
// TODO Create: 주문번호의 고객 ID 검증, comment db에 추가, CostomerId, OderId, StoreId 도 추가 필요
// TODO Read: 권한 X, 가게 별 list / 고객 id 별 list
// TODO Update: 작성자 권한 확인 (로그인 정보)
// TODO Delete: 로그인 정보

@Controller('comments')
@ApiTags('comment CRUD')
export class CommentController {
  // * private readonly는 무슨 의미? 없으면 어떻게 되는지 찾아보자!
  constructor(private readonly commentService: CommentService) {}

  // 리뷰 작성
  @ApiOperation({ summary: '리뷰 작성' })
  @Post('orders/:orderId')
  // * param은 string으로만 받을 수 있는 건가? 왜 다 string이지;; 처음부터 number로 받으면 안되나?
  async createComment(@Param('orderId') orderId: string, @Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(+orderId, createCommentDto);
  }

  // 가게 별 리뷰 조회
  @ApiOperation({ summary: '가게 별 리뷰 조회' })
  @Get('stores/:storeId')
  async findCommentsStore(@Param('storeId') storeId: string) {
    return this.commentService.findCommentsStore(+storeId);
  }

  // 고객 별 리뷰 조회
  @ApiOperation({ summary: '고객 별 리뷰 조회' })
  @Get('customers/:customerId')
  async findCommentsCustomer(@Param('customerId') customerId: string) {
    return this.commentService.findCommentsCustomer(+customerId);
  }

  // 리뷰 수정
  @ApiOperation({ summary: '리뷰 수정' })
  @Put(':commentId')
  async updateComment(@Param('commentId') commentId: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.updateComment(+commentId, updateCommentDto);
  }

  // 리뷰 삭제
  @ApiOperation({ summary: '리뷰 삭제' })
  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: string) {
    return this.commentService.deleteComment(+commentId);
  }
}
