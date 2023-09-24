import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray } from 'class-validator';

export class OrderDto {
  // * 주문할 카트 id 배열
  @ApiProperty({
    description: '주문할 카트 id 배열',
    example: '[ 1, 2, 3, 4, 5 ]',
  })
  @IsArray()
  @ArrayNotEmpty()
  cartIds: Array<number>;
}
