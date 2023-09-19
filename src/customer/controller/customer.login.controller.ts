import { Body, Controller, Post } from '@nestjs/common';
import { CustomerLoginDto } from '../dto/customer.login.dto';
import { LogoutDto } from '../dto/customer.logout.dto';
import { CustomerLoginService } from '../service/customer.login.service';

@Controller('/auth/customer')
export class CustomerLoginController {
  constructor(private readonly customerloginService: CustomerLoginService) {}

  @Post('/login')
  async login(@Body() loginDto: CustomerLoginDto) {
    return this.customerloginService.login(loginDto);
  }
  @Post('logout')
  async logout(@Body() logoutDto: LogoutDto) {
    return this.customerloginService.logout(logoutDto.userId);
  }
}
