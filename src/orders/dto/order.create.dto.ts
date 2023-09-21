import { PickType } from "@nestjs/swagger";
import { OrderDto } from "./order.dto";

export class OrderCreateDto extends PickType(OrderDto, [
    'cartIds',
] as const) {}