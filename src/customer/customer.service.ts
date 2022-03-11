import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { EditCustomerDto } from './dto/edit-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  createCustomer(dto: CreateCustomerDto) {
    return this.prisma.customer.create({ data: dto });
  }

  getCustomers() {
    return this.prisma.customer.findMany({});
  }

  getCustomerById(customerId: number) {
    return this.prisma.customer.findFirst({
      where: {
        id: customerId,
      },
    });
  }

  async editCustomerById(customerId: number, dto: EditCustomerDto) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) throw new NotFoundException('Not found!');

    return this.prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        ...dto,
      },
    });
  }
}
