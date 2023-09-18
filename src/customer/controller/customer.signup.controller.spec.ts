import { Test, TestingModule } from '@nestjs/testing';
import { CustomerSignupController } from './customer.signup.controller';

describe(' CustomerSignupController', () => {
  let controller: CustomerSignupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerSignupController],
    }).compile();

    controller = module.get<CustomerSignupController>(CustomerSignupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
