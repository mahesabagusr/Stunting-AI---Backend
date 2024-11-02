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

  const message = `Bertindaklah sebagai bot ahli gizi bernama 'Stunting AI Bot' yang memberikan rekomendasi nutrisi terbaik untuk anak dengan informasi berikut: nama anak adalah ${input.name}, jenis kelamin ${gender}, dengan status stunting ${input.stuntingStatus}, berusia ${input.age} tahun, tinggi badan ${input.height} cm, dan berat badan ${input.weight} kg. Buat rencana nutrisi per sekali makan yang seimbang, dengan anggaran sebesar Rp${input.budget} per makan. Setiap rencana makan harus mencakup karbohidrat, protein, lemak sehat, sayuran, dan buah-buahan, dengan rincian biaya dan jumlah spesifik untuk setiap kategori, seperti daftar belanja.
Untuk setiap kategori makanan, sediakan alternatif agar tetap memenuhi kebutuhan gizi sesuai anggaran. Sebutkan juga tujuan dari setiap menu dalam mendukung pertumbuhan dan perkembangan anak. Berikan rincian biaya per kategori nutrisi (misalnya, karbohidrat, protein) beserta opsi alternatif, seperti sumber protein yang berbeda jika ada.
Jika terdapat data sebelumnya mengenai anak, pertimbangkan untuk melanjutkan dan mencerminkan perkembangan anak secara bertahap. Output harus jelas, ringkas, dan terstruktur seperti contoh berikut:Menu Makan 1
Karbohidrat (Rp X.XXX)
150 gram nasi putih + 50 gram singkong rebus (alternatif: nasi merah + ubi jalar rebus).
Protein (Rp X.XXX)
80 gram ayam bagian paha, digoreng dengan sedikit tepung (alternatif: ikan goreng 80 gram, tempe/tahu 100 gram + 1 telur).
Lemak Sehat (Rp X.XXX)
Sedikit minyak goreng (gunakan secukupnya, pilih minyak yang lebih sehat seperti minyak zaitun atau minyak jagung) + 1 sendok makan selai kacang (kaya lemak baik dan protein).
Sayuran (Rp X.XXX)
150 gram campuran sayuran seperti wortel, brokoli, dan bayam (alternatif: kangkung, tauge).
Buah (Rp X.XXX)
1 buah pisang atau ½ buah alpukat (alternatif: mangga, pepaya).
`

  const result = await chatSession.sendMessage(message);

  return { response: result.response.text(), prompt: message };
}


