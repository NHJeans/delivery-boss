import { PickType } from '@nestjs/swagger';
import { CartDto } from './cart.dto';

export class CartCreateDto extends PickType(CartDto, ['count'] as const) {}
