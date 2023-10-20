import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import databaseConfig from '@/config/database.config';
import appConfig from '@/config/app.config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(databaseConfig.KEY)
    private readonly databaseConfiguration: ConfigType<typeof databaseConfig>,
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>) {
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.databaseConfiguration.host,
      port: this.databaseConfiguration.port,
      username: this.databaseConfiguration.username,
      password: this.databaseConfiguration.password,
      database: this.databaseConfiguration.database,
      synchronize: this.appConfiguration.nodeEnv === 'development',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    };
  }
}
