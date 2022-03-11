import {
  IsDate,
  IsDateString,
  IsOptional,
  IsNumber,
  IsString,
} from 'class-validator';

export class EditRentDto {
  @IsString()
  @IsOptional()
  agentFullName?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDate()
  @IsOptional()
  endDate?: string;

  @IsNumber()
  @IsOptional()
  customerId?: number;

  @IsNumber()
  @IsOptional()
  carId?: number;
}
