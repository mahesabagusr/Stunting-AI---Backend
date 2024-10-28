import joi from 'joi';
const regex = /^(?=.*[a-z])(?=.*[A-Z])/

export const registerModel = joi.object().keys({
  username: joi.string().required().messages({
    'string.empty': 'Harap isi Username'
  }),
  fullName: joi.string().required().messages({
    'string.empty': 'Harap isi Nama Lengkap'
  }),
  email: joi.string().email().required().messages({
    'string.empty': 'Harap isi Email',
  }),
  password: joi.string().min(6).regex(regex).required().messages({
    'string.empty': 'Harap isi Password',
    'string.min': 'Harap isi password minimal 6 karakter ',
    'string.pattern.base': 'Harap Minimal satu huruf besar'
  }),
  role: joi.string().required().messages({
    'string.empty': 'Harap isi role',
  }),
});