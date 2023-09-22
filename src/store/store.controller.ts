// ? 업장 메인 와이어프레임 추가 (업장 등록 CRUD)
// ? 업장 - 가게 연결, api 명세서 수정 필요

import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// TODO 사장님은 업장 정보를 등록 및 수정, 삭제를 할 수 있어야 한다 -> 등록 / 수정 / 삭제 시 사장 권한 확인
// TODO 사장님은 업장 정보를 오직 1개만 갖고 있을 수 있어야 합니다.
// TODO 업장 정보 목록은 모두가 볼 수 있어야 합니다.
// ? 가게 이미지 추가하려면 스키마 변경해야함.

@Controller('/stores')
@ApiTags('store CRUD')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  // 업장 생성
  @ApiOperation({ summary: '업장 생성' })
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createStore(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  // 전체 업장 조회
  @ApiOperation({ summary: '전체 업장 조회' })
  @Get()
  async findAllComments() {
    return this.storeService.findAllComments();
  }

  // 세부 업장 조회
  @ApiOperation({ summary: '세부 업장 조회' })
  @Get(':storeId')
  async findOneComment(@Param('storeId') id: string) {
    return this.storeService.findOneComment(+id);
  }

  // 업장 정보 수정
  @ApiOperation({ summary: '업장 정보 수정' })
  @Put(':storeId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateComment(@Param('storeId') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.updateComment(+id, updateStoreDto);
  }

  // 업장 정보 삭제
  @ApiOperation({ summary: '업장 정보 삭제' })
  @Delete(':storeId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteCart(@Param('storeId') id: string) {
    return this.storeService.deleteCOmment(+id);
  }
}
