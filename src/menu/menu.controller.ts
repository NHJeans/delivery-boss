import { Body, Controller, Delete, Get, Param, ParseFilePipeBuilder, Post, Put, UploadedFile, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthEntity } from 'src/auth/entity/auth.entity';
import { ApiFile } from 'src/utils/decorator/api-file.decorator';


@Controller('stores')
@ApiTags('menu CRUD')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthEntity })
  @ApiOperation({ summary: '메뉴 생성'})
  @ApiParam({
    name: 'store_id',
    type: 'number',
  })
  @ApiFile('file')
  @Post('/:store_id/menus')
  @UsePipes(ValidationPipe)
  createMenu(
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: true,
      })
    )
    file: Express.Multer.File,
    @Param('store_id') store_id: number,
    @Body() data: CreateMenuDto
  ): Promise<{ id: number; StoreId: number; name: string; image: string; price: number; }> {
    data = { StoreId: store_id, ...data, image: file.path };

    return this.menuService.createMenu(data);
  }


  @ApiOperation({ summary: '메뉴 전체 조회'})
  @ApiParam({
    name: 'store_id',
    type: 'number',
  })
  @Get('/:store_id/menus')
  getMeuns(@Param('store_id') store_id: number) {
    return this.menuService.getMenus({ StoreId: store_id });
  }


  @ApiOperation({ summary: '특정 메뉴 조회'})
  @ApiParam({
    name: 'store_id',
    type: 'number',
  })
  @ApiParam({
    name: 'menu_id',
    type: 'number',
  })
  @Get('/:store_id/menus/:menu_id')
  getMenu(@Param() params: { store_id: number; menu_id: number }) {
    return this.menuService.getMenu({ id: Number(params.menu_id) });
  }

  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthEntity })
  @ApiOperation({ summary: '메뉴 수정'})
  @ApiParam({
    name: 'store_id',
    type: 'number',
  })
  @ApiParam({
    name: 'menu_id',
    type: 'number',
  })
  @ApiFile('file')
  // @UseInterceptors(FileInterceptor('file'))
  @Put('/:store_id/menus/:menu_id') //* params DTO
  @UsePipes(ValidationPipe)
  updateMenu(
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: false
      })
    )
    file: Express.Multer.File,
    @Param() params: { store_id: number; menu_id: number },
    @Body() data: UpdateMenuDto
  ) {

    data = { StoreId: Number(params.store_id), menuId: Number(params.menu_id), ...data, image: file.path };
    return this.menuService.updateMenu(data);
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthEntity })
  @ApiOperation({ summary: '메뉴 삭제'})
  @ApiParam({
    name: 'store_id',
    type: 'number',
  })
  @ApiParam({
    name: 'menu_id',
    type: 'number',
  })
  @Delete('/:store_id/menus/:menu_id')
  deleteMenu(@Param() params: { store_id: number; menu_id: number }) {
    return this.menuService.deleteMenu({ id: Number(params.menu_id) });
  }
}
