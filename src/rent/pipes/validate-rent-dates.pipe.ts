import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  ForbiddenException,
} from '@nestjs/common';
import { CreateRentDto } from '../dto/create-rent.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class ValidateRentDates implements PipeTransform {
  transform(dto: CreateRentDto, metadata: ArgumentMetadata) {
    if (dayjs(dto.startDate).isAfter(dto.endDate)) {
      throw new ForbiddenException('Invalid date range');
    }
    return dto;
  }
}
