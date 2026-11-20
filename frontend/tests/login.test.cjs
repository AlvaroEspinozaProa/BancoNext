const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../js/login.js'), 'utf8')
    .replace('import { obtenerSupabase } from "./supabase.js";', '');
let mensaje;
const boton = { disabled: false };
const context = {
    document: { addEventListener() {}, getElementById: id => ({ value: id === 'email' ? 'a@example.com' : 'clave' }) },
    obtenerSupabase: async () => { const error = new Error('Failed to fetch'); error.name = 'AuthRetryableFetchError'; throw error; },
    alert: texto => { mensaje = texto; }
};
vm.createContext(context);
vm.runInContext(source, context);
(async () => {
    await context.validarLogin({ preventDefault() {}, currentTarget: { querySelector: () => boton } });
    assert.match(mensaje, /conectar con Supabase/);
    assert.equal(boton.disabled, false);
    console.log('Prueba de conexión: OK');
})().catch(error => { console.error(error); process.exitCode = 1; });
