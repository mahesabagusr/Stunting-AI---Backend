import { createClient } from "@supabase/supabase-js";
import { config } from "../../infra/global_config.js"

const supabaseUrl = config.supabaseConfig.url
const supabaseKey = config.supabaseConfig.key

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;