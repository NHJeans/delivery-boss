import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CustomerSignupService } from '../service/customer.signup.service';
import { CustomerSignUpDto } from '../dto/customer.signup.dto';

@Controller('customer/signup')
export class CustomerSignupController {
  constructor(private readonly signupService: CustomerSignupService) {}

  @Post()
  @HttpCode(201)
  async signUp(@Body() signupDto: CustomerSignUpDto) {
    return this.signupService.signUp(signupDto);
  }
}
