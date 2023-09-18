import { Test, TestingModule } from '@nestjs/testing';
import { OwnerLoginController } from './owner.login.controller';

describe('OwnerLoginController', () => {
  let controller: OwnerLoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnerLoginController],
    }).compile();

    controller = module.get<OwnerLoginController>(OwnerLoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
