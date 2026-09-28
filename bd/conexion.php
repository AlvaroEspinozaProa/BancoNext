<?php

include("conexion.php");

$sql = "SELECT * FROM usuarios";

$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {

    while ($fila = $resultado->fetch_assoc()) {

        echo "ID: " . $fila["id"] . "<br>";
        echo "Nombre: " . $fila["nombre"] . "<br>";
        echo "Email: " . $fila["email"] . "<br>";
        echo "<hr>";

    }

} else {

    echo "No hay usuarios registrados.";

}

$conn->close();

?>