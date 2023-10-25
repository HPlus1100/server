import { registerAs } from '@nestjs/config';
import * as Joi from '@hapi/joi';

export default registerAs('database', async () => {
  const loadedValues = {
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'taxiDB',
  };

  const baseSchema = Joi.object({
    host: Joi.alternatives([
      process.env.NODE_ENV === 'production'
        ? Joi.string().regex(
            /^[a-z0-9-]+\.([a-z0-9-]+)\.(ap-northeast-2)\.rds\.amazonaws\.com$/,
          )
        : Joi.valid('localhost'),
    ]).required(),
    port: Joi.number().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    database: Joi.string().required(),
  });

  try {
    if (process.env.NODE_ENV === 'production') {
      const productionSchema = baseSchema.keys({
        host: Joi.invalid('localhost'),
        username: Joi.invalid('postgres'),
        password: Joi.invalid('postgres'),
      });

      await productionSchema.validateAsync(loadedValues, { abortEarly: false });
    }

    await baseSchema.validateAsync(loadedValues, { abortEarly: false });
  } catch (e) {
    throw new Error(e);
  }

  return loadedValues;
});
