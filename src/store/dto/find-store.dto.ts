import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Validator, validate } from 'class-validator';
import { info } from 'console';

// createStoreDto에서 가져온 거 + ownerId 추가
export class FindStoreDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly info: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly OwnerId: number;
}
