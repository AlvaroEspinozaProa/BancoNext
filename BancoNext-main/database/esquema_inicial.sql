-- Tablas iniciales de usuarios y simulaciones para una futura conexión MySQL.
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 10-08-2026 a las 20:00:08
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_bancodino`
--

CREATE DATABASE IF NOT EXISTS `bd_bancodino`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE `bd_bancodino`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `simulaciones_ahorros`
--

CREATE TABLE `simulaciones_ahorros` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `Usuarios_id` varchar(100) NOT NULL,
  `Ingreso_mensual` int(255) NOT NULL,
  `Gastos_fijos` int(255) NOT NULL,
  `Gastos_hormiga` int(255) NOT NULL,
  `Ahorro_proyectado` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuarios_email_unico` (`Email`),
  UNIQUE KEY `usuarios_nombre_unico` (`Nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Usuario inicial de demostración: ana / dino123.
-- La contraseña se guarda como hash Argon2id, nunca como texto plano.
INSERT INTO `usuarios` (`Nombre`, `Email`, `Contraseña`) VALUES
('ana', 'ana@dinbank.local', '$argon2id$v=19$m=65536,t=3,p=1$tKwr97dRHwptz4Ht9UG9+A$GK0aPlHA7p8Wc78x+13BL9ciGmhGNKrK4Tp0qowxHK8');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
