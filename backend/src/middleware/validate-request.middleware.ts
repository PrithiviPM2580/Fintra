import { validate, type Schemas } from 'zod-express-validator';
import logger from '@/lib/logger.lib.js';

type SchemaConfigType = Schemas<any, any, any, any>;

export const validateRequestMiddleware = (schemas: SchemaConfigType) => {
  return validate(schemas, ({ bodyError, paramsError, queryError }, res) => {
    const error = bodyError ?? paramsError ?? queryError;
    logger.error('Validation error: ', {
      label: 'validateRequestMiddleware',
      error,
    });

    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      error: error?.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
        code: issue.code,
        input: issue.input,
      })),
    });
  });
};
