import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('/stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  createStore(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':store_id')
  findOne(@Param('store_id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Put(':store_id')
  // * ownerId는 처리 안해도 되나...? 오류나면 이거 한번 보기!
  // * 있어야 한다!!
  update(@Param('store_id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(':store_id')
  remove(@Param('store_id') id: string) {
    return this.storeService.remove(+id);
  }
}
