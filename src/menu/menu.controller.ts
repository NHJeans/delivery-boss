import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Menu } from '@prisma/client';
import { AuthEntity } from 'src/auth/entity/auth.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ownerAuthGuard } from 'src/auth/owner.jwt-auth.guard';
import { ApiFile } from 'src/utils/decorator/api-file.decorator';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';

//Todo: 중복되는 코드 정리 필요
@Controller('/stores/:storeId/menus')
@ApiTags('menu CRUD')
@Controller('stores')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('/:store_id/menus')
  @UseGuards(ownerAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthEntity })
  @ApiOperation({ summary: '메뉴 생성' })
  @ApiParam({
    name: 'storeId',
    type: 'number',
  })
  @ApiFile('file')
  @Post('/')
  @UsePipes(ValidationPipe)
  createMenu(
    @Request() req,
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

  @ApiOperation({ summary: '메뉴 전체 조회' })
  @ApiParam({
    name: 'storeId',
    type: 'number',
  })
  @Get('/')
  getMeuns(@Param('storeId') storeId: number) {
    return this.menuService.getMenus({ StoreId: storeId });
  }

  @ApiOperation({ summary: '특정 메뉴 조회' })
  @ApiParam({
    name: 'storeId',
    type: 'number',
  })
  @ApiParam({
    name: 'menuId',
    type: 'number',
  })
  @Get('/:menuId')
  getMenu(@Param() params: { storeId: number; menuId: number }) {
    return this.menuService.getMenu({ id: Number(params.menuId), StoreId: Number(params.storeId) });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthEntity })
  @ApiOperation({ summary: '메뉴 수정' })
  @ApiParam({
    name: 'storeId',
    type: 'number',
  })
  @ApiParam({
    name: 'menuId',
    type: 'number',
  })
  @ApiFile('file')
  @Put('/:menuId') //* params DTO
  @UsePipes(ValidationPipe)
  updateMenu(
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: false,
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
  @ApiOperation({ summary: '메뉴 삭제' })
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
    return this.menuService.deleteMenu({ id: Number(params.menuId), StoreId: Number(params.storeId) });
  }
}
