import { IsAlphanumeric, IsOptional, IsString } from 'class-validator';

export class EditCarDto {
  @IsString()
  @IsOptional()
  model?: string;

  @IsAlphanumeric()
  @IsOptional()
  plateNumber?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
