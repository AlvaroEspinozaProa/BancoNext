"""Validaciones compartidas para los cálculos."""


def validar_entero_no_negativo(valor, nombre):
    """Comprueba que un valor sea un número entero igual o mayor que cero."""
    if not isinstance(valor, int) or isinstance(valor, bool) or valor < 0:
        raise ValueError(f"{nombre} debe ser un número entero igual o mayor que cero.")


def validar_entero_positivo(valor, nombre):
    """Comprueba que un valor sea un número entero mayor que cero."""
    if not isinstance(valor, int) or isinstance(valor, bool) or valor <= 0:
        raise ValueError(f"{nombre} debe ser un número entero mayor que cero.")


def validar_destinatario(destinatario):
    """Comprueba que el destinatario tenga un nombre escrito."""
    if not isinstance(destinatario, str) or destinatario.strip() == "":
        raise ValueError("El destinatario no puede estar vacío.")

