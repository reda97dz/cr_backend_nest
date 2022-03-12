import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ReturnService } from './return.service';
import { CreateReturnDto, EditReturnDto } from './dto';

@Controller('return')
export class ReturnController {
  constructor(private readonly returnService: ReturnService) {}

  @Post()
  createReturn(@Body() dto: CreateReturnDto) {
    return this.returnService.createReturn(dto);
  }

  @Get()
  getReturns() {
    return this.returnService.getReturns();
  }

  @Get(':id')
  getReturnById(@Param('id', ParseIntPipe) returnId: number) {
    return this.returnService.getReturnById(returnId);
  }

  @Patch(':id')
  editReturnById(
    @Param('id', ParseIntPipe) returnId: number,
    @Body() dto: EditReturnDto,
  ) {
    return this.returnService.editReturnById(returnId, dto);
  }
}
