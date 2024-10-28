
import CommonError from './common_error.js';

class ConflictError extends CommonError {
  constructor(message) {
    super(message || 'Conflict');
  }
}

export default ConflictError;
