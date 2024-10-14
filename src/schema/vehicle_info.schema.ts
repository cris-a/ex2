import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class VehicleType {
  @Field(() => [String])
  @Prop({ type: [String] })
  typeId: string;

  @Field(() => [String])
  @Prop({ type: [String] })
  typeName: string;
}

export type VehiclesDocument = HydratedDocument<Vehicles>;
@ObjectType()
@Schema()
export class Vehicles {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop()
  makeId: string;

  @Field()
  @Prop()
  makeName: string;

  @Field(() => [VehicleType])
  @Prop({ type: [VehicleType] })
  VehicleTypes: [];
}
export const VehiclesSchema = SchemaFactory.createForClass(Vehicles);
