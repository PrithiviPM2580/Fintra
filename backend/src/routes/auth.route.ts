import { asyncHandler } from '@/middleware/async-handler.middleware.js';
import { authRateLimiter } from '@/middleware/rate-limiting.middleware.js';
import { validateRequestMiddleware } from '@/middleware/validate-request.middleware.js';
import { signUpSchema } from '@/validation/auth.validation.js';
import { Router } from 'express';
import { signUpController } from '@/controllers/auth.controller.js';

const authRouter: Router = Router();

authRouter.post(
  '/sign-up',
  authRateLimiter,
  validateRequestMiddleware({ body: signUpSchema }),
  asyncHandler(signUpController),
);

export default authRouter;
