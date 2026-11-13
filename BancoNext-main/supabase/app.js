import { supabase } from "./supabase.js";

async function probarConexion() {

    const { data, error } = await supabase
        .from("movimientos")
        .select("*")
        .limit(5);

    if (error) {
        console.error("Error de conexión:", error);
        return;
    }

    console.log("¡Conexión exitosa!");
    console.log(data);
}

probarConexion();