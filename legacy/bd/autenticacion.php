<?php
declare(strict_types=1);

/**
 * Inicia una sesión con una cookie que no puede ser leída desde JavaScript.
 */
function iniciarSesionSegura(): void
{
    if (session_status() !== PHP_SESSION_NONE) {
        return;
    }

    session_set_cookie_params([
        'httponly' => true,
        'samesite' => 'Lax',
        'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    ]);

    session_start();
}

/**
 * Envía una respuesta JSON y finaliza el script para evitar salidas extra.
 *
 * @param array<string, mixed> $datos
 */
function responderJson(array $datos, int $estado = 200): void
{
    http_response_code($estado);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($datos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
