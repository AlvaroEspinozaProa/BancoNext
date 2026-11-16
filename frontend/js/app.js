import { obtenerSupabase } from "./supabase.js";

document.addEventListener("DOMContentLoaded", iniciarAplicacion);

async function iniciarAplicacion() {
    try {
        const supabase = await obtenerSupabase();
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
            window.location.replace("index.html");
            return;
        }
        const { data: perfil } = await supabase.from("dinbank_profiles")
            .select("nombre").eq("id", user.id).maybeSingle();
        document.getElementById("nombreUsuario").textContent = perfil?.nombre || user.email;
        document.getElementById("numeroCuenta").textContent = user.id;
        document.body.hidden = false;
        document.getElementById("cerrarSesion").addEventListener("click", async () => {
            await supabase.auth.signOut();
            window.location.replace("index.html");
        });
        await cargarCuenta(supabase);
        document.addEventListener("cuenta-actualizada", () => cargarCuenta(supabase));
    } catch (error) {
        document.body.textContent = "No se pudo comprobar la sesión. Recargá la página para volver a intentarlo.";
        document.body.hidden = false;
        console.error(error);
    }
}

async function cargarCuenta(supabase) {
    const estado = document.getElementById("estadoCuenta");
    const [{ data: cuenta, error: errorCuenta }, { data: operaciones, error: errorOperaciones }] = await Promise.all([
        supabase.from("dinbank_cuentas").select("saldo").maybeSingle(),
        supabase.from("dinbank_operaciones").select("tipo,monto,contraparte,created_at").order("created_at", { ascending: false }).limit(20)
    ]);
    if (errorCuenta || errorOperaciones || !cuenta) {
        estado.textContent = "No se pudo cargar la cuenta simulada. Comprobá la configuración de Supabase.";
        return;
    }
    estado.textContent = "";
    document.getElementById("saldoUsuario").textContent = Number(cuenta.saldo).toLocaleString("es-AR", {minimumFractionDigits: 2});
    const lista = document.getElementById("listaMovimientos");
    lista.replaceChildren();
    for (const movimiento of operaciones) {
        const item = document.createElement("li");
        const tipo = {deposito: "Depósito simulado", transferencia_enviada: "Transferencia enviada", transferencia_recibida: "Transferencia recibida"}[movimiento.tipo];
        item.textContent = `${new Date(movimiento.created_at).toLocaleString("es-AR")} — ${tipo}: $ ${Number(movimiento.monto).toLocaleString("es-AR", {minimumFractionDigits: 2})}${movimiento.contraparte ? ` — Cuenta: ${movimiento.contraparte}` : ""}`;
        lista.appendChild(item);
    }
}
