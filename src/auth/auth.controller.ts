import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn() {
    return 'Success';
  }

  @Post('/signup/driver')
  async driverSignup() {
    return
  }

  @Post('/signup/customer')
  async customerSignup(
    @Body() createCustomerDto: CreateCustomerDto
  ) {
    await this.authService.signupCustomer(createCustomerDto)
    return
  }
}
