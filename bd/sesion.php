<?php
declare(strict_types=1);

require_once __DIR__ . '/autenticacion.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    responderJson(['error' => 'Método no permitido.'], 405);
}

iniciarSesionSegura();

if (empty($_SESSION['usuario_id'])) {
    responderJson(['error' => 'No hay una sesión activa.'], 401);
}

responderJson([
    'usuario' => [
        'id' => (int) $_SESSION['usuario_id'],
        'nombre' => $_SESSION['usuario_nombre'],
        'email' => $_SESSION['usuario_email'],
    ],
]);
