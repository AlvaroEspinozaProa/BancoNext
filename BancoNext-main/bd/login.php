<?php
declare(strict_types=1);

require_once __DIR__ . '/autenticacion.php';
require_once __DIR__ . '/conexion.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    responderJson(['error' => 'Método no permitido.'], 405);
}

try {
    $datos = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);
} catch (JsonException $error) {
    responderJson(['error' => 'El cuerpo de la solicitud debe ser JSON válido.'], 400);
}

if (!is_array($datos)) {
    responderJson(['error' => 'El cuerpo de la solicitud debe ser un objeto JSON.'], 400);
}

$identificador = trim((string) ($datos['usuario'] ?? ''));
$contrasena = (string) ($datos['contrasena'] ?? '');

if ($identificador === '' || $contrasena === '' || strlen($identificador) > 100 || strlen($contrasena) > 255) {
    responderJson(['error' => 'Ingresá un usuario o email y una contraseña válidos.'], 422);
}

$conexion = conectarBaseDeDatos();

try {
    $consulta = $conexion->prepare(
        'SELECT id, Nombre, Email, Contraseña FROM usuarios WHERE Nombre = ? OR Email = ? LIMIT 1'
    );
    $consulta->bind_param('ss', $identificador, $identificador);
    $consulta->execute();
    $usuario = $consulta->get_result()->fetch_assoc();
    $consulta->close();

    if ($usuario === null || !password_verify($contrasena, $usuario['Contraseña'])) {
        responderJson(['error' => 'Usuario, email o contraseña incorrectos.'], 401);
    }

    iniciarSesionSegura();
    session_regenerate_id(true);
    $_SESSION['usuario_id'] = (int) $usuario['id'];
    $_SESSION['usuario_nombre'] = $usuario['Nombre'];
    $_SESSION['usuario_email'] = $usuario['Email'];

    responderJson([
        'mensaje' => 'Inicio de sesión correcto.',
        'usuario' => [
            'id' => (int) $usuario['id'],
            'nombre' => $usuario['Nombre'],
            'email' => $usuario['Email'],
        ],
    ]);
} catch (mysqli_sql_exception $error) {
    error_log('Error al iniciar sesión en DinBank: ' . $error->getMessage());
    responderJson(['error' => 'No se pudo procesar el inicio de sesión.'], 500);
} finally {
    $conexion->close();
}
