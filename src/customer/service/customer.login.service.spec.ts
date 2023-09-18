import { Test, TestingModule } from '@nestjs/testing';
import { CustomerLoginService } from './customer.login.service';

describe('CustomerLoginService', () => {
  let service: CustomerLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerLoginService],
    }).compile();

    service = module.get<CustomerLoginService>(CustomerLoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
