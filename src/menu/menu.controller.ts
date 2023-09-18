import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @Post('/:store_id/menus')
    createMenu(@Param('store_id') store_id: number, @Body() data: CreateMenuDto) { 


       data = { storeId: store_id, ...data} 

        return this.menuService.createMenu(data);
    }

    @Get('/:store_id/menus')
    getMeuns(@Param('store_id') store_id: number){
        return this.menuService.getMenus(store_id);
    }

    @Put('/:store_id/menus/:menu_id')//* params DTO
    updateMenu(@Param() params: { store_id: number, menu_id: number}, @Body() data: UpdateMenuDto){ //? 파라미터 값 가져올 때 왜 number로 변환 안되는지?
        return this.menuService.updateMenu(Number(params.store_id), Number(params.menu_id), data.name, data.price, data.image);
    }

    //@Param()
    @Delete('/:store_id/menus/:menu_id')
    deleteMenu(@Param() params: { store_id: number, menu_id: number}){
        return this.menuService.deleteMenu(Number(params.store_id), Number(params.menu_id));
    }
}
