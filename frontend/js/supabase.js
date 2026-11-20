let cliente;

export async function obtenerSupabase() {
    if (cliente) return cliente;

    let configuracion;
    try {
        configuracion = await import("./supabase-config.js");
    } catch (error) {
        throw new Error("Falta frontend/js/supabase-config.js. Copiá supabase-config.example.js y completalo.");
    }

    const { supabaseUrl, supabasePublishableKey } = configuracion;
    if (!supabaseUrl || !supabasePublishableKey || supabaseUrl.includes("TU-PROYECTO") || supabasePublishableKey.includes("TU_CLAVE")) {
        throw new Error("Completá la URL y la clave publicable de Supabase en supabase-config.js.");
    }

    let createClient;
    try {
        ({ createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm"));
    } catch (error) {
        throw new Error("No se pudo cargar Supabase. Revisá tu conexión a internet y el acceso a cdn.jsdelivr.net.");
    }
    cliente = createClient(supabaseUrl, supabasePublishableKey);
    return cliente;
}
