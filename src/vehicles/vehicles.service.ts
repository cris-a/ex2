import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicles, VehiclesDocument } from '../schema/vehicle_info.schema';
import axios from 'axios';
import { parseXML } from '../utils/xml-parser.util';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicles.name)
    private readonly vehicleModel: Model<VehiclesDocument>,
  ) {}

  async getData(): Promise<Vehicles[]> {
    try {
      const data = await this.vehicleModel.find().lean();
      return data;
    } catch (error) {
      console.error(`Error fetching vehicles data:`, error);
      throw new Error('Failed to retrieve information');
    }
  }

  async createVehicleInfo(): Promise<Vehicles | void> {
    try {
      const { data } = await axios(process.env.ALL_MAKES);
      const dataXML = await parseXML(data);
      const dataJson = dataXML;
      const resultsXML = dataJson.Response.Results?.[0].AllVehicleMakes;
      for (const makeInfo of resultsXML) {
        const makeId = makeInfo.Make_ID[0];
        const makeName = makeInfo.Make_Name[0];
        const { data } = await axios(
          `${process.env.VEHICLE_TYPES}/${makeId}?format=xml`,
        );
        const makeXML = await parseXML(data);
        const makeJSON =
          await makeXML.Response.Results?.[0].VehicleTypesForMakeIds;
        await this.vehicleModel.create({
          makeId: makeId,
          makeName: makeName,
          VehicleTypes: [
            {
              typeId: makeJSON[0].VehicleTypeId,
              typeName: makeJSON[0].VehicleTypeName,
            },
          ],
        });
        console.log('All documents has been saved successfuly');
      }
    } catch (error) {
      console.error('Failed to fetch vehicles makes', error);
      throw new Error('Failed to retrieve information from API');
    }
  }
}
