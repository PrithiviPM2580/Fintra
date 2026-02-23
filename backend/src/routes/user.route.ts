import {
  changeUserPasswordController,
  getUserProfileController,
  updateUserProfileController,
} from '@/controllers/user.controller.js';
import { asyncHandler } from '@/middleware/async-handler.middleware.js';
import authenticateMiddleware from '@/middleware/authenticate.middleware.js';
import { apiRateLimiter } from '@/middleware/rate-limiting.middleware.js';
import { validateRequestMiddleware } from '@/middleware/validate-request.middleware.js';
import {
  changeUserPasswordSchema,
  updateUserProfileParamsSchema,
  updateUserProfileSchema,
} from '@/validation/user.validation.js';
import { Router } from 'express';

const userRouter: Router = Router();

userRouter.get(
  '/',
  apiRateLimiter,
  authenticateMiddleware,
  asyncHandler(getUserProfileController),
);

userRouter.put(
  '/change-password',
  apiRateLimiter,
  authenticateMiddleware,
  validateRequestMiddleware({ body: changeUserPasswordSchema }),
  asyncHandler(changeUserPasswordController),
);

userRouter.put(
  '/:id',
  apiRateLimiter,
  authenticateMiddleware,
  validateRequestMiddleware({
    body: updateUserProfileSchema,
    params: updateUserProfileParamsSchema,
  }),
  asyncHandler(updateUserProfileController),
);

export default userRouter;
