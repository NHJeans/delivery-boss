import { Body, Controller, Get, HttpCode, Post, Render } from '@nestjs/common';
import { CustomerSignUpDto } from '../dto/customer.signup.dto';
import { CustomerSignupService } from '../service/customer.signup.service';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('login & logout')
@Controller('/auth/customer')
export class CustomerSignupController {
  constructor(private readonly signupService: CustomerSignupService) {}

  @ApiExcludeEndpoint()
  @Get('signup') // GET 요청을 처리하는 라우트 추가
  @Render('signup')
  registerPage() {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'customer 로그아웃' })
  @Post('/signup')
  @HttpCode(201)
  async signUp(@Body() signupDto: CustomerSignUpDto) {
    return this.signupService.signUp(signupDto);
  }
}
