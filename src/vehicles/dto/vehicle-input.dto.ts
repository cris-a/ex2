import { InputType, Field } from '@nestjs/graphql';
@InputType()
class VehiclesTypeInput {
  @Field()
  typeId: string;

  @Field()
  typeName: string;
}
@InputType()
export class VehiclesInput {
  @Field()
  makeId: string;
  @Field()
  makeName: string;
  @Field(() => [VehiclesTypeInput])
  VehicleTypes: VehiclesTypeInput[];
}
