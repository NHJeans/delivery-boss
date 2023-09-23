import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  // 리뷰 작성
  // orderId에 해당하는 리뷰를 작성한다. orderId 없으면 -> 업장 정보가 존재하지 않습니다. 반환
  // orderId에 해당하는 리뷰가 있는지 확인 -> 있으면 이미 리뷰를 작성하였습니다. 반환
  // order 테이블에서 orderId에 해당하는 customerId, storeId 찾기
  // TODO customerId로 로그인 정보 비교 후 권한 확인
  // createCommentDto(review, star), findunique(storeId, customerId), param(orderId)

  async createComment(orderId: number, createCommentDto: CreateCommentDto) {
    // TODO const 뒤 revew 타입 지정 해야함! 근데 뭘로...?
    const review = await this.prisma.comment.findFirst({ where: { OrderId: orderId } });

    if (review) {
      throw new HttpException('이미 리뷰를 작성하였습니다.', HttpStatus.BAD_REQUEST);
    }

    const order = await this.prisma.order.findUnique({ where: { id: orderId } });

    if (!order) {
      throw new HttpException('업장 정보가 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    }

    // * order.--- 이거랑 createCommentDto 부분 각각 한번에 표현할 수 있는지 알아보기!!
    const data = await this.prisma.comment.create({
      data: {
        OrderId: orderId,
        StoreId: order.StoreId,
        CustomerId: order.CustomerId,
        review: createCommentDto.review,
        star: createCommentDto.star,
      },
    });

    return { message: '리뷰 생성이 완료되었습니다.' };
  }

  // 가게 별 리뷰 조회
  async findCommentsStore(storeId: number) {
    const data = await this.prisma.comment.findMany({ where: { StoreId: storeId } });
    return { data };
  }

  // 고객 별 리뷰 조회
  async findCommentsCustomer(customerId: number) {
    const data = await this.prisma.comment.findMany({ where: { CustomerId: customerId } });
    return { data };
  }

  // 리뷰 수정
  async updateComment(commentId: number, updateCommentDto: UpdateCommentDto) {

    const comment = await this.prisma.comment.findUnique({where: {id: commentId}})

    if (!comment) {
      throw new HttpException('리뷰가 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    }

    await this.prisma.comment.update({
       where: { id: commentId }, 
       data: updateCommentDto
    });

    return { message: '리뷰 수정이 완료되었습니다.' };
  }

  // delete 완료 후 에러 메시지 작성
  async deleteComment(commentId: number) {
    const comment = await this.prisma.comment.findUnique({where: {id: commentId}})

    if (!comment) {
      throw new HttpException('리뷰가 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    }

    await this.prisma.comment.delete({ where: {id: commentId}})

    return { message: '리뷰 삭제가 완료되었습니다.' };
  }
}