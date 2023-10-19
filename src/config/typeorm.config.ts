import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import databaseConfig from '@/config/database.config';
import appConfig from '@/config/app.config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
              @Inject(databaseConfig.KEY)
              private readonly databaseConfiguration: ConfigType<typeof databaseConfig>,

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.databaseConfiguration.host,
      port: this.databaseConfiguration.port,
      username: this.databaseConfiguration.username,
      password: this.databaseConfiguration.password,
      database: this.databaseConfiguration.database,
      synchronize:
        this.configService.get<string>('NODE_ENV') === 'development'
          ? true
          : false,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    };
  }
}
