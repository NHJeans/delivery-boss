import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { OwnerSignUpDto } from '../dto/owner.signup.dto';
import { OwnerSignupService } from '../service/owner.signup.service';

@Controller('/auth/owner')
export class OwnerSignupController {
  constructor(private readonly signupService: OwnerSignupService) {}

  @Post('/signup')
  @HttpCode(201)
  async signUp(@Body() signupDto: OwnerSignUpDto) {
    return this.signupService.signUp(signupDto);
  }
}
