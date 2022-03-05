import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CarService } from './car.service';
import { CreateCarDto } from './dto';
import { EditCarDto } from './dto/edit-car.dto';

@UseGuards(JwtGuard)
@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  getCars() {
    return this.carService.getCars();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) carId: number) {
    return this.carService.getCarById(carId);
  }

  @Post()
  createCar(@Body() dto: CreateCarDto) {
    return this.carService.createCar(dto);
  }

  @Patch(':id')
  editCarById(
    @Param('id', ParseIntPipe) carId: number,
    @Body() dto: EditCarDto,
  ) {
    return this.carService.editCarById(carId, dto);
  }
}
