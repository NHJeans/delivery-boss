import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSignupService } from './customer.signup.service';

describe('CustomerSignupService', () => {
  let service: CustomerSignupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerSignupService],
    }).compile();

    service = module.get<CustomerSignupService>(CustomerSignupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
