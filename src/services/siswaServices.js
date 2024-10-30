import supabase from "../helpers/database/supabase.js"
import * as wrapper from "../helpers/utils/wrapper.js"
import { BadRequestError, ExpectationFailedError, NotFoundError, UnauthorizedError } from "../helpers/error/index.js";
import { calculateAge } from "../helpers/utils/calculateAge.js";
import { predictStuntingAi } from "../helpers/utils/svmPredictor.js";
import { run } from "../helpers/utils/geminiPredictor.js";

export default class Siswa {

  async addAndGenerateAi(payload) {
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
        birth_date: birthDate, gender: gender, status_stunting: stuntingStatus, user_id: dataUser.id
      })
      .select('id')

    if (err) {
      console.error(err)
    }

    const { response, prompt } = await run({ name, age, gender, height, weight, stuntingStatus, budget })

    const { error: err_prompt } = await supabase
      .from('prompt')
      .insert({ response: response, prompt: prompt, id_anak: id_anak[0].id });

    if (err_prompt) {
      wrapper.error(new ExpectationFailedError('Prompt Gagal'))
    }

    return wrapper.data({ prompt: prompt, response: response })

  }

  async updateAndGenerateAI(payload) {
    const { nik, name, height, weight, budget, ...dataUser } = payload

    const { data: id } = await supabase
      .from('users')
      .select('id')
      .eq('username', dataUser.username)

    if (!id) {
      return wrapper.error(new NotFoundError('ID Tidak ditemukan'))
    }

    const { data: rawDataAnak } = await supabase
      .from('data_anak')
      .select('*')
      .eq('nik', nik)

    const dataAnak = rawDataAnak.length > 0 ? rawDataAnak[0] : 0
    console.log(dataAnak)

    if (dataAnak === 0) {
      return wrapper.error(new NotFoundError('NIK belum terdaftar, harap daftar terlebih dahulu'))
    }

    if (dataAnak.name != name) {
      return wrapper.error(new NotFoundError('Nama Anak belum terdaftar, harap daftar terlebih dahulu'))
    }

    if (!dataAnak.id) {
      return wrapper.error(new NotFoundError('Daftar Anak Tidak ada, Mohon daftar kan anak terlebih dahulu'))
    }

    const age = calculateAge(dataAnak.birth_date)
    const stuntingStatus = await predictStuntingAi([age, dataAnak.gender, height, weight])

    const { data: historyChat } = await supabase
      .from('prompt')
      .select('prompt,response')
      .eq('id_anak', 10)

    const conversation = historyChat ? historyChat.flatMap(item => [
      { role: 'user', content: item.prompt },
      { role: 'model', content: item.response }
    ]) : [];

    const { response, prompt } = await run({ name, age: age, gender: dataAnak.gender, height, weight, stuntingStatus, budget }, conversation)

    const { error: err_prompt } = await supabase
      .from('prompt')
      .insert({ response: response, prompt: prompt, id_anak: dataAnak.id });

    if (err_prompt) {
      wrapper.error(new ExpectationFailedError('Prompt Gagal'))
    }

    return wrapper.data({ prompt: prompt, response: response })
  }
}