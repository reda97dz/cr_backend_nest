import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarDto } from './dto';
import { EditCarDto } from './dto/edit-car.dto';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  getCars() {
    return this.prisma.car.findMany({});
  }

  getCarById(carId: number) {
    return this.prisma.car.findFirst({
      where: {
        id: carId,
      },
    });
  }

  async createCar(dto: CreateCarDto) {
    const car = await this.prisma.car.create({
      data: dto,
    });
    return car;
  }

  async editCarById(carId: number, dto: EditCarDto) {
    const car = await this.prisma.car.findUnique({
      where: {
        id: carId,
      },
    });

    if (!car) throw new ForbiddenException('Access to resources denied');

    return this.prisma.car.update({
      where: {
        id: carId,
      },
      data: {
        ...dto,
      },
    });
  }
}
