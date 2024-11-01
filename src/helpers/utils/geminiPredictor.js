import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

import { config } from "../../infra/global_config.js";

const apiKey = config.geminiApiKey;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-002",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function run({ ...input }, history = []) {

  const formattedHistory = history.map(item => ({
    role: item.role,
    parts: [{ text: item.content }]
  }));


  const chatSession = model.startChat({
    generationConfig,
    history: formattedHistory
  });

  let gender;

  gender = input.gender ? "Perempuan" : "Laki-laki";

  const message = `Jadilah bot ahli gizi dengan nama "Stunting AI Bot" yang memberikan rekomendasi nutrisi terbaik untuk 
  anak dengan informasi berikut: saya memiliki anak dengan nama ${input.name} berjenis kelamin ${gender}, berstatus ${input.stuntingStatus}, 
  berusia ${input.age} tahun, dengan tinggi badan ${input.height} cm, dan berat badan ${input.weight} kg. Buatlah 
  rencana nutrisi per sekali makan yang seimbang, dengan anggaran sebesar Rp${input.budget} per makan. Rencana 
  ini harus mencakup asupan protein, karbohidrat, lemak sehat, vitamin, dan mineral yang diperlukan untuk sekali makan,
  menggunakan bahan makanan yang mudah diakses dan terjangkau. Sertakan juga alternatif bahan makanan untuk setiap kategori
  agar tetap sesuai kebutuhan gizi dalam anggaran yang tersedia. jika ada, gunakan response kamu sebelumnya sebagai referensi perkembangan anak ke depan `

  const result = await chatSession.sendMessage(message);

  return { response: result.response.text(), prompt: message };
}


