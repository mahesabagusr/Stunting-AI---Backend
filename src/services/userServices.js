import supabase from "../helpers/database/supabase.js"
import * as wrapper from "../helpers/utils/wrapper.js"
import { BadRequestError, UnauthorizedError } from "../helpers/error/index.js";
import bcrypt from "bcrypt"
import { nanoid } from "nanoid"

export const userRegisterService = async (payload) => {
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