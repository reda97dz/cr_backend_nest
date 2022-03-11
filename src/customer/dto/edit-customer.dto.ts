import {
  IsAlphanumeric,
  IsDate,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class EditCustomerDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @IsAlphanumeric()
  @IsOptional()
  license?: string;

  @IsDate()
  @IsOptional()
  birthDate?: Date;
}
