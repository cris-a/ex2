import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from '../vehicles/vehicles.service';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { Model } from 'mongoose';
import { Vehicles } from '../schema/vehicle_info.schema';
import { getModelToken } from '@nestjs/mongoose';

const mockVehicleService = {
  create: jest.fn().mockResolvedValue({
    _id: '670c5fcaf81da04882f2a3f5',
    makeId: '12858',
    makeName: '#1 ALPINE CUSTOMS',
    VehicleTypes: [
      {
        typeId: ['6'],
        typeName: ['Trailer'],
      },
    ],
  }),
  find: jest.fn().mockResolvedValue({
    _id: '670c5fcaf81da04882f2a3f5',
  }),
};

describe('VehiclesService', () => {
  let service: VehiclesService;
  let vehicleModel: Model<Vehicles>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [VehiclesModule],
      providers: [
        VehiclesService,
        {
          provide: getModelToken(Vehicles.name),
          useValue: mockVehicleService,
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
    vehicleModel = module.get<Model<Vehicles>>(getModelToken(Vehicles.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
