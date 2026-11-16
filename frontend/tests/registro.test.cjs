const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../js/registro.js'), 'utf8')
    .replace('import { obtenerSupabase } from "./supabase.js";', '');
let request, response = { data: { session: null }, error: null }, destination;
const message = { textContent: '' };
const button = { disabled: false };
const form = {
    elements: { nombre: { value: ' Ana ' }, email: { value: 'ana@example.com' }, password: { value: 'password123' }, confirmarPassword: { value: 'password123' } },
    querySelector: () => button,
    reset() {}
};
const context = {
    URL,
    obtenerSupabase: async () => ({ auth: { signUp: async (value) => { request = value; return response; } } }),
    document: { addEventListener() {}, getElementById: () => message },
    window: { location: { href: 'http://localhost:8000/frontend/registro.html', assign(value) { destination = value; } } }
};
vm.createContext(context);
vm.runInContext(source, context);
const submit = () => context.registrar({ preventDefault() {}, currentTarget: form });
(async () => {
    form.elements.confirmarPassword.value = 'distinta';
    await submit();
    assert.equal(request, undefined);
    assert.match(message.textContent, /no coinciden/);
    form.elements.confirmarPassword.value = 'password123';
    await submit();
    assert.equal(request.options.data.nombre, 'Ana');
    assert.equal(request.options.emailRedirectTo, 'http://localhost:8000/frontend/index.html');
    assert.match(message.textContent, /revisá tu correo/);
    assert.equal(button.disabled, false);
    response = { data: { session: {} }, error: null };
    await submit();
    assert.equal(destination, 'pages/dashboard.html');
    response = { data: null, error: new Error('Error de prueba') };
    await submit();
    assert.equal(message.textContent, 'Error de prueba');
    assert.equal(button.disabled, false);
    console.log('Prueba de registro: OK');
})().catch(error => { console.error(error); process.exitCode = 1; });
