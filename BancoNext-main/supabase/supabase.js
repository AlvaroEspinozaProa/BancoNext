import { createClient } from
"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// Datos de tu proyecto
const supabaseUrl = "https://rmmajsdiwtyevmumekrr.supabase.co";
const supabaseAnonKey = "sb_publishable_vH6sL0lP3-EOSQrecuhU3A_cjc9egkt";

// Crear conexión
export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);