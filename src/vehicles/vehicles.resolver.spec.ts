import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesResolver } from './vehicles.resolver';
import { VehiclesService } from './vehicles.service';

describe('VehiclesResolver', () => {
  let resolver: VehiclesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesResolver,
        {
          provide: VehiclesService,
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<VehiclesResolver>(VehiclesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
