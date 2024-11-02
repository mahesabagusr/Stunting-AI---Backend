export const formatOutputChat = (payload) => {
  const output = payload

  // Memisahkan string berdasarkan kata kunci
  const [deskripsiRaw, menu1Raw, menu2Raw, menu3Raw, catatanRaw] = output.split(/\*\*Menu Makan 1|Menu Makan 2|Menu Makan 3|Catatan Penting:\*\*/);

  // console.log(menu1)

  // Menambahkan kembali label untuk setiap bagian yang dipisah
  const deskripsi = deskripsiRaw.trim();
  const menu1 = "**Menu Makan 1:**" + menu1Raw.trim();
  const menu2 = "**Menu Makan 2:**" + menu2Raw.trim();
  const menu3 = "**Menu Makan 3:**" + menu3Raw.trim();
  const catatan = "**Catatan:**" + catatanRaw.trim();
  // console.log(catatanText)
  // console.log(catatan)

  return { deskripsi, menu1, menu2, menu3, catatan };
}

// const output = `
// Halo! Saya Stunting AI Bot.  Berikut rencana nutrisi untuk Udin Gans, perempuan berusia 11 tahun, tinggi 148 cm, berat 48 kg, dan berstatus *tidak* stunting, dengan anggaran Rp15.000 per makan.  Rencana ini fokus pada variasi dan keseimbangan nutrisi untuk mendukung pertumbuhan dan perkembangannya yang optimal.

// **Menu Makan 1:  Nasi Ayam Sayur & Buah**

// **Tujuan:**  Memberikan energi, protein untuk pertumbuhan, dan vitamin & mineral untuk kesehatan secara keseluruhan.

// * **Karbohidrat (Rp 2.000):** 100 gram nasi merah (lebih tinggi serat) + 50 gram singkong rebus (alternatif: 150 gram nasi putih, 1 buah pisang ukuran sedang).
// * **Protein (Rp 6.000):** 70 gram ayam dada (potong dadu, direbus/dibakar) (alternatif: 1 butir telur + 100 gram tempe, 80 gram ikan tongkol). *Protein penting untuk pertumbuhan otot dan jaringan tubuh.*
// * **Lemak Sehat (Rp 1.000):**  1 sendok makan minyak zaitun (digunakan saat memasak ayam) + 1 sendok makan kacang tanah sangrai (alternatif: 1/2 alpukat, biji bunga matahari). *Lemak sehat penting untuk penyerapan vitamin dan fungsi otak.*
// * **Sayuran (Rp 3.000):** 100 gram bayam + 50 gram wortel (tumis dengan sedikit minyak zaitun) (alternatif: 150 gram kangkung,  tumis sawi). *Sayuran kaya akan vitamin dan mineral penting.*
// * **Buah (Rp 3.000):** 1 buah apel ukuran sedang (alternatif:  1 buah jeruk, ½ mangga). *Buah menyediakan vitamin dan antioksidan.*

// **Menu Makan 2:  Mie Goreng Sayur & Buah**

// **Tujuan:**  Menyediakan energi dengan karbohidrat, protein untuk pertumbuhan dan perbaikan sel, serta serat dari sayuran.

// * **Karbohidrat (Rp 2.500):** 100 gram mie (pilih mie gandum utuh jika memungkinkan) (alternatif:  bihun, kwetiau).
// * **Protein (Rp 5.000):** 60 gram ayam cincang (digoreng dengan sedikit minyak) (alternatif:  telur 2 butir, 100 gram tahu/tempe).
// * **Lemak Sehat (Rp 1.000):** Sedikit minyak zaitun (digunakan saat menumis) (alternatif:  sedikit margarin rendah lemak).
// * **Sayuran (Rp 3.000):** 100 gram campuran sayuran (wortel, kol, sawi) (alternatif:  kangkung, tauge, bayam).
// * **Buah (Rp 3.500):** 1 buah pisang (alternatif:  ½ mangga, 1 buah jeruk).

// **Menu Makan 3:  Sandwich Telur & Sayur + Buah**

// **Tujuan:**  Memenuhi kebutuhan protein, karbohidrat, vitamin, dan mineral secara praktis.

// * **Karbohidrat (Rp 2.000):** 2 lembar roti gandum (alternatif: roti tawar).
// * **Protein (Rp 4.000):** 1 butir telur dadar + 1 lembar keju (alternatif:  2 lembar sosis ayam rendah lemak, selai kacang).
// * **Lemak Sehat (Rp 1.000):**  Sedikit margarin rendah lemak (olesan tipis) (alternatif:  mayones secukupnya).
// * **Sayuran (Rp 3.000):**  Selada, tomat, mentimun (alternatif:  bayam, kangkung).
// * **Buah (Rp 5.000):**  1 buah jeruk + 1 buah apel kecil (alternatif: pisang, mangga).

// **Catatan:**

// * Harga bahan makanan dapat bervariasi tergantung lokasi dan pasar. Angka-angka di atas adalah perkiraan.
// * Pastikan Udin minum cukup air putih.
// * Variasikan menu makanan untuk memastikan asupan nutrisi yang seimbang.
// * Pantau terus pertumbuhan dan perkembangan Udin.  Jika ada kekhawatiran, konsultasikan dengan dokter atau ahli gizi.
// *  Meskipun Udin sudah tidak mengalami stunting, penting untuk mempertahankan pola makan yang sehat dan bergizi untuk mendukung perkembangan optimalnya.

// Semoga rencana ini bermanfaat!
// `;

// // Memisahkan string berdasarkan kata kunci
// const [deskripsi, menu1, menu2, menu3, catatan] = output.split(/\*\*Menu Makan|Catatan:\*\*/);

// // Menambahkan kembali label untuk setiap bagian yang dipisah
// const deskripsiText = deskripsi.trim();
// const menu1Text = "**Menu Makan 1:**" + menu1.trim();
// const menu2Text = "**Menu Makan 2:**" + menu2.trim();
// const menu3Text = "**Menu Makan 3:**" + menu3.trim();
// const catatanText = "**Catatan:**" + catatan.trim();

// // console.log("Deskripsi:", deskripsiText);
// // console.log( menu1Text);
// console.log("Menu Makan 2:", menu2Text);
// // console.log("Menu Makan 3:", menu3Text);
// // console.log("Catatan:", catatanText);
