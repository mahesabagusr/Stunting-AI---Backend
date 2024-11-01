import * as wrapper from '../helpers/utils/wrapper.js';
import {
  ERROR as httpError,
  SUCCESS as http,
} from '../helpers/http-status/status_code.js'
import validator from '../helpers/utils/validator.js'
import { siswaAddModel, siswaUpdateModel } from '../models/siswaModel.js'
import Siswa from '../services/siswaServices.js'
import { decodeToken } from '../middlewares/jwt.js';

const siswa = new Siswa();

export const addSiswa = async (req, res) => {
  const { authorization } = req.headers

  const { username, email, signature } = decodeToken(authorization)

  const payload = { ...req.body, username, email, signature }

  const validatePayload = await validator.isValidPayload(
    payload,
    siswaAddModel
  )

  if (validatePayload.err) {
    return wrapper.response(res, 'fail', validatePayload, 'Invalid Payload', httpError.BAD_REQUEST);
  }

  const postRequest = (payload) => {
    if (!payload) {
      return payload
    }
    return siswa.addAndGenerateAi(payload.data)
  }

  const response = (result) => {
    result.err
      ? wrapper.response(
        res,
        'fail',
        result,
        'Add Siswa Failed',
        httpError.NOT_FOUND
      )
      : wrapper.response(res, 'success', result, 'Siswa Added Successfull', http.OK);
  }

  response(await postRequest(validatePayload))
}

export const updateSiswa = async (req, res) => {
  const { authorization } = req.headers

  const { username, email, signature } = decodeToken(authorization)

  const payload = { ...req.body, username, email, signature }

  const validatePayload = await validator.isValidPayload(
    payload,
    siswaUpdateModel
  )

  if (validatePayload.err) {
    return wrapper.response(res, 'fail', validatePayload, 'Invalid Payload', httpError.BAD_REQUEST);
  }

  const postRequest = (payload) => {
    if (!payload) {
      return payload
    }
    return siswa.updateAndGenerateAI(payload.data)
  }

  const response = (result) => {
    result.err
      ? wrapper.response(
        res,
        'fail',
        result,
        'Add Siswa Failed',
        httpError.NOT_FOUND
      )
      : wrapper.response(res, 'success', result, 'Siswa Added Successfull', http.OK);
  }

  response(await postRequest(validatePayload))
}

export const getAllHistorySiswa = async (req, res) => {
  const { authorization } = req.headers

  const { username, email, signature } = decodeToken(authorization)

  const payload = { username, email, signature }

  const postRequest = (payload) => {
    if (!payload) {
      return payload
    }
    return siswa.getAllHistoryByUserId(payload)
  }

  const response = (result) => {
    result.err
      ? wrapper.response(
        res,
        'fail',
        result,
        'Get History Failed',
        httpError.NOT_FOUND
      )
      : wrapper.response(res, 'success', result, 'Get History Successfull', http.OK);
  }

  response(await postRequest(payload))
}

export const getStuntingCount = async (req, res) => {
  const { authorization } = req.headers

  const { username, signature } = decodeToken(authorization)

  const payload = { username, signature }

  const postRequest = (payload) => {
    if (!payload) {
      return payload
    }
    return siswa.StuntingCount(payload)
  }

  const response = (result) => {
    result.err
      ? wrapper.response(
        res,
        'fail',
        result,
        'Add Siswa Failed',
        httpError.NOT_FOUND
      )
      : wrapper.response(res, 'success', result, 'Siswa Added Successfull', http.OK);
  }

  response(await postRequest(payload))
}