
import CommonError from './common_error.js'

class NotFoundError extends CommonError {
  constructor(message) {
    super(message || 'Not Found');
  }
}

export default NotFoundError;
