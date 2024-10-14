import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { VehiclesService } from './vehicles/vehicles.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Vehicles, VehiclesSchema } from './schema/vehicle_info.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    MongooseModule.forFeature([
      { name: Vehicles.name, schema: VehiclesSchema },
    ]),
    VehiclesModule,
  ],
  providers: [AppService, VehiclesService],
})
export class AppModule {}
