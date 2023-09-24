import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { CustomerLoginDto } from '../dto/customer.login.dto';
import { LogoutDto } from '../dto/customer.logout.dto';
import { CustomerLoginService } from '../service/customer.login.service';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/auth/customer')
@ApiTags('login & logout')
export class CustomerLoginController {
  constructor(private readonly customerloginService: CustomerLoginService) {}

  @ApiExcludeEndpoint()
  @Get('login')
  @Render('login')
  loginPage() {}

  @ApiOperation({ summary: '고객님 로그인' })
  @Post('login')
  async login(@Body() loginDto: CustomerLoginDto, @Res() res: Response): Promise<void> {
    return this.customerloginService.login(loginDto, res);
  }

  @ApiOperation({ summary: '고객님 로그아웃' })
  @Post('logout')
  async logout(@Body() logoutDto: LogoutDto) {
    return this.customerloginService.logout(logoutDto.userId);
  }
}
