import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

let cliente;

export async function obtenerSupabase() {
    if (cliente) {
        return cliente;
    }

    let configuracion;
    try {
        configuracion = await import("./supabase-config.js");
    } catch (error) {
        throw new Error("Falta frontend/java/supabase-config.js. Copiá supabase-config.example.js y completalo.");
    }

    const { supabaseUrl, supabasePublishableKey } = configuracion;
    if (!supabaseUrl || !supabasePublishableKey || supabaseUrl.includes("TU-PROYECTO") || supabasePublishableKey.includes("TU_CLAVE")) {
        throw new Error("Completá la URL y la clave publicable de Supabase en supabase-config.js.");
    }

    cliente = createClient(supabaseUrl, supabasePublishableKey);
    return cliente;
}
