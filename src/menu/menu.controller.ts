import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthEntity } from 'src/auth/entity/auth.entity';
import { Request } from '@nestjs/common';
import { ownerAuthGuard } from 'src/auth/owner.jwt-auth.guard';

@Controller('stores')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('/:store_id/menus')
  @UseGuards(ownerAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthEntity })
  @ApiOperation({ summary: '메뉴 생성' })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(ValidationPipe)
  createMenu(
    @Request() req,
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: true,
      })
    )
    file: Express.Multer.File,
    @Param('store_id') store_id: number,
    @Body() data: CreateMenuDto
  ): Promise<{ id: number; StoreId: number; name: string; image: string; price: number }> {
    data = { StoreId: store_id, ...data, image: file.path };
    console.log('User Info:', req.user);
    return this.menuService.createMenu(data);
  }

  @ApiOperation({ summary: '메뉴 전체 조회' })
  @Get('/:store_id/menus')
  getMeuns(@Param('store_id') store_id: number) {
    return this.menuService.getMenus({ StoreId: store_id });
  }

  @ApiOperation({ summary: '특정 메뉴 조회' })
  @Get('/:stored_id/menus/:menu_id')
  getMenu(@Param() params: { store_id: number; menu_id: number }) {
    return this.menuService.getMenu({ id: Number(params.menu_id) });
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthEntity })
  @ApiOperation({ summary: '메뉴 수정' })
  @UseInterceptors(FileInterceptor('file'))
  @Put('/:store_id/menus/:menu_id') //* params DTO
  @UsePipes(ValidationPipe)
  updateMenu(
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: false,
      })
    )
    file: Express.Multer.File,
    @Param() params: { store_id: number; menu_id: number },
    @Body() data: UpdateMenuDto
  ) {
    data = { StoreId: Number(params.store_id), menuId: Number(params.menu_id), ...data, image: file.path };
    return this.menuService.updateMenu(data);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthEntity })
  @ApiOperation({ summary: '메뉴 삭제' })
  @Delete('/:store_id/menus/:menu_id')
  deleteMenu(@Param() params: { store_id: number; menu_id: number }) {
    return this.menuService.deleteMenu({ id: Number(params.menu_id) });
  }
}
