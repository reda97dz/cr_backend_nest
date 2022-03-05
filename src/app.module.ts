import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './car/car.module';
import { RentModule } from './rent/rent.module';
import { CustomerModule } from './customer/customer.module';
import { RentModule } from './rent/rent.module';
import { ReturnModule } from './return/return.module';
import { ReturnModule } from './return/return.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    CarModule,
    RentModule,
    CustomerModule,
    ReturnModule,
  ],
})
export class AppModule {}
