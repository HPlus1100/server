import { newDb } from "pg-mem";
import { Customer } from "src/customer/entity/customer.entity";
import { Driver } from "src/driver/entity/driver.entity";
import { User } from "src/user/entity/user.entity";
import { DataSource } from "typeorm";

export const setupDataSource = async () => {
    const db = newDb({
        autoCreateForeignKeyIndices: true,
      });
    
      db.public.registerFunction({
        name: 'current_database',
        implementation: () => 'test',
      });
    
      db.public.registerFunction({
        name: 'version',
        implementation: () => 'test',
      });
    
      const dataSource: DataSource = await db.adapters.createTypeormDataSource({
        type: 'postgres',
        entities: [Driver, User, Customer],  
      });
    
      await dataSource.initialize()
      await dataSource.synchronize();
      
      return dataSource
}