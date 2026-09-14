"""Cálculo del saldo disponible de una cuenta."""

from backend_calculos.validaciones import validar_entero_no_negativo


def calcular_saldo(saldo_inicial, ingresos, egresos):
    """Devuelve el saldo inicial más ingresos menos egresos."""
    validar_entero_no_negativo(saldo_inicial, "El saldo inicial")
    validar_entero_no_negativo(ingresos, "Los ingresos")
    validar_entero_no_negativo(egresos, "Los egresos")

    saldo_final = saldo_inicial + ingresos - egresos

    # Un simulador no permite gastar más dinero del que hay.
    if saldo_final < 0:
        raise ValueError("Los egresos no pueden superar el saldo disponible.")

    return saldo_final

