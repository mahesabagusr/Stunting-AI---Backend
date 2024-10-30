export function calculateAge(birthDateString) {
  // Memisahkan hari, bulan, dan tahun dari string dengan format dd-mm-yyyy
  const [day, month, year] = birthDateString.split('-').map(Number);

  // Membuat objek Date dengan urutan tahun, bulan, hari
  const birthDate = new Date(year, month - 1, day);

  // Mendapatkan tanggal saat ini
  const today = new Date();

  // Menghitung selisih tahun
  let age = today.getFullYear() - birthDate.getFullYear();

  // Menyesuaikan umur jika belum melewati hari ulang tahunnya tahun ini
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}