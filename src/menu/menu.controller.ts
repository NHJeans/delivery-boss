import { Body, Controller, Delete, Get, Param, ParseFilePipeBuilder, Post, Put, UploadedFile, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthEntity } from 'src/auth/entity/auth.entity';
import { ApiFile } from 'src/utils/decorator/api-file.decorator';
import { Menu } from '@prisma/client';


@Controller('/stores/:storeId/menus')
@ApiTags('menu CRUD')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthEntity })
  @ApiOperation({ summary: '메뉴 생성'})
  @ApiParam({
    name: 'storeId',
    type: 'number',
  })
  @ApiFile('file')
  @Post('/')
  @UsePipes(ValidationPipe)
  createMenu(
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: true,
      })
    )
    file: Express.Multer.File,
    @Param('storeId') storeId: number,
    @Body() data: CreateMenuDto
  ): Promise<Menu> {
    data = { StoreId: storeId, ...data, image: file.path };

    return this.menuService.createMenu(data);
  }


  @ApiOperation({ summary: '메뉴 전체 조회'})
  @ApiParam({
    name: 'storeId',
    type: 'number',
  })
  @Get('/')
  getMeuns(@Param('storeId') storeId: number) {
    return this.menuService.getMenus({ StoreId: storeId });
  }


  @ApiOperation({ summary: '특정 메뉴 조회'})
  @ApiParam({
    name: 'storeId',
    type: 'number',
  })
  @ApiParam({
    name: 'menuId',
    type: 'number',
  })
  @Get('/:storeId/menus/:menuId')
  getMenu(@Param() params: { storeId: number; menuId: number }) {
    return this.menuService.getMenu({ id: Number(params.menuId) });
  }

  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthEntity })
  @ApiOperation({ summary: '메뉴 수정'})
  @ApiParam({
    name: 'storeId',
    type: 'number',
  })
  @ApiParam({
    name: 'menuId',
    type: 'number',
  })
  @ApiFile('file')
  // @UseInterceptors(FileInterceptor('file'))
  @Put('/:menuId') //* params DTO
  @UsePipes(ValidationPipe)
  updateMenu(
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: false
      })
    )
    file: Express.Multer.File,
    @Param() params: { storeId: number; menuId: number },
    @Body() data: UpdateMenuDto
  ) {

    data = { StoreId: Number(params.storeId), menuId: Number(params.menuId), ...data, image: file.path };
    return this.menuService.updateMenu(data);
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthEntity })
  @ApiOperation({ summary: '메뉴 삭제'})
  @ApiParam({
    name: 'storeId',
    type: 'number',
  })
  @ApiParam({
    name: 'menuId',
    type: 'number',
  })
  @Delete('/:menuId')
  deleteMenu(@Param() params: { storeId: number; menuId: number }) {
    return this.menuService.deleteMenu({ id: Number(params.menuId) });
  }
}
