import type { SignOptions } from 'jsonwebtoken';

type ErrorType = string | APIErrorType;
type APIErrorType = {
  details: ErrorDetail[];
};
type ErrorDetail = {
  field?: string;
  message?: string;
};

type JWTSignOptions = Pick<SignOptions, 'expiresIn'>;

interface Payload {
  userId: number;
  email: string;
  tokenVersion: number;
}
