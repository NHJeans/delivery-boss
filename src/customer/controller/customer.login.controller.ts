import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CustomerLoginDto } from '../dto/customer.login.dto';
import { LogoutDto } from '../dto/customer.logout.dto';
import { CustomerLoginService } from '../service/customer.login.service';

@Controller('/auth/customer')
export class CustomerLoginController {
  constructor(private readonly customerloginService: CustomerLoginService) {}

  @Post('login')
  async login(@Body() loginDto: CustomerLoginDto, @Res() res: Response): Promise<void> {
    return this.customerloginService.login(loginDto, res);
  }
  @Post('logout')
  async logout(@Body() logoutDto: LogoutDto) {
    return this.customerloginService.logout(logoutDto.userId);
  }
}
