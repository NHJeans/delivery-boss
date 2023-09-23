//src/auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('ownerjwt') {}

//? 로그인 후 인증된 사용자만 접근할 수 있도록 하는 Guard
// import {useGuards} from '@nestjs/common';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

//? 컨트롤러에 데코레이터 추가
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()

//? example
// src/users/users.controller.ts

// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   ParseIntPipe,
//   UseGuards,
// } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
// import { UserEntity } from './entities/user.entity';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @Controller('users')
// @ApiTags('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Post()
//   @ApiCreatedResponse({ type: UserEntity })
//   async create(@Body() createUserDto: CreateUserDto) {
//     return new UserEntity(await this.usersService.create(createUserDto));
//   }

//   @Get()
//   @UseGuards(JwtAuthGuard)
//   @ApiBearerAuth()
//   @ApiOkResponse({ type: UserEntity, isArray: true })
//   async findAll() {
//     const users = await this.usersService.findAll();
//     return users.map((user) => new UserEntity(user));
//   }

//   @Get(':id')
//   @UseGuards(JwtAuthGuard)
//   @ApiBearerAuth()
//   @ApiOkResponse({ type: UserEntity })
//   async findOne(@Param('id', ParseIntPipe) id: number) {
//     return new UserEntity(await this.usersService.findOne(id));
//   }

//   @Patch(':id')
//   @UseGuards(JwtAuthGuard)
//   @ApiBearerAuth()
//   @ApiCreatedResponse({ type: UserEntity })
//   async update(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() updateUserDto: UpdateUserDto,
//   ) {
//     return new UserEntity(await this.usersService.update(id, updateUserDto));
//   }

//   @Delete(':id')
//   @UseGuards(JwtAuthGuard)
//   @ApiBearerAuth()
//   @ApiOkResponse({ type: UserEntity })
//   async remove(@Param('id', ParseIntPipe) id: number) {
//     return new UserEntity(await this.usersService.remove(id));
//   }
// }
