import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class EditReturnDto {
  @IsDateString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  agentFullName?: string;

  @IsString()
  @IsOptional()
  comments?: string;

  @IsNumber()
  @IsOptional()
  rentId?: number;
}
