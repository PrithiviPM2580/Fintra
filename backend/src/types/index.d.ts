type ErrorType = string | APIErrorType;
type APIErrorType = {
  details: ErrorDetail[];
};
type ErrorDetail = {
  field?: string;
  message?: string;
};
