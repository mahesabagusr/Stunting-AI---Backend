
import CommonError from './common_error.js'

class ForbiddenError extends CommonError {
  constructor(message) {
    super(message || 'Forbidden');
  }
}

export default ForbiddenError;
