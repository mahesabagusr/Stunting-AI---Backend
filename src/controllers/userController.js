import * as wrapper from '../helpers/utils/wrapper.js';
import {
  ERROR as httpError,
  SUCCESS as http,
} from '../helpers/http-status/status_code.js'
import validator from '../helpers/utils/validator.js'
import { registerModel, loginModel } from '../models/userModels.js'
import User from '../services/userServices.js';
const user = new User()

export const userRegister = async (req, res) => {
  const payload = { ...req.body }

  const validatePayload = await validator.isValidPayload(
    payload,
    registerModel
  )

  if (validatePayload.err) {
    return wrapper.response(res, 'fail', validatePayload, 'Invalid Payload', httpError.BAD_REQUEST);
  }

  const postRequest = (payload) => {
    if (!payload) {
      return payload
    }
    return user.register(payload.data)
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
      : wrapper.response(res, 'success', result, 'User Registration Successfull', http.OK);
  }

  response(await postRequest(validatePayload))

}

export const userLogin = async (req, res) => {
  const payload = { ...req.body }

  const validatePayload = await validator.isValidPayload(
    payload,
    loginModel
  )

  if (validatePayload.err) {
    return wrapper.response(res, 'fail', validatePayload, 'Invalid Payload', httpError.BAD_REQUEST);
  }

  const postRequest = async (payload) => {
    if (!payload) {
      return payload
    }
    return await user.login(payload.data)
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
      : wrapper.response(res, 'success', result, 'User Login Successfull', http.OK);
  }

  response(await postRequest(validatePayload))
}