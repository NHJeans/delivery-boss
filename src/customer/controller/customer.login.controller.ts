import { Body, Controller, Post } from '@nestjs/common';
import { CustomerLoginDto } from '../dto/customer.login.dto';
import { CustomerLoginService } from '../service/customer.login.service';

@Controller('/auth/customer')
export class CustomerLoginController {
  constructor(private readonly loginService: CustomerLoginService) {}

  @Post('/login')
  async login(@Body() loginDto: CustomerLoginDto) {
    return this.loginService.login(loginDto);
  }
}
