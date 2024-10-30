import joi from 'joi';

export const siswaAddModel = joi.object({
  nik: joi.number().integer().min(1).max(999999999999).required()
    .messages({ "number.base": "NIK harus berupa angka", "number.integer": "NIK harus berupa bilangan bulat", "any.required": "NIK wajib diisi" }),
  name: joi.string().max(128).required()
    .messages({ "string.base": "Nama harus berupa teks", "string.max": "Nama tidak boleh lebih dari 128 karakter", "any.required": "Nama wajib diisi" }),
  height: joi.number().integer().min(1).max(999).required()
    .messages({ "number.base": "Tinggi harus berupa angka", "number.integer": "Tinggi harus berupa bilangan bulat", "any.required": "Tinggi wajib diisi" }),
  weight: joi.number().integer().min(1).max(999).required()
    .messages({ "number.base": "Berat harus berupa angka", "number.integer": "Berat harus berupa bilangan bulat", "any.required": "Berat wajib diisi" }),
  parent: joi.string().max(128).required()
    .messages({ "string.base": "Orang Tua harus berupa teks", "string.max": "Orang Tua tidak boleh lebih dari 128 karakter", 'string.empty': 'Nama Orang tua wajib di isi' }),
  username: joi.string().required().messages({
    'string.empty': 'Harap isi Username'
  }),
  signature: joi.string().required().messages({
    'string.empty': 'Harap isi Nama Lengkap'
  }),
  email: joi.string().email().required().messages({
    'string.email': 'Email anda harus valid.',
    'any.required': 'harap isi email anda.'
  }),
  gender: joi.boolean().required().messages({
    'any.required': 'Jenis kelamin wajib diisi'
  }),
  birthDate: joi.string().pattern(/^([0-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/).required().messages({
    'string.pattern.base': 'Tanggal lahir harus dalam format DD-MM-YYYY',
    'any.required': 'Tanggal lahir wajib diisi'
  }),
  budget: joi.number().integer().min(1).max(999999999999).required()
    .messages({ "number.base": "budget harus berupa angka", "number.integer": "budget harus berupa bilangan bulat", "any.required": "budget wajib diisi" }),
});

export const siswaUpdateModel = joi.object({
  nik: joi.number().integer().min(1).max(999999999999).required()
    .messages({ "number.base": "NIK harus berupa angka", "number.integer": "NIK harus berupa bilangan bulat", "any.required": "NIK wajib diisi" }),
  name: joi.string().max(128).required()
    .messages({ "string.base": "Nama harus berupa teks", "string.max": "Nama tidak boleh lebih dari 128 karakter", "any.required": "Nama wajib diisi" }),
  height: joi.number().integer().min(1).max(999).required()
    .messages({ "number.base": "Tinggi harus berupa angka", "number.integer": "Tinggi harus berupa bilangan bulat", "any.required": "Tinggi wajib diisi" }),
  weight: joi.number().integer().min(1).max(999).required()
    .messages({ "number.base": "Berat harus berupa angka", "number.integer": "Berat harus berupa bilangan bulat", "any.required": "Berat wajib diisi" }),
  username: joi.string().required().messages({
    'string.empty': 'Harap isi Username'
  }),
  signature: joi.string().required().messages({
    'string.empty': 'Harap isi Nama Lengkap'
  }),
  email: joi.string().email().required().messages({
    'string.email': 'Email anda harus valid.',
    'any.required': 'harap isi email anda.'
  }),
  budget: joi.number().integer().min(1).max(999999999999).required()
    .messages({ "number.base": "budget harus berupa angka", "number.integer": "budget harus berupa bilangan bulat", "any.required": "budget wajib diisi" }),
});