import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CartDto {
  // * price (메뉴 가격)
  @ApiProperty({
    description: '메뉴 가격',
    example: '12,000',
  })
  @IsInt()
  @IsNotEmpty()
  price: number;

  // * count (주문 수량)
  @ApiProperty({
    description: '주문 수량',
    example: '1',
  })
  @IsInt()
  @IsNotEmpty()
  count: number;

  // * status (주문 상태) delivered
  @ApiProperty({
    description: '주문 상태',
    example: 'delivering',
  })
  @IsString()
  @IsNotEmpty()
  status: string;
}
