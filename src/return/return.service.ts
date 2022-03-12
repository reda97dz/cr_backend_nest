import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReturnDto, EditReturnDto } from './dto';

@Injectable()
export class ReturnService {
  constructor(private prisma: PrismaService) {}
  createReturn(dto: CreateReturnDto) {
    return this.prisma.return.create({ data: dto });
  }

  getReturns() {
    return this.prisma.return.findMany({});
  }

  getReturnById(returnId: number) {
    return this.prisma.return.findFirst({
      where: {
        id: returnId,
      },
    });
  }

  async editReturnById(returnId: number, dto: EditReturnDto) {
    const carReturn = await this.prisma.return.findUnique({
      where: {
        id: returnId,
      },
    });

    if (!carReturn) throw new ForbiddenException('Access to resources denied');

    return this.prisma.return.update({
      where: {
        id: returnId,
      },
      data: {
        ...dto,
      },
    });
  }
}
