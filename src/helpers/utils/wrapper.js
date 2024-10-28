import {
  NotFoundError,
  InternalServerError,
  BadRequestError,
  ConflictError,
  ExpectationFailedError,
  ForbiddenError,
  GatewayTimeoutError,
  ServiceUnavailableError,
  UnauthorizedError,
} from '../error/index.js';
// Assuming your error definitions reside in '../error'

import { ERROR as httpError } from '../http-status/status_code.js'; // Assuming your HTTP status code constants are in '../http-status/status_code'

const response = (res, type, result, message = '', code = 200) => {
  let status = true;
  let data = result.data;


  if (type === 'fail') {
    status = false;
    data = '';
    message = result.err.message || message;
    code = checkErrorCode(result.err);
  }

  res.status(code).json({
    status: status,
    data,
    message,
    code,
  });
};

const checkErrorCode = (error) => {
  switch (error.constructor) {
    case BadRequestError:
      return httpError.BAD_REQUEST;
    case ConflictError:
      return httpError.CONFLICT;
    case ExpectationFailedError:
      return httpError.EXPECTATION_FAILED;
    case ForbiddenError:
      return httpError.FORBIDDEN;
    case GatewayTimeoutError:
      return httpError.GATEWAY_TIMEOUT;
    case InternalServerError:
      return httpError.INTERNAL_ERROR;
    // Capitalized for consistency
    case NotFoundError:
      return httpError.NOT_FOUND;
    case ServiceUnavailableError:
      return httpError.SERVICE_UNAVAILABLE;
    case UnauthorizedError:
      return httpError.UNAUTHORIZED;
    default:
      return httpError.INTERNAL_SERVER_ERROR; // Handle unexpected errors gracefully
  }
};

const data = (data) => ({ err: null, data }) // No response object needed for successful results

// const paginationData = (data, meta) => sendResponse(null, 'success', { data, meta });

const error = (err) => ({ err, data: null })

export {
  data,
  // paginationData,
  error,
  response,
  // paginationResponse
};