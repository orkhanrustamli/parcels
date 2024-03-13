import { Type } from 'class-transformer';
import {
  Validate,
  IsString,
  ValidateNested,
  ValidatorConstraint,
  IsOptional,
  ValidationArguments,
  ValidatorConstraintInterface,
  IsInt,
  Min,
  Max,
} from 'class-validator';

@ValidatorConstraint({ name: 'exclusiveQueryOperators', async: false })
export class ExclusiveQueryOperatorsConstraint
  implements ValidatorConstraintInterface
{
  validate(value: QueryOperatorDto) {
    const properties = ['is', 'contains', 'starts', 'ends'];
    const presentProperties = properties.filter(
      (prop) => value[prop] !== undefined,
    );
    return presentProperties.length === 1;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} operator should be exclusive and only one of is, contains, starts, or ends should be present.`;
  }
}

export class QueryOperatorDto {
  @IsString()
  @IsOptional()
  is?: string;

  @IsString()
  @IsOptional()
  contains?: string;

  @IsString()
  @IsOptional()
  starts?: string;

  @IsString()
  @IsOptional()
  ends?: string;
}

export class GetParcelsQueryDto {
  @Validate(ExclusiveQueryOperatorsConstraint)
  @ValidateNested()
  @Type(() => QueryOperatorDto)
  @IsOptional()
  description?: QueryOperatorDto;

  @Validate(ExclusiveQueryOperatorsConstraint)
  @ValidateNested()
  @Type(() => QueryOperatorDto)
  @IsOptional()
  country?: QueryOperatorDto;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  limit?: number;
}
