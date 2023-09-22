import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { OwnerLoginDto } from '../dto/owner.login.dto';
import { LogoutDto } from '../dto/owner.logout.dto';
import { OwnerLoginService } from '../service/owner.login.service';

@Controller('/auth/owner')
export class OwnerLoginController {
  constructor(private readonly ownerloginService: OwnerLoginService) {}

  @Post('/login')
  async login(@Body() loginDto: OwnerLoginDto, @Res() res: Response): Promise<void> {
    return this.ownerloginService.login(loginDto, res);
  }
  @Post('logout')
  async logout(@Body() logoutDto: LogoutDto) {
    return this.ownerloginService.logout(logoutDto.userId);
  }
}
