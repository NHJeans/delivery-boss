import { Injectable } from '@nestjs/common';
import { Menu } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenuService {
    constructor(private prisma: PrismaService) {}

    async createMenu(createMenuDto: CreateMenuDto): Promise<Menu> {
        return this.prisma.menu.create({
            data: {
                StoreId: createMenuDto.storeId,
                name : createMenuDto.name,
                price : createMenuDto.price,
                image : createMenuDto.image
            }
        })
    }

    getMenus(id: number): Promise<Menu[]>{
        return this.prisma.menu.findMany({
            where: {
                StoreId: id
            }
        })
    }

    updateMenu(store_id: number, menu_id: number, name: string, price: number, image: string): Promise<Menu> {
        return this.prisma.menu.update({
            where: {
                StoreId: store_id,
                id: menu_id
            },
            data: {
                name,
                price,
                image
            }
        })
    }

    
    deleteMenu(store_id: number, menu_id: number): Promise<Menu> {
        return this.prisma.menu.delete({
            where: {
                StoreId: store_id,
                id: menu_id,
            }
        })
    }
}
