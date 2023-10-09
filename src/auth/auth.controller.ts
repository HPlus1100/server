import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { CreateDriverDto } from './dto/request/create-driver.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup/driver')
  async driverSignup(
    @Body() createDriverDto: CreateDriverDto
  ): Promise<void> {
    return await this.authService.signupDriver(createDriverDto)
  }

  @Post('/signup/customer')
  async customerSignup(
    @Body() createCustomerDto: CreateCustomerDto
  ): Promise<void> {
    return await this.authService.signupCustomer(createCustomerDto)
  }
}
