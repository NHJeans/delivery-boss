import { Body, Controller, Get, HttpCode, Post, Render } from '@nestjs/common';
import { OwnerSignUpDto } from '../dto/owner.signup.dto';
import { OwnerSignupService } from '../service/owner.signup.service';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('sign up')
@Controller('/auth/owner')
export class OwnerSignupController {
  constructor(private readonly signupService: OwnerSignupService) {}

  @ApiExcludeEndpoint()
  @Get('signup') // GET 요청을 처리하는 라우트 추가
  @Render('signup')
  registerPage() {}

  @ApiOperation({ summary: '사장님 회원가입' })
  @Post('/signup')
  @HttpCode(201)
  async signUp(@Body() signupDto: OwnerSignUpDto) {
    return this.signupService.signUp(signupDto);
  }
}
