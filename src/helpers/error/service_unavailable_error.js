
import CommonError from './common_error.js'

class ServiceUnavailableError extends CommonError {
  constructor(message) {
    super(message || 'Service Unavailable');
  }
}

export default ServiceUnavailableError;
