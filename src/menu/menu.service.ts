import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Menu, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { StoreService } from 'src/store/store.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

//Todo: 중복되는 코드 정리 필요
@Injectable()
export class MenuService {
  constructor(
    private prisma: PrismaService,
    private storeService: StoreService
  ) {}

  //* 메뉴 생성
  async createMenu(createMenuDto: CreateMenuDto, user: number): Promise<Menu> {

    // 업장 확인
    const store = await this.storeService.findOneStore(createMenuDto.StoreId);
    if (!store) {
      throw new HttpException('업장 정보가 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    }

    // 접근 권한 확인
    if(store.OwnerId !== user){
      throw new HttpException('접근 권한이 없습니다.', HttpStatus.FORBIDDEN);
    }

    // 메뉴 중복 확인
    const menu = await this.prisma.menu.findFirst({
      where: {
        name: createMenuDto.name,
      },
    });
    if (menu) {
      throw new HttpException('이미 존재하는 메뉴입니다.', HttpStatus.BAD_REQUEST);
    }

    // 메뉴 생성
    return this.prisma.menu.create({
      data: {
        StoreId: createMenuDto.StoreId,
        name: createMenuDto.name,
        price: createMenuDto.price,
        image: createMenuDto.image,
      },
    });
  }

  //* 메뉴 전체 조회
  async getMenus(menuWhereInput: Prisma.MenuWhereInput): Promise<Menu[]> {
    // 업장 확인  
    const store = await this.storeService.findOneStore(Number(menuWhereInput.StoreId));
    if (!store) {
      throw new HttpException('업장 정보가 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    }

    return this.prisma.menu.findMany({
      where: menuWhereInput,
    });
  }

  //* 특정 메뉴 조회
  async getMenu(menuWhereUniqueInput: Prisma.MenuWhereUniqueInput): Promise<Menu> {
    // 업장 확인
    const store = await this.storeService.findOneStore(Number(menuWhereUniqueInput.StoreId));
    if (!store) {
      throw new HttpException('업장 정보가 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    }

    // 메뉴 확인
    const menu = await this.prisma.menu.findUnique({
      where: menuWhereUniqueInput,
    });
    if (!menu) {
      throw new HttpException('메뉴가 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    }

    return menu;
  }

  //* 메뉴 수정
  async updateMenu(updateMenuDto: UpdateMenuDto, user: number): Promise<Menu> {
    // 업장 확인
    const store = await this.storeService.findOneStore(Number(updateMenuDto.StoreId));
    if (!store) {
      throw new HttpException('업장 정보가 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    }

    // 접근 권한 확인
    if(store.OwnerId !== user){
        throw new HttpException('접근 권한이 없습니다.', HttpStatus.FORBIDDEN);
    }

    // 메뉴 확인
    const isMenu = await this.prisma.menu.findUnique({
      where: {
        id: updateMenuDto.menuId,
      },
    });
    if (!isMenu) {
      throw new HttpException('메뉴가 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    }

    // 메뉴 중복 확인
    const menu = await this.prisma.menu.findFirst({
      where: {
        name: updateMenuDto.name,
      },
    });
    if (menu) {
      throw new HttpException('이미 존재하는 메뉴입니다.', HttpStatus.BAD_REQUEST);
    }

    // 메뉴 수정
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

  //* 메뉴 삭제
  async deleteMenu(where: Prisma.MenuWhereUniqueInput, user: number): Promise<Menu> {
    // 업장 확인
    const store = await this.storeService.findOneStore(Number(where.StoreId));
    if (!store) {
      throw new HttpException('업장 정보가 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    }

    // 접근 권한 확인
    if(store.OwnerId !== user){
        throw new HttpException('접근 권한이 없습니다.', HttpStatus.FORBIDDEN);
    }

    // 메뉴 확인
    const isMenu = await this.prisma.menu.findUnique({
      where: {
        id: where.id,
      },
    });
    if (!isMenu) {
      throw new HttpException('메뉴가 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    }

    // 메뉴 삭제
    return this.prisma.menu.delete({
      where,
    });
  }
}
