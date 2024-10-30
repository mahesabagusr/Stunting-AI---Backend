import * as wrapper from '../helpers/utils/wrapper.js';
import {
  ERROR as httpError,
  SUCCESS as http,
} from '../helpers/http-status/status_code.js'
import validator from '../helpers/utils/validator.js'
import { siswaModel } from '../models/siswaModel.js'
import Siswa from '../services/siswaServices.js'
import { decodeToken } from '../middlewares/jwt.js';

const siswa = new Siswa();

export const addSiswa = async (req, res) => {
  const { authorization } = req.headers

  const { username, email, signature } = decodeToken(authorization)

  const payload = { ...req.body, username, email, signature }

  const validatePayload = await validator.isValidPayload(
    payload,
    siswaModel
  )

  if (validatePayload.err) {
    return wrapper.response(res, 'fail', validatePayload, 'Invalid Payload', httpError.BAD_REQUEST);
  }

  const postRequest = (payload) => {
    if (!payload) {
      return payload
    }
    return siswa.add(payload.data)
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