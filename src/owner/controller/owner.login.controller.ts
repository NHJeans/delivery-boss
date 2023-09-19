import { Controller, Post, Body } from '@nestjs/common';
import { OwnerLoginService } from '../service/owner.login.service';
import { OwnerLoginDto } from '../dto/owner.login.dto';

@Controller('/auth/owner')
export class OwnerLoginController {
  constructor(private readonly loginService: OwnerLoginService) {}

  @Post('/login')
  async login(@Body() loginDto: OwnerLoginDto) {
    return this.loginService.login(loginDto);
  }
}
