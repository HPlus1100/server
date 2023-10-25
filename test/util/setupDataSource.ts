import { newDb } from 'pg-mem';
import { DataSource } from 'typeorm';

const setupDataSource = async (): Promise<DataSource> => {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  db.public
    .registerFunction({
      name: 'current_database',
      implementation: () => 'taxiDB',
    })
    .registerFunction({
      name: 'version',
      implementation: () => '1.0',
    });

  const ds: DataSource = await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: [__dirname + '/../../src/**/*.entity{.ts,.js}'],
  });
  await ds.initialize();
  await ds.synchronize();

  return ds;
};

export { setupDataSource };
