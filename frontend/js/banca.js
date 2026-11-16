import { obtenerSupabase } from "./supabase.js";
import "./ahorro.js";

const dinero = (valor) => "$ " + Number(valor).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const asignar = (id, valor) => { const elemento = document.getElementById(id); if (elemento) elemento.textContent = valor; };

document.addEventListener("DOMContentLoaded", async () => {
    let supabase, user;
    try {
        supabase = await obtenerSupabase();
        const respuesta = await supabase.auth.getUser();
        if (respuesta.error || !respuesta.data.user) { location.replace("../index.html"); return; }
        user = respuesta.data.user;
        const { data: perfil } = await supabase.from("dinbank_profiles").select("nombre").eq("id", user.id).maybeSingle();
        const nombre = perfil?.nombre || user.email;
        asignar("nombreUsuario", nombre);
        asignar("correoUsuario", user.email);

        asignar("avatar", nombre.charAt(0).toUpperCase());
        asignar("fecha", new Date().toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" }).toUpperCase());
        document.body.hidden = false;
        document.getElementById("cerrarSesion")?.addEventListener("click", async () => {
            const { error } = await supabase.auth.signOut();
            if (error) { alert("No se pudo cerrar la sesión."); return; }
            location.replace("../index.html");
        });
        await actualizar();
        document.getElementById("formDeposito")?.addEventListener("submit", operar);
        document.getElementById("formTransferencia")?.addEventListener("submit", operar);
        document.getElementById("formMeta")?.addEventListener("submit", guardarMeta);
    } catch (error) {
        document.body.hidden = false;
        document.body.textContent = "No se pudo comprobar la sesión. Recargá para volver a intentarlo.";
        console.error(error);
    }

    async function actualizar() {
        const { data: cuenta, error } = await supabase.from("dinbank_cuentas").select("saldo,numero").maybeSingle();
        if (error || !cuenta) { asignar("saldoUsuario", "No disponible"); asignar("mensaje", "No se pudo cargar la cuenta."); return; }
        asignar("saldoUsuario", dinero(cuenta.saldo));
        asignar("numeroCuenta", String(cuenta.numero).padStart(6, "0"));
        const lista = document.getElementById("listaMovimientos");
        if (lista) {
            const { data, error: fallo } = await supabase.from("dinbank_operaciones").select("tipo,monto,contraparte,created_at").order("created_at", { ascending: false }).limit(20);
            lista.replaceChildren();
            if (fallo) lista.textContent = "No se pudieron cargar los movimientos.";
            else if (!data.length) lista.textContent = "Todavía no tenés movimientos.";
            else data.forEach((op) => {
                const item = document.createElement("div"); item.className = "movement";
                const info = document.createElement("span");
                const nombre = document.createElement("strong"); nombre.textContent = { deposito: "Depósito simulado", transferencia_enviada: "Transferencia enviada", transferencia_recibida: "Transferencia recibida" }[op.tipo];
                const fecha = document.createElement("small"); fecha.textContent = new Date(op.created_at).toLocaleString("es-AR");
                const importe = document.createElement("b"); importe.textContent = (op.tipo === "transferencia_enviada" ? "− " : "+ ") + dinero(op.monto);
                info.append(nombre, fecha); item.append(info, importe); lista.append(item);
            });
        }
        if (document.getElementById("metaResumen") || document.getElementById("listaMetas")) await cargarMetas();
        if (document.getElementById("proyeccion")) {
            const { data } = await supabase.from("dinbank_simulaciones_ahorros").select("ahorro_proyectado").order("created_at", { ascending: false }).limit(1).maybeSingle();
            if (data) asignar("proyeccion", dinero(data.ahorro_proyectado));
        }
    }
    async function operar(event) {
        event.preventDefault();
        const form = event.currentTarget, monto = Number(form.elements.monto.value), mensaje = document.getElementById("mensaje");
        if (!Number.isFinite(monto) || monto <= 0 || monto > 9999999999.99 || !/^\d+(\.\d{1,2})?$/.test(form.elements.monto.value)) { mensaje.textContent = "Ingresá un monto válido con hasta dos decimales."; return; }
        const boton = form.querySelector("button[type=submit]"); boton.disabled = true;
        try {
            const parametros = { p_monto: monto };
            if (form.id === "formTransferencia") {
                const destino = form.elements.destino.value.trim();
                if (!/^\d{1,12}$/.test(destino) || Number(destino) <= 0) throw new Error("Ingresá un número de cuenta válido.");
                parametros.p_numero = Number(destino);
            }
            const { error } = await supabase.rpc(form.id === "formDeposito" ? "dinbank_depositar" : "dinbank_transferir_numero", parametros);
            if (error) throw error;
            form.reset(); mensaje.textContent = "Operación simulada registrada."; await actualizar();
        } catch (error) { mensaje.textContent = error.message || "No se pudo completar la operación."; }
        finally { boton.disabled = false; }
    }
    async function cargarMetas() {
        const { data, error } = await supabase.from("dinbank_metas").select("descripcion").order("created_at", { ascending: true });
        if (error) { asignar("metaResumen", "No se pudieron cargar las metas."); asignar("listaMetas", "No se pudieron cargar las metas."); return; }
        asignar("metaResumen", data.length ? data[0].descripcion : "Todavía no tenés metas.");
        const lista = document.getElementById("listaMetas");
        if (!lista) return;
        lista.replaceChildren();
        if (!data.length) lista.textContent = "Todavía no tenés metas.";
        data.forEach(({ descripcion }) => { const item = document.createElement("article"); item.className = "goal-card card"; const titulo = document.createElement("h3"); titulo.textContent = descripcion; item.append(titulo); lista.append(item); });
    }
    async function guardarMeta(event) {
        event.preventDefault();
        const form = event.currentTarget, descripcion = form.elements.descripcion.value.trim(), mensaje = document.getElementById("mensaje");
        if (!descripcion) { mensaje.textContent = "Escribí una meta."; return; }
        const boton = form.querySelector("button"); boton.disabled = true;
        try { const { error } = await supabase.from("dinbank_metas").insert({ user_id: user.id, descripcion }); if (error) throw error; form.reset(); mensaje.textContent = "Meta guardada."; await cargarMetas(); }
        catch (error) { mensaje.textContent = error.message || "No se pudo guardar la meta."; }
        finally { boton.disabled = false; }
    }
});
