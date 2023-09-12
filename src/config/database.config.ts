import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class TypeOrmConfigService {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: process.env.DB_TYPE as never,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    };
  }
}