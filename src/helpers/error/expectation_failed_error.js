
import CommonError from './common_error.js'

class ExpectationFailedError extends CommonError {
  constructor(message) {
    super(message || 'Expectation Failed');
  }
}

export default ExpectationFailedError;
