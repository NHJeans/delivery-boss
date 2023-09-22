import { PickType } from "@nestjs/swagger";
import { CartDto } from "./cart.dto";

export class CartUpdateDto extends PickType(CartDto, [
    'count',
] as const) {}