import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';
import { CreateCarDto, EditCarDto } from 'src/car/dto';
import { CreateCustomerDto, EditCustomerDto } from 'src/customer/dto';
import { CreateRentDto } from 'src/rent/dto/create-rent.dto';
import { EditRentDto } from 'src/rent/dto/edit-rent.dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => app.close());

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'reda@gmail.com',
      password: '123',
    };
    describe('Signup', () => {
      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
      it('should singin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'accessToken');
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'reda baka',
          email: 'redaa@gmail.com',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });

  describe('Cars', () => {
    describe('Get empty cars', () => {
      it('should get cars', () => {
        return pactum
          .spec()
          .get('/cars')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create cars', () => {
      const dto: CreateCarDto = {
        model: 'car number 1',
        plateNumber: '123456879',
        type: 'gas',
      };
      it('should create car', () => {
        return pactum
          .spec()
          .post('/cars')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('carId', 'id');
      });
    });

    describe('Get cars', () => {
      it('should get cars', () => {
        return pactum
          .spec()
          .get('/cars')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Get car by id', () => {
      it('should get car by id', () => {
        return pactum
          .spec()
          .get('/cars/{id}')
          .withPathParams('id', '$S{carId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{carId}');
      });
    });

    describe('Edit car by id', () => {
      const dto: EditCarDto = {
        model: 'Edit car model name',
      };
      it('should edit car', () => {
        return pactum
          .spec()
          .patch('/cars/{id}')
          .withPathParams('id', '$S{carId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.model);
      });
    });
  });

  describe('Customers', () => {
    describe('Get empty customers', () => {
      it('should get customers', () => {
        return pactum
          .spec()
          .get('/customers')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create customers', () => {
      const dto: CreateCustomerDto = {
        fullName: 'Barney Stinson',
        phoneNumber: '+213560208069',
        license: '225548',
        birthDate: '1990-03-04T21:02:37.114Z',
      };
      it('should create customer', () => {
        return pactum
          .spec()
          .post('/customers')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('customerId', 'id');
      });
    });

    describe('Get customers', () => {
      it('should get customers', () => {
        return pactum
          .spec()
          .get('/cars')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Get customer by id', () => {
      it('should get customer by id', () => {
        return pactum
          .spec()
          .get('/customers/{id}')
          .withPathParams('id', '$S{customerId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{customerId}');
      });
    });

    describe('Edit customer by id', () => {
      const dto: EditCustomerDto = {
        fullName: 'Vanilla Thunder',
      };
      it('should edit customer', () => {
        return pactum
          .spec()
          .patch('/customers/{id}')
          .withPathParams('id', '$S{customerId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.fullName);
      });
    });
  });

  describe('Rents', () => {
    describe('Get empty rents', () => {
      it('should get rents', () => {
        return pactum
          .spec()
          .get('/rents')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });
    describe('Create rent', () => {
      const dto = {
        startDate: '2022-04-20T21:02:37.114Z',
        endDate: '2022-04-25T21:02:37.114Z',
        agentFullName: 'Reda Baka',
      };
      it('should create rent', () => {
        return pactum
          .spec()
          .post('/rents')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({
            ...dto,
            carId: '$S{carId}',
            customerId: '$S{customerId}',
          })
          .expectStatus(201)
          .stores('rentId', 'id');
      });
      const invalidDto = {
        startDate: '2022-04-20T21:02:37.114Z',
        endDate: '2022-04-10T21:02:37.114Z',
        agentFullName: 'Reda Baka',
      };
      it('should throw if rent date is after return date', () => {
        return pactum
          .spec()
          .post('/rents')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({
            ...invalidDto,
            carId: '$S{carId}',
            customerId: '$S{customerId}',
          })
          .expectStatus(403);
      });
      const overlapDto = {
        startDate: '2022-04-18T21:02:37.114Z',
        endDate: '2022-04-26T21:02:37.114Z',
        agentFullName: 'Reda Baka',
      };
      it('should throw if rent dates overlap with existing rent', () => {
        return pactum
          .spec()
          .post('/rents')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({
            ...overlapDto,
            carId: '$S{carId}',
            customerId: '$S{customerId}',
          })
          .expectStatus(403);
      });
      const dtoSecond = {
        startDate: '2022-04-10T21:02:37.114Z',
        endDate: '2022-04-15T21:02:37.114Z',
        agentFullName: 'Reda Baka',
      };
      it('should create another rent with valid dates for the same car', () => {
        return pactum
          .spec()
          .post('/rents')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody({
            ...dtoSecond,
            carId: '$S{carId}',
            customerId: '$S{customerId}',
          })
          .expectStatus(201);
      });
    });
    describe('Edit rent', () => {
      const dto: EditRentDto = {
        agentFullName: 'Big Fudge',
      };
      it('should edit rent', () => {
        return pactum
          .spec()
          .patch('/rents/{id}')
          .withPathParams('id', '$S{rentId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.agentFullName);
      });
      const invalidDto: EditRentDto = {
        startDate: '2022-04-10T21:02:37.114Z',
      };
      it('should throw if new date overlaps another', () => {
        return pactum
          .spec()
          .patch('/rents/{id}')
          .withPathParams('id', '$S{rentId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(invalidDto)
          .expectStatus(403);
      });
    });
  });
});
