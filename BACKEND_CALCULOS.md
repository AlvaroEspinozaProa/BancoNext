# Backend de cálculos de DinBank

Esta carpeta tiene las cuentas del simulador. No guarda usuarios ni conecta la página: eso queda como actividad para el grupo.

## Carpetas del proyecto

```text
frontend/               Página que ve el usuario.
backend_calculos/       Cuentas hechas en Python.
backend_calculos/tests/ Pruebas de las cuentas.
database/               Scripts SQL para una etapa futura.
```

## Qué calcula cada archivo

- `saldo.py`: suma los ingresos y resta los egresos.
- `transferencias.py`: revisa que haya saldo y descuenta el monto enviado.
- `ahorros.py`: calcula cuánto se junta al ahorrar todos los meses.
- `validaciones.py`: evita datos imposibles, por ejemplo un monto negativo.
- `constantes.py`: guarda valores que se usan varias veces, como la tasa del 5 %.

Los montos se escriben como pesos enteros. Por ejemplo, `1500` significa `$1.500`.

## Fórmulas

Saldo:

```text
saldo final = saldo inicial + ingresos - egresos
```

Transferencia:

```text
saldo restante = saldo actual - monto enviado
```

Ahorro con interés simple:

```text
capital = aporte mensual × meses
interés = capital × (tasa anual / 100) × (meses / 12)
total = capital + interés
```

La tasa inicial es 5 %. El interés se redondea al peso más cercano porque el simulador no usa centavos.

## Ejemplos

```python
from backend_calculos.saldo import calcular_saldo
from backend_calculos.transferencias import realizar_transferencia
from backend_calculos.ahorros import proyectar_ahorro

print(calcular_saldo(10000, 2000, 1500))
# 10500

print(realizar_transferencia(10500, 3000, "Lucía"))
# {'destinatario': 'Lucía', 'monto': 3000, 'saldo_restante': 7500}

print(proyectar_ahorro(1000, 12))
# {'aporte_mensual': 1000, 'meses': 12, 'tasa_anual': 5,
#  'capital_ahorrado': 12000, 'interes': 600, 'total_proyectado': 12600}
```

## Cómo ejecutar las pruebas

Abrí una terminal dentro de la carpeta principal del proyecto y ejecutá:

```bash
python -m unittest discover -s backend_calculos/tests -v
```

Si todas dicen `ok`, las cuentas funcionan como se esperaba.

## Próxima etapa: conectar la página

El frontend todavía usa JavaScript de ejemplo. Para conectar este backend, el grupo puede:

1. Crear un servidor Flask que importe estas funciones.
2. Crear rutas para recibir los datos de los formularios.
3. Mostrar el resultado que devuelva Python en `dashboard.html`.
4. Guardar usuarios y movimientos con los scripts de `database/` y MySQL.

La idea es que Python haga las cuentas y que el frontend solo muestre los resultados.
