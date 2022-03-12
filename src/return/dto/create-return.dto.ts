import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReturnDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  agentFullName: string;

  @IsString()
  @IsNotEmpty()
  comments: string;

  @IsNumber()
  @IsNotEmpty()
  rentId: number;
}
