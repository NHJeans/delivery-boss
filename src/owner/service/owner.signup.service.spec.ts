import { Test, TestingModule } from '@nestjs/testing';
import { OwnerSignupService } from './owner.signup.service';

describe('OwnerSignupService', () => {
  let service: OwnerSignupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnerSignupService],
    }).compile();

    service = module.get<OwnerSignupService>(OwnerSignupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
