import supabase from "../helpers/database/supabase.js"
import * as wrapper from "../helpers/utils/wrapper.js"
import { BadRequestError, ExpectationFailedError, NotFoundError, UnauthorizedError } from "../helpers/error/index.js";
import { calculateAge } from "../helpers/utils/calculateAge.js";
import { predictStuntingAi } from "../helpers/utils/svmPredictor.js";
import { run } from "../helpers/utils/geminiPredictor.js";

export default class Siswa {

  async addAndGenerateAi(payload) {
    const { nik, name, height, weight, parent, birthDate, gender, budget, ...dataUser } = payload

    const { data: user } = await supabase
      .from('users')
      .select('id, signature')
      .eq('username', dataUser.username)
      .eq('signature', dataUser.signature)

    if (!user[0]) {
      return wrapper.error(new UnauthorizedError('Token Tidak Valid, Akun telah logout'))
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
        birth_date: birthDate, gender: gender, status_stunting: stuntingStatus, user_id: id[0].id,
      })
      .select('id')

    if (err) {
      return wrapper.error(new NotFoundError(err))
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

    const { data: user } = await supabase
      .from('users')
      .select('id, signature')
      .eq('username', dataUser.username)
      .eq('signature', dataUser.signature)

    if (!user[0]) {
      return wrapper.error(new UnauthorizedError('Token Tidak Valid, Akun telah logout'))
    }

    const { data: rawDataAnak } = await supabase
      .from('data_anak')
      .select('*')
      .eq('nik', nik)

    const dataAnak = rawDataAnak.length > 0 ? rawDataAnak[0] : 0

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
      .eq('id_anak', dataAnak.id)

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

    return wrapper.data({ status: stuntingStatus, prompt: prompt, response: response })
  }

  async getAllHistoryByUserId(payload) {
    const { username } = payload

    const { data: id } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)

    if (!id) {
      return wrapper.error(new NotFoundError('ID Tidak ditemukan'))
    }

    console.log(id[0].id)

    const { data: historyChat, error } = await supabase
      .from('prompt')
      .select(`
      prompt, 
      response, 
      id, 
      id_anak(id,user_id)
    `)
      .eq('id_anak.user_id', id[0].id);

    // console.log(historyChat)

    if (!historyChat) {
      return wrapper.error(new NotFoundError('History Tidak Ada'))
    }

    const historyChatMap = await historyChat.map(item => ({
      chat_id: item.id,
      prompt: item.prompt,
      response: item.response,
      id_anak: item.id_anak.id,
      user_id: item.id_anak.user_id,
    }))

    return wrapper.data(historyChatMap)

  }

  async StuntingCount(payload) {
    try {
      const { username, signature } = payload

      const { data: id } = await supabase
        .from('users')
        .select('id')
        .eq('username', username)
        .eq('signature', signature)

      console.log(id)

      if (!id) {
        return wrapper.error(new NotFoundError('ID Tidak ditemukan'))
      }

      // Fetch data for 'Stunted' status
      const { count: notStunted, error: notStuntingError } = await supabase
        .from('data_anak')
        .select('status_stunting', { count: 'exact', head: true })
        .eq('user_id', id[0].id)
        .eq('status_stunting', "Not Stunted");

      if (notStuntingError) {
        wrapper.error(new ExpectationFailedError("Error fetching stunted data:", notStuntingError));
      }

      const { count: stunted, error: stuntingError } = await supabase
        .from('data_anak')
        .select('status_stunting', { count: 'exact', head: true })
        .eq('user_id', id[0].id)
        .eq('status_stunting', "Stunted")

      if (stuntingError) {
        wrapper.error(new ExpectationFailedError("Error fetching stunted data:", stuntingError));
      }

      const { count: severelyStunted, error: SeverelystuntingError } = await supabase
        .from('data_anak')
        .select('status_stunting', { count: 'exact', head: true })
        .eq('user_id', id[0].id)
        .eq('status_stunting', "severely Stunted")

      if (SeverelystuntingError) {
        wrapper.error(new ExpectationFailedError("Error fetching stunted data:", stuntingError));
      }

      return wrapper.data({ notStunted: notStunted, stunted: stunted, severelyStunted: severelyStunted })

    } catch (err) {
      return wrapper.error(new BadRequestError(err.message))
    }
  }
}
