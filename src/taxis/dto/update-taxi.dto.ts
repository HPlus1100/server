import { PartialType } from '@nestjs/mapped-types';
import { CreateTaxiDto } from './create-taxi.dto';

export class UpdateTaxiDto extends PartialType(CreateTaxiDto) {}
