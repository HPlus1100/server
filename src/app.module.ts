import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckController } from './health-check/health-check.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { TodosEntity } from './todo/todo.entity';


@Module({
  imports: [
    TerminusModule,
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([TodosEntity]),
  ],
  controllers: [AppController, HealthCheckController, TodoController],
  providers: [AppService, TodoService],
})
export class AppModule {}
