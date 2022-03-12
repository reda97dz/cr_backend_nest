import {
  IsAlphanumeric,
  IsDateString,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  license: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate: string;
}
