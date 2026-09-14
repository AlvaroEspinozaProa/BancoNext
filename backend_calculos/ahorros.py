"""Proyección de ahorro con interés simple."""

from backend_calculos.constantes import TASA_ANUAL_POR_DEFECTO
from backend_calculos.validaciones import validar_entero_no_negativo, validar_entero_positivo


def proyectar_ahorro(aporte_mensual, meses, tasa_anual=TASA_ANUAL_POR_DEFECTO):
    """Calcula capital, interés simple y total proyectado."""
    validar_entero_no_negativo(aporte_mensual, "El aporte mensual")
    validar_entero_positivo(meses, "Los meses")
    validar_entero_no_negativo(tasa_anual, "La tasa anual")

    capital_ahorrado = aporte_mensual * meses

    # La tasa llega como porcentaje: 5 significa 5 %.
    interes = round(capital_ahorrado * (tasa_anual / 100) * (meses / 12))
    total_proyectado = capital_ahorrado + interes

    return {
        "aporte_mensual": aporte_mensual,
        "meses": meses,
        "tasa_anual": tasa_anual,
        "capital_ahorrado": capital_ahorrado,
        "interes": interes,
        "total_proyectado": total_proyectado,
    }

