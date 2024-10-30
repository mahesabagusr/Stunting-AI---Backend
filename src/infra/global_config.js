import dotnev from 'dotenv';

dotnev.config({ path: '.env' })

export const config = {
  port: process.env.EXPRESS_PORT,
  publicKey: process.env.PUBLIC_KEY_PATH,
  privateKey: process.env.PRIVATE_KEY_PATH,
  geminiApiKey: process.env.GEMINI_API_KEY,
  supabaseConfig: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY
  },
  nodemailerConfig: {
    email: process.env.NODEMAILER_EMAIL,
    password: process.env.NODEMAILER_PASSWORD
  }
};

