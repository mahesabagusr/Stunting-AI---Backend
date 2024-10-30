import supabase from "../helpers/database/supabase.js"
import * as wrapper from "../helpers/utils/wrapper.js"
import { BadRequestError, NotFoundError, UnauthorizedError } from "../helpers/error/index.js";
import bcrypt from "bcrypt"
import { nanoid } from "nanoid"
import { createToken } from "../middlewares/jwt.js"


export default class User {

  async register(payload) {
    try {

      const { email, username, password, fullName, role } = payload;

      const { data: existingEmail } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)

      if (existingEmail.length > 0) {
        return wrapper.error(new UnauthorizedError('email already exists'))
      }

      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('username', username);

      if (existingUser.length > 0) {
        return wrapper.error(new UnauthorizedError('username already exists'))
      }

      const signature = nanoid(4);
      const hashPassword = await bcrypt.hash(password, 10);

      const { error: err } = await supabase
        .from('users')
        .insert({
          username: username, email: email, password: hashPassword, full_name: fullName, role: role, signature: signature
        })
        .select()

      if (err) {
        return wrapper.error(new BadRequestError('Register failed', err))
      }

      return wrapper.data("register berhasil")

    } catch (err) {
      return wrapper.error(new BadRequestError(`${err.message}`));
    }
  }

  async login(payload) {
    try {
      const { username, email, password } = payload

      const { data: user } = await supabase
        .from('users')
        .select('*')
        .or(`username.eq.${username}, email.eq.${email}`)

      if (!user || user.length === 0) {
        return wrapper.error(new NotFoundError(`Silakan Masukkan Email atau username yang benar`))
      }

      const isValid = await bcrypt.compare(password, user[0].password)


      if (!isValid) {
        return wrapper.error(new BadRequestError(`Harap Masukkan Password yang benar`))
      }

      const { accessToken } = await createToken(user[0])

      return wrapper.data({ token: accessToken })

    } catch (err) {

    }

  }
}
