import jwt from 'jsonwebtoken';
import fs from 'fs';
import { config } from '../infra/global_config.js'
import * as wrapper from '../helpers/utils/wrapper.js'
import Unauthorized from '../helpers/error/unauthorized_error.js';
import {
  ERROR as httpError,
  SUCCESS as http,
} from '../helpers/http-status/status_code.js'

const getKey = keyPath => fs.readFileSync(keyPath, 'utf8');
const privateKey = getKey(config.privateKey);

export const createToken = (data) => {
  const accessToken = jwt.sign(
    { username: data.username, email: data.email, signature: data.signature },
    privateKey,
    { algorithm: 'RS256', expiresIn: '10d' }
  );

  return { accessToken };
}

export const createRefreshToken = (data) => {

  const refreshToken = jwt.sign(
    { name: data.name, email: data.email, signature: data.signature },
    privateKey,
    { algorithm: 'RS256', expiresIn: '10d' }
  );

  return { refreshToken };
}

export const decodeToken = (data) => {
  const token = data.split(' ')[1];
  const decode = jwt.verify(token, privateKey);
  return decode

}

export const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const token = authorization && authorization.split(' ')[1];

    if (token == null) {
      const error = wrapper.error(new Unauthorized('Invalid token'))
      return wrapper.response(
        res,
        'fail',
        error,
        'Token Verification Failed',
        httpError.NOT_FOUND
      )
    }

    jwt.verify(token, privateKey, (err, decoded) => {

      if (err) {
        const error = wrapper.error(new Unauthorized('Invalid Token', err));
        return wrapper.response(
          res,
          'fail',
          error,
          'Token Verification Failed',
          httpError.NOT_FOUND
        )
      }

      req.email = decoded.email;
      next();
    })

  } catch (err) {
    const error = wrapper.error(new Unauthorized('Invalid Token', err))
    return wrapper.response(
      res,
      'fail',
      error,
      'Token Verification Failed',
      httpError.NOT_FOUND
    )
  }
}
