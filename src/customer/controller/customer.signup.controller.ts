import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CustomerSignUpDto } from '../dto/customer.signup.dto';
import { CustomerSignupService } from '../service/customer.signup.service';

@Controller('/auth/customer')
export class CustomerSignupController {
  constructor(private readonly signupService: CustomerSignupService) {}

  @Post('/signup')
  @HttpCode(201)
  async signUp(@Body() signupDto: CustomerSignUpDto) {
    return this.signupService.signUp(signupDto);
  }
}
