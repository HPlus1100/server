import { registerAs } from '@nestjs/config';
import * as process from 'process';
import * as Joi from '@hapi/joi';

export default registerAs('app', () => {
  const loadedValues = {
    nodeEnv: process.env.NODE_ENV || 'development',
  };

  const schema = Joi.object({
    nodeEnv: Joi.string().valid('development', 'production').required(),
  });

  const { error } = schema.validate(loadedValues, { abortEarly: false });
  if (error) {
    throw error;
  }

  return loadedValues;
});
