import { Module } from '@nestjs/common';
import { VehiclesService } from '../vehicles/vehicles.service';
import { VehiclesResolver } from '../vehicles/vehicles.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Vehicles, VehiclesSchema } from '../schema/vehicle_info.schema';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    MongooseModule.forFeature([
      {
        name: Vehicles.name,
        schema: VehiclesSchema,
      },
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '/src/schema.gql'),
    }),
  ],
  providers: [VehiclesService, VehiclesResolver],
})
export class VehiclesModule {}
