import { ForbiddenException, Injectable } from '@nestjs/common';
import { Rent } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { EditRentDto } from './dto/edit-rent.dto';

@Injectable()
export class RentService {
  constructor(private prisma: PrismaService) {}

  async createRent(dto: CreateRentDto) {
    const canRent = await this.canRent(dto);
    if (!canRent) {
      throw new ForbiddenException('Interval overlap');
    }
    return this.prisma.rent.create({ data: dto });
  }

  getRents() {
    return this.prisma.rent.findMany({});
  }

  getRentById(rentId: number) {
    return this.prisma.rent.findFirst({
      where: {
        id: rentId,
      },
    });
  }

  async editRentById(rentId: number, dto: EditRentDto) {
    const rent = await this.prisma.rent.findUnique({
      where: {
        id: rentId,
      },
    });

    if (!rent) throw new ForbiddenException('Access to resources denied');

    const newRentObject: Rent = {
      carId: dto.carId ?? rent.carId,
      startDate: dto.startDate ?? rent.startDate,
      endDate: dto.endDate ?? rent.endDate,
      ...rent,
    };

    if (!this.canRent(newRentObject)) {
      throw new ForbiddenException('Interval overlap');
    }

    return this.prisma.rent.update({
      where: {
        id: rentId,
      },
      data: {
        ...dto,
      },
    });
  }

  private async canRent(dto: CreateRentDto | EditRentDto | Rent) {
    const carRentList = await this.prisma.rent.findMany({
      /* A query to find all rents that have overlapping dates with the new rent. */
      where: {
        carId: dto.carId,
        OR: [
          {
            startDate: {
              lte: dto.endDate,
              gte: dto.startDate,
            },
          },
          {
            endDate: {
              lte: dto.endDate,
              gte: dto.startDate,
            },
          },
          {
            AND: [
              {
                startDate: { lte: dto.startDate },
              },
              {
                endDate: { gte: dto.endDate },
              },
            ],
          },
        ],
      },
    });
    return carRentList.length === 0;
  }
}
