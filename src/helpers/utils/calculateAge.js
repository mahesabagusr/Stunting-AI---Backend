export function calculateAge(birthDateString) {
  let birthDate;

  // Check if the format is ISO (e.g., "yyyy-mm-ddTHH:MM:SS")
  if (birthDateString.includes("T")) {
    birthDate = new Date(birthDateString);
  } else {
    // Assume format "dd-mm-yyyy" and split accordingly
    const [day, month, year] = birthDateString.split('-').map(Number);
    birthDate = new Date(year, month - 1, day);
  }

  // Get the current date
  const today = new Date();

  // Calculate the age
  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust age if the birthday hasn't occurred yet this year
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age; // Return the age for further use if needed
}

