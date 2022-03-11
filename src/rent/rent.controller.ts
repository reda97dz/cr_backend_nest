import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { RentService } from './rent.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { EditRentDto } from './dto/edit-rent.dto';
import { JwtGuard } from '../auth/guard';
import { ValidateRentDates } from './pipes/validate-rent-dates.pipe';
import { ValidateEditRentDates } from './pipes/validate-edit-rent-dates.pipe';

@UseGuards(JwtGuard)
@Controller('rents')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Post()
  @UsePipes(new ValidateRentDates())
  createRent(@Body() createRentDto: CreateRentDto) {
    return this.rentService.createRent(createRentDto);
  }

  @Get()
  getRents() {
    return this.rentService.getRents();
  }

  @Get(':id')
  getCustomerById(@Param('id', ParseIntPipe) rentId: number) {
    return this.rentService.getRentById(rentId);
  }

  @Patch(':id')
  editRenById(
    @Param('id', ParseIntPipe) rentId: number,
    @Body(new ValidateEditRentDates()) dto: EditRentDto,
  ) {
    return this.rentService.editRentById(rentId, dto);
  }
}
