"""Pruebas simples para comprobar los cálculos principales."""

import unittest

from backend_calculos.ahorros import proyectar_ahorro
from backend_calculos.saldo import calcular_saldo
from backend_calculos.transferencias import realizar_transferencia


class PruebasDeSaldo(unittest.TestCase):
    """Comprueba los casos normales y los errores de saldo."""

    def test_calcula_el_saldo_correctamente(self):
        self.assertEqual(calcular_saldo(1000, 500, 200), 1300)

    def test_no_permite_egresos_mayores_al_saldo(self):
        with self.assertRaises(ValueError):
            calcular_saldo(100, 0, 101)

    def test_no_permite_montos_negativos(self):
        with self.assertRaises(ValueError):
            calcular_saldo(-1, 0, 0)


class PruebasDeTransferencias(unittest.TestCase):
    """Comprueba transferencias válidas e inválidas."""

    def test_realiza_una_transferencia(self):
        resultado = realizar_transferencia(1000, 250, "Ana")

        self.assertEqual(resultado["destinatario"], "Ana")
        self.assertEqual(resultado["monto"], 250)
        self.assertEqual(resultado["saldo_restante"], 750)

    def test_no_permite_transferir_mas_del_saldo(self):
        with self.assertRaises(ValueError):
            realizar_transferencia(100, 101, "Ana")

    def test_no_permite_monto_cero(self):
        with self.assertRaises(ValueError):
            realizar_transferencia(100, 0, "Ana")

    def test_no_permite_destinatario_vacio(self):
        with self.assertRaises(ValueError):
            realizar_transferencia(100, 20, "   ")


class PruebasDeAhorro(unittest.TestCase):
    """Comprueba las proyecciones que muestra el gráfico."""

    def test_proyecciones_del_grafico(self):
        for meses in [1, 3, 6, 9, 12]:
            with self.subTest(meses=meses):
                resultado = proyectar_ahorro(1000, meses)
                self.assertEqual(resultado["capital_ahorrado"], 1000 * meses)

    def test_ahorro_a_un_ano_con_interes(self):
        resultado = proyectar_ahorro(1000, 12)

        self.assertEqual(resultado["interes"], 600)
        self.assertEqual(resultado["total_proyectado"], 12600)

    def test_tasa_cero(self):
        resultado = proyectar_ahorro(1000, 6, 0)

        self.assertEqual(resultado["interes"], 0)
        self.assertEqual(resultado["total_proyectado"], 6000)

    def test_no_permite_meses_invalidos(self):
        with self.assertRaises(ValueError):
            proyectar_ahorro(1000, 0)

    def test_no_permite_aporte_negativo(self):
        with self.assertRaises(ValueError):
            proyectar_ahorro(-1, 12)

