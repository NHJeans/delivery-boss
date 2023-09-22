import { Injectable } from '@nestjs/common';
import { Menu, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async createMenu(createMenuDto: CreateMenuDto): Promise<Menu> {
    return this.prisma.menu.create({
      data: {
        StoreId: createMenuDto.StoreId,
        name: createMenuDto.name,
        price: createMenuDto.price,
        image: createMenuDto.image,
      },
    });
  }

  async getMenus(menuWhereInput: Prisma.MenuWhereInput): Promise<Menu[]> {
    return this.prisma.menu.findMany({
      where: menuWhereInput,
    });
  }

  async getMenu(menuWhereUniqueInput: Prisma.MenuWhereUniqueInput): Promise<Menu> {
    return this.prisma.menu.findUniqueOrThrow({
      where: menuWhereUniqueInput,
    });
  }

  async updateMenu(updateMenuDto: UpdateMenuDto): Promise<Menu> {
    return this.prisma.menu.update({
      where: {
        StoreId: updateMenuDto.StoreId,
        id: updateMenuDto.menuId,
      },
      data: {
        name: updateMenuDto.name,
        price: updateMenuDto.price,
        image: updateMenuDto.image,
      },
    });
  }

  async deleteMenu(where: Prisma.MenuWhereUniqueInput): Promise<Menu> {
    return this.prisma.menu.delete({
      where,
    });
  }
}
