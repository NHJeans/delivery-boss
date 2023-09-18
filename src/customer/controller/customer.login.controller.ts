import { Body, Controller, Post } from '@nestjs/common';
import { CustomerLoginDto } from '../dto/customer.login.dto';
import { CustomerLoginService } from '../service/customer.login.service';

@Controller('customer/login')
export class CustomerLoginController {
  constructor(private readonly loginService: CustomerLoginService) {}

  @Post()
  async login(@Body() loginDto: CustomerLoginDto) {
    return this.loginService.login(loginDto);
  }
}
