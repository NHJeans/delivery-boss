import { ApiProperty, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class menuDto { //* 스웨거 작성
    storeId: number;
    
    menuId: number;

    @IsString()
    @ApiProperty({
        name: 'name',
        type: String,

    })
    readonly name: string;

    @Type(()=>Number)
    @IsNumber()
    readonly price: number;

    @IsString()
    readonly image: string;
    
    readonly menuQuantity: number;
    
    readonly category: string;
    
    readonly description: string;
}


export class CreateMenuDto extends PickType(menuDto,[
    "storeId",
    "name",
    "price",
    "image"
] as const) {}

