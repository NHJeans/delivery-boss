import { Body, Controller, Post } from '@nestjs/common';
import { OwnerLoginDto } from '../dto/owner.login.dto';
import { LogoutDto } from '../dto/owner.logout.dto';
import { OwnerLoginService } from '../service/owner.login.service';

@Controller('/auth/owner')
export class OwnerLoginController {
  constructor(private readonly ownerloginService: OwnerLoginService) {}

  @Post('/login')
  async login(@Body() loginDto: OwnerLoginDto) {
    return this.ownerloginService.login(loginDto);
  }
  @Post('logout')
  async logout(@Body() logoutDto: LogoutDto) {
    return this.ownerloginService.logout(logoutDto.userId);
  }
}
