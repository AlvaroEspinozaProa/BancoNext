<?php
declare(strict_types=1);

require_once __DIR__ . '/autenticacion.php';
require_once __DIR__ . '/conexion.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    responderJson(['error' => 'Método no permitido.'], 405);
}

iniciarSesionSegura();

if (empty($_SESSION['usuario_id'])) {
    responderJson(['error' => 'No hay una sesión activa.'], 401);
}

$conexion = conectarBaseDeDatos();

try {
    $consulta = $conexion->prepare(
        'SELECT id, Nombre AS nombre, Email AS email FROM usuarios WHERE id = ? LIMIT 1'
    );
    $consulta->bind_param('i', $_SESSION['usuario_id']);
    $consulta->execute();
    $usuario = $consulta->get_result()->fetch_assoc();
    $consulta->close();

    if ($usuario === null) {
        responderJson(['error' => 'La cuenta no está disponible.'], 404);
    }

    responderJson(['usuario' => $usuario]);
} catch (mysqli_sql_exception $error) {
    error_log('Error al consultar usuarios de DinBank: ' . $error->getMessage());
    responderJson(['error' => 'No se pudo obtener el usuario.'], 500);
} finally {
    $conexion->close();
}
