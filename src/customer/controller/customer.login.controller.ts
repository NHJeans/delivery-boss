import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CustomerLoginDto } from '../dto/customer.login.dto';
import { LogoutDto } from '../dto/customer.logout.dto';
import { CustomerLoginService } from '../service/customer.login.service';

@Controller('/auth/customer')
@ApiTags('login & logout')
export class CustomerLoginController {
  constructor(private readonly customerloginService: CustomerLoginService) {}

  @ApiExcludeEndpoint()
  @Get()
  @Render('customer')
  customerPage() {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'customer 로그인' })
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
