// import joi from 'joi';
import NotFoundError from '../error/not_found_error.js';
import * as wrapper from '../utils/wrapper.js';
// import joi from 'joi';

const isValidPayload = (payload, model) => {
  const { value, error } = model.validate(payload);

  if (error) {
    return wrapper.error(new NotFoundError(error));
  }

  return wrapper.data(value);

}

export default { isValidPayload };