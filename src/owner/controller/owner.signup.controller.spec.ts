import { Test, TestingModule } from '@nestjs/testing';
import { OwnerSignupController } from './owner.signup.controller';

describe('OwnerSignupController', () => {
  let controller: OwnerSignupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnerSignupController],
    }).compile();

    controller = module.get<OwnerSignupController>(OwnerSignupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
