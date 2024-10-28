// import joi from 'joi';
import NotFoundError from '../error/not_found_error.js';
import * as wrapper from '../utils/wrapper.js';
import joi from 'joi';

const isValidPayload = async (payload, model) => {
  const { value, error } = model.validate(payload, { abortEarly: false });

  if (error) {
    const errorMessage = error.message.replace("ValidationError: ", "") || "Invalid input data.";
    return wrapper.error(new NotFoundError(errorMessage));
  }

  return Promise.resolve(wrapper.data(value));

}

export default { isValidPayload };