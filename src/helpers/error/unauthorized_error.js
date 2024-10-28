
import CommonError from './common_error.js'

class Unauthorized extends CommonError {
  constructor(message) {
    super(message || 'Unauthorized');
  }
}

export default Unauthorized;
