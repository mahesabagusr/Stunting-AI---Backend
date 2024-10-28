
import CommonError from './common_error.js'

class InternalServerError extends CommonError {
  constructor(message) {
    super(message || 'Internal Server Error');
  }
}

export default InternalServerError;
