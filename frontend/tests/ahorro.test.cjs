const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '../js/ahorro.js'), 'utf8')
    .replace('import { obtenerSupabase } from "./supabase.js";', '');
let saved;
const mensaje = { textContent: '' };
const resultado = { textContent: '' };
const supabase = {
    auth: { getUser: async () => ({ data: { user: { id: 'usuario' } } }) },
    from: () => ({ insert: async (data) => { saved = data; return { error: null }; } })
};
const context = {
    obtenerSupabase: async () => supabase,
    document: {
        addEventListener() {},
        getElementById(id) { return id === 'mensajeAhorro' ? mensaje : resultado; }
    },
    console
};
vm.createContext(context);
vm.runInContext(source, context);

async function calculate(value) {
    const button = { disabled: false };
    const form = { elements: { cantidad: { value } }, querySelector: () => button };
    await context.calcularAhorro({ preventDefault() {}, currentTarget: form });
    assert.equal(button.disabled, false);
}

(async () => {
    await calculate('1000');
    assert.equal(saved.ahorro_proyectado, 12600);
    assert.equal(saved.user_id, 'usuario');
    assert.equal(mensaje.textContent, 'Proyección guardada.');
    saved = undefined;
    await calculate('0');
    assert.equal(saved, undefined);
    assert.match(mensaje.textContent, /monto válido/);
    await calculate('1.234');
    assert.equal(saved, undefined);
    console.log('Prueba de ahorro: OK');
})().catch(error => { console.error(error); process.exitCode = 1; });
