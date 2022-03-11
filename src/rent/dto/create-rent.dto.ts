import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRentDto {
  @IsString()
  @IsNotEmpty()
  agentFullName: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  @IsNumber()
  @IsNotEmpty()
  carId: number;
}
