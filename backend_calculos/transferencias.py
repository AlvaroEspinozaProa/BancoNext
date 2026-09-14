"""Cálculo de transferencias desde una cuenta."""

from backend_calculos.validaciones import (
    validar_destinatario,
    validar_entero_no_negativo,
    validar_entero_positivo,
)


def realizar_transferencia(saldo_actual, monto, destinatario):
    """Descuenta una transferencia y devuelve un resumen de la operación."""
    validar_entero_no_negativo(saldo_actual, "El saldo actual")
    validar_entero_positivo(monto, "El monto")
    validar_destinatario(destinatario)

    if monto > saldo_actual:
        raise ValueError("No hay saldo suficiente para hacer la transferencia.")

    saldo_restante = saldo_actual - monto

    # El diccionario se puede mostrar luego en una página o guardar en una base.
    return {
        "destinatario": destinatario.strip(),
        "monto": monto,
        "saldo_restante": saldo_restante,
    }

