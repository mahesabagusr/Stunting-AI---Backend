
import CommonError from './common_error.js';

class BadRequestError extends CommonError {
  constructor(message) {
    super(message || 'Bad Request');
  }
}

export default BadRequestError;
