import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { Vehicles } from '../schema/vehicle_info.schema';
import { VehiclesService } from '../vehicles/vehicles.service';

@Resolver(() => Vehicles)
export class VehiclesResolver {
  constructor(private readonly vehicleService: VehiclesService) {}

  @Mutation(() => [Vehicles])
  async createVehicleInfo(): Promise<Vehicles | void> {
    return this.vehicleService.createVehicleInfo();
  }

  @Query(() => [Vehicles])
  async getData(): Promise<Vehicles[]> {
    return this.vehicleService.getData();
  }
}
