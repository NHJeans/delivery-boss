import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Comment, Order } from '@prisma/client';
import { FindCommentDto } from './dto/find-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  // 리뷰 작성
  // orderId에 해당하는 리뷰를 작성한다. orderId 없으면 -> 업장 정보가 존재하지 않습니다. 반환
  // orderId에 해당하는 리뷰가 있는지 확인 -> 있으면 이미 리뷰를 작성하였습니다. 반환
  // order 테이블에서 orderId에 해당하는 customerId, storeId 찾기
  // TODO customerId로 로그인 정보 비교 후 권한 확인
  // createCommentDto(review, star), findunique(storeId, customerId), param(orderId)

  async createComment(customerId: number, orderId: number, createCommentDto: CreateCommentDto): Promise<{ message: string }> {
    // const 뒤 review 타입 지정 해야함! 근데 뭘로...? @prisma/client에서 가져옴! 형식은 : 으로!!
    const review: Comment = await this.prisma.comment.findUnique({ where: { OrderId: orderId } });

    if (review) {
      throw new HttpException('이미 리뷰를 작성하였습니다.', HttpStatus.BAD_REQUEST);
    }

    const order: Order = await this.prisma.order.findUnique({ where: { id: orderId } });

    if (!order) {
      throw new HttpException('주문 정보가 확인되지 않습니다.', HttpStatus.NOT_FOUND);
    }

    if (order.CustomerId !== customerId) {
      throw new HttpException('리뷰 작성 권한이 없습니다.', HttpStatus.FORBIDDEN);
    }

    // * order.--- 이거랑 createCommentDto 부분 각각 한번에 표현할 수 있는지 알아보기!!
    await this.prisma.comment.create({
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
  async findCommentsStore(storeId: number): Promise<FindCommentDto[]> {
    const data: FindCommentDto[] = await this.prisma.comment.findMany({ where: { StoreId: storeId }, select: { review: true, star: true } });
    return data;
  }

  // 고객 별 리뷰 조회
  async findCommentsCustomer(customerId: number): Promise<CreateCommentDto[]> {
    const data: CreateCommentDto[] = await this.prisma.comment.findMany({ where: { CustomerId: customerId }, select: { review: true, star: true } });
    return data;
  }

  // 리뷰 수정
  async updateComment(customerId: number, commentId: number, updateCommentDto: UpdateCommentDto): Promise<object> {
    const review: Comment = await this.prisma.comment.findUnique({ where: { id: commentId } });

    if (!review) {
      throw new HttpException('리뷰가 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    }

    if (review.CustomerId !== customerId) {
      throw new HttpException('리뷰 수정 권한이 없습니다.', HttpStatus.FORBIDDEN);
    }

    await this.prisma.comment.update({
      where: { id: commentId },
      data: updateCommentDto,
    });

    return { message: '리뷰 수정이 완료되었습니다.' };
  }

  // delete 완료 후 에러 메시지 작성
  async deleteComment(customerId: number, commentId: number): Promise<{ message: string }> {
    const review: Comment = await this.prisma.comment.findUnique({ where: { id: commentId } });

    if (!review) {
      throw new HttpException('리뷰가 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    }

    if (review.CustomerId !== customerId) {
      throw new HttpException('리뷰 삭제 권한이 없습니다.', HttpStatus.FORBIDDEN);
    }

    await this.prisma.comment.delete({ where: { id: commentId } });

    return { message: '리뷰 삭제가 완료되었습니다.' };
  }
}
