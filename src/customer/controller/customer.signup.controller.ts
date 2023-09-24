import { Body, Controller, Get, HttpCode, Post, Render } from '@nestjs/common';
import { CustomerSignUpDto } from '../dto/customer.signup.dto';
import { CustomerSignupService } from '../service/customer.signup.service';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('sign up')
@Controller('/auth/customer')
export class CustomerSignupController {
  constructor(private readonly signupService: CustomerSignupService) {}

  @ApiExcludeEndpoint()
  @Get('signup') // GET 요청을 처리하는 라우트 추가
  @Render('signup')
  registerPage() {}

  @ApiOperation({ summary: '고객님 회원가입' })
  @Post('/signup')
  @HttpCode(201)
  async signUp(@Body() signupDto: CustomerSignUpDto) {
    return this.signupService.signUp(signupDto);
  }
}
