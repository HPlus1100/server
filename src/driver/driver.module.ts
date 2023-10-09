import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Driver } from './entity/driver.entity';
import { DriverManager } from './component/driver-manager.component';

@Module({
  imports: [TypeOrmModule.forFeature([User, Driver])],
  controllers: [DriverController],
  providers: [
    DriverService, 
    { provide: 'DriverManager', useClass: DriverManager }
  ]
})
export class DriverModule {}
