import jwt from 'jsonwebtoken';
import fs from 'fs';
import { config } from '../infra/global_config.js'
import * as wrapper from '../helpers/utils/wrapper.js'
import Unauthorized from '../helpers/error/unauthorized_error.js';

const getKey = keyPath => fs.readFileSync(keyPath, 'utf8');
const privateKey = getKey(config.privateKey);

export const createToken = (data) => {
  const accessToken = jwt.sign(
    { id: data.id, name: data.name, email: data.email, signature: data.signature },
    privateKey,
    { algorithm: 'RS256', expiresIn: '1d' }
  );

  return { accessToken };
}

export const createRefreshToken = (data) => {

  const refreshToken = jwt.sign(
    { id: data.id, name: data.name, email: data.email, signature: data.signature },
    privateKey,
    { algorithm: 'RS256', expiresIn: '1d' }
  );

  return { refreshToken };
}

export const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const token = authorization && authorization.split(' ')[1];

    if (token == null) {
      return wrapper.error(new Unauthorized('Invalid token'))
    }

    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        return wrapper.error(new Unauthorized('Invalid Token', err));
      }

      req.email = decoded.email;
      next();
    })

  } catch (err) {
    return wrapper.error(new Unauthorized('Invalid Token', err))

  }

}
