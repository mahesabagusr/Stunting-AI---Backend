import supabase from "../helpers/database/supabase.js"
import * as wrapper from "../helpers/utils/wrapper.js"
import { BadRequestError, ExpectationFailedError, NotFoundError, UnauthorizedError } from "../helpers/error/index.js";
import { calculateAge } from "../helpers/utils/calculateAge.js";
import { predictStuntingAi } from "../helpers/utils/svmPredictor.js";
import { run } from "../helpers/utils/geminiPredictor.js";

export default class Siswa {

  async add(payload) {
    const { nik, name, height, weight, parent, birthDate, gender, budget, ...dataUser } = payload

    const { data: id } = await supabase
      .from('users')
      .select('id')
      .eq('username', dataUser.username)

    if (!id) {
      return wrapper.error(new NotFoundError('ID Tidak ditemukan'))
    }

    const { data: dataNik } = await supabase
      .from('data_anak')
      .select('nik')
      .eq('nik', nik)

    if (dataNik.length > 0) {
      return wrapper.error(new NotFoundError('NIK sudah terdaftar, silakan isi dengan NIK lain'))
    }

    const age = calculateAge(birthDate)

    const stuntingStatus = await predictStuntingAi([age, gender, height, weight])

    const { data: id_anak, error: err } = await supabase
      .from('data_anak')
      .insert({
        nik: nik, name: name, height: height, weight: weight, parent: parent,
        birth_date: birthDate, gender: gender, status_stunting: stuntingStatus
      })
      .select('id')

    if (err) {
      console.error(err)
    }

    const { response, prompt } = await run({ age, gender, height, weight, stuntingStatus, budget })

    const { error: err_prompt } = await supabase
      .from('prompt')
      .insert({ response: response, prompt: prompt, id_anak: id_anak[0].id });

    if (err_prompt) {
      wrapper.error(new ExpectationFailedError('Prompt Gagal'))
    }

    return wrapper.data({ prompt: prompt, response: response })

  }
}