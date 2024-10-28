import * as wrapper from '../helpers/utils/wrapper.js';
import {
  ERROR as httpError,
  SUCCESS as http,
} from '../helpers/http-status/status_code.js'
import validator from '../helpers/utils/validator.js'
import { registerModel } from '../models/userModels.js'
import { userRegisterService } from '../services/userServices.js';

export const userRegister = async (req, res) => {
  const payload = { ...req.body }

  const validatePayload = validator.isValidPayload(
    payload,
    registerModel
  )

  const postRequest = (payload) => {
    if (!payload) {
      return payload
    }
    return userRegisterService(payload.data)
  }

  const response = (result) => {
    result.err
      ? wrapper.response(
        res,
        'fail',
        result,
        'User Update Failed',
        httpError.NOT_FOUND
      )
      : wrapper.response(res, 'success', result, 'User Update Successfull', http.OK);
  }

  response(await postRequest(validatePayload))

}