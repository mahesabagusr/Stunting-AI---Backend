
import CommonError from './common_error.js'

class GatewayTimeoutError extends CommonError {
  constructor(message) {
    super(message || 'Gateway Timeout');
  }
}

export default GatewayTimeoutError;
