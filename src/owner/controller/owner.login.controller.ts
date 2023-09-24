import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { OwnerLoginDto } from '../dto/owner.login.dto';
import { LogoutDto } from '../dto/owner.logout.dto';
import { OwnerLoginService } from '../service/owner.login.service';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('login & logout')
@Controller('/auth/owner')
export class OwnerLoginController {
  constructor(private readonly ownerloginService: OwnerLoginService) {}

  @ApiExcludeEndpoint()
  @Get('login')
  @Render('login')
  loginPage() {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'owner 로그인' })
  @Post('/login')
  async login(@Body() loginDto: OwnerLoginDto, @Res() res: Response): Promise<void> {
    return this.ownerloginService.login(loginDto, res);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'owner 로그아웃' })
  @Post('logout')
  async logout(@Body() logoutDto: LogoutDto) {
    return this.ownerloginService.logout(logoutDto.userId);
  }
}
