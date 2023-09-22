import { ApiProperty, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class menuDto { //* 스웨거 작성
    @ApiProperty({
        name: 'StoreId',
        type: Number,
    })
    StoreId: number;
    
    @ApiProperty({
        name: 'menuId',
        type: Number,
    })
    menuId: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'name',
        type: String,
    })
    name: string;

    @Type(()=>Number)
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        name: 'pirce',
        type: String,
    })
    price: number;

    @ApiProperty({
        name: 'image',
        type: String,
    })
    image: string;
}


export class CreateMenuDto extends PickType(menuDto,[
    "StoreId",
    "name",
    "price",
    "image"
] as const) {}

