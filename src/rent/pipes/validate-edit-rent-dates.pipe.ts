import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  ForbiddenException,
} from '@nestjs/common';
import * as dayjs from 'dayjs';

import { EditRentDto } from '../dto/edit-rent.dto';
@Injectable()
export class ValidateEditRentDates implements PipeTransform {
  transform(dto: EditRentDto, metadata: ArgumentMetadata) {
    if (dto.startDate && dto.startDate) {
      if (dayjs(dto.startDate).isAfter(dto.endDate)) {
        throw new ForbiddenException('Invalid date range');
      }
    }
    return dto;
  }
}
