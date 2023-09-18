import { Test, TestingModule } from '@nestjs/testing';
import { OwnerLoginService } from './owner.login.service';

describe('OwnerLoginService', () => {
  let service: OwnerLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnerLoginService],
    }).compile();

    service = module.get<OwnerLoginService>(OwnerLoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
