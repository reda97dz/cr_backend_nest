import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { EditCustomerDto } from './dto/edit-customer.dto';

@UseGuards(JwtGuard)
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.createCustomer(createCustomerDto);
  }

  @Get()
  getCustomers() {
    return this.customerService.getCustomers();
  }

  @Get(':id')
  getCustomerById(@Param('id', ParseIntPipe) customerId: number) {
    return this.customerService.getCustomerById(customerId);
  }

  @Patch(':id')
  editCustomerById(
    @Param('id', ParseIntPipe) customerId: number,
    @Body() dto: EditCustomerDto,
  ) {
    return this.customerService.editCustomerById(customerId, dto);
  }
}
