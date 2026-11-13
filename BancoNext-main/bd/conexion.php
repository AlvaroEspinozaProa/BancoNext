<?php
declare(strict_types=1);

/**
 * Crea una conexión a la base de datos de DinBank.
 *
 * Las variables de entorno permiten cambiar la configuración sin publicar
 * contraseñas en el repositorio. Los valores por defecto coinciden con los
 * archivos SQL del proyecto (MariaDB en el puerto 3307).
 */
function conectarBaseDeDatos(): mysqli
{
    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $puerto = (int) (getenv('DB_PORT') ?: 3307);
    $usuario = getenv('DB_USER') ?: 'root';
    $contrasena = getenv('DB_PASSWORD') ?: '';
    $baseDeDatos = getenv('DB_NAME') ?: 'bd_bancodino';

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    try {
        $conexion = new mysqli($host, $usuario, $contrasena, $baseDeDatos, $puerto);
        $conexion->set_charset('utf8mb4');

        return $conexion;
    } catch (mysqli_sql_exception $error) {
        http_response_code(500);
        error_log('Error de conexión a DinBank: ' . $error->getMessage());
        exit('No se pudo conectar con la base de datos. Verificá que MariaDB esté iniciado y que la configuración sea correcta.');
    }
}
