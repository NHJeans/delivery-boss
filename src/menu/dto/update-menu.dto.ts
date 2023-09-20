import { PickType } from "@nestjs/swagger";
import { menuDto } from "./create-menu.dto";

//export class UpdateMenuDto extends PartialType(CreateMenuDto) {}

export class UpdateMenuDto extends PickType(menuDto, [
    "StoreId",
    "menuId",
    "name",
    "price",
    "image"
] as const) {}