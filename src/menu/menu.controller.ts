import { Body, Controller, Delete, Get, Param, ParseFilePipe, ParseFilePipeBuilder, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from './dto/uploadeFile';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    // @UseInterceptors(FileInterceptor('file'))
    // @Post('/:store_id/menus')
    // async createMenu(@UploadedFile(new ParseFilePipeBuilder().build({
    //     fileIsRequired: false
    // })) file: Express.Multer.File, @Param('store_id') store_id: number, @Body() data: CreateMenuDto) { 
    //     console.log(file.filename)
    //     console.log("11");
    //    data = { storeId: store_id, ...data} 

    //     return this.menuService.createMenu(data);
    // }

    @UseInterceptors(FileInterceptor('file'))
    @Post('/:store_id/menus')
    async createMenu(@UploadedFile() file: Express.Multer.File, @Param('store_id') store_id: number, @Body() data: CreateMenuDto) { 
        console.log(file);
        console.log(file.path);
        data = { storeId: store_id, ...data} 

        return this.menuService.createMenu(data, file.path);
    }


    @Get('/:store_id/menus')
    async getMeuns(@Param('store_id') store_id: number){
        return this.menuService.getMenus(store_id);
    }

    @Put('/:store_id/menus/:menu_id')//* params DTO
    async updateMenu(@Param() params: { store_id: number, menu_id: number}, @Body() data: UpdateMenuDto){ //? 파라미터 값 가져올 때 왜 number로 변환 안되는지?
        return this.menuService.updateMenu(Number(params.store_id), Number(params.menu_id), data.name, data.price, data.image);
    }

    //@Param()
    @Delete('/:store_id/menus/:menu_id')
    async deleteMenu(@Param() params: { store_id: number, menu_id: number}){
        return this.menuService.deleteMenu(Number(params.store_id), Number(params.menu_id));
    }
}
